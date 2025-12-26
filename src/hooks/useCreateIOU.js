import React, { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { stringToHex } from 'viem'
import { getMakeIOUAddress } from '../constants'

// Contract ABI for MakeIOU
const MAKE_IOU_ABI = [
  {
    "inputs": [
      {"name": "_name", "type": "string"},
      {"name": "_symbol", "type": "string"},
      {"name": "_myName", "type": "string"},
      {"name": "_socialProfile", "type": "string"},
      {"name": "_description", "type": "string"},
      {
        "name": "_location", 
        "type": "tuple",
        "components": [
          {"name": "inCity", "type": "uint256"},
          {"name": "onStreet", "type": "uint256"},
          {"name": "country", "type": "string"},
          {"name": "state", "type": "string"},
          {"name": "city", "type": "string"},
          {"name": "street", "type": "string"}
        ]
      },
      {"name": "_units", "type": "bytes32"},
      {"name": "_keywords", "type": "bytes32[]"},
      {"name": "_phone", "type": "bytes32"}
    ],
    "name": "makeIOU",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function useCreateIOU() {
    const { address, isConnected } = useAccount();
    const [isApproved, setIsApproved] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    
    const makeIOUAddress = getMakeIOUAddress();
    
    // Transaction write hook
    const { 
        writeContract, 
        data: hash, 
        error: writeError, 
        isPending: isWritePending 
    } = useWriteContract();
    
    // Wait for transaction confirmation
    const { 
        data: receipt, 
        isLoading: isConfirming, 
        isSuccess: isConfirmed,
        error: confirmError 
    } = useWaitForTransactionReceipt({
        hash,
    });

    // Helper function to convert string to bytes32
    const stringToBytes32 = (str) => stringToHex(str.trim().toLowerCase());

    // Create IOU function
    const createIOU = async (values) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        setIsCreating(true);

        try {
            // Prepare location object
            const location = {
                inCity: 0,
                onStreet: 0,
                country: values.country.trim(),
                state: values.state.trim(),
                city: values.city.trim(),
                street: values.street.trim()
            };

            // Convert keywords to bytes32
            const keywords = values.keywords.map(keyword => 
                stringToBytes32(keyword.trim().toLowerCase())
            );

            // Convert unit and phone to bytes32
            const unit = stringToBytes32(values.unit);
            const phone = stringToBytes32(values.phone);

            // Prepare transaction arguments
            const argumentsIOU = [
                values.name.trim(),
                values.symbol.trim(),
                values.username,
                values.social.trim(),
                values.description,
                location,
                unit,
                keywords,
                phone
            ];

            // Send transaction using Wagmi
            writeContract({
                address: makeIOUAddress,
                abi: MAKE_IOU_ABI,
                functionName: 'makeIOU',
                args: argumentsIOU,
            });

            // Set approved flag (this could be replaced with actual approval logic)
            setIsApproved(true);

        } catch (error) {
            console.error('Error creating IOU:', error);
            setIsCreating(false);
            throw error;
        }
    };

    // Update loading state based on transaction status
    React.useEffect(() => {
        if (isConfirmed || confirmError) {
            setIsCreating(false);
        }
    }, [isConfirmed, confirmError]);

    // Return hook interface
    return [
        isApproved, // approval status
        createIOU, // function to create IOU
        {
            isLoading: isWritePending || isConfirming || isCreating,
            isPending: isWritePending,
            isConfirming,
            isConfirmed,
            isSuccess: isConfirmed,
            hash,
            receipt,
            error: writeError || confirmError,
            data: receipt
        }
    ];
}