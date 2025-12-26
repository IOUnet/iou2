import React, { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { stringToHex } from 'viem'

// ERC20 Token ABI with edit functions
const IOU_TOKEN_ABI = [
  {
    "inputs": [{"name": "_phone", "type": "bytes32"}],
    "name": "editPhone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_description", "type": "string"}],
    "name": "editDescr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "_country", "type": "string"},
      {"name": "_state", "type": "string"},
      {"name": "_city", "type": "string"},
      {"name": "_street", "type": "string"}
    ],
    "name": "editGeo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_keywords", "type": "bytes32[]"}],
    "name": "addKeys",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "_keywords", "type": "bytes32[]"}],
    "name": "delKeys",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function useEditIOU() {
    const { address, isConnected } = useAccount();
    const [isApproved, setIsApproved] = useState(false);
    
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

    // Edit IOU phone function
    const editIOUPhone = async (values, _addressIOU) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!_addressIOU || !values.phone) {
            throw new Error('Invalid parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            const newPhone = stringToBytes32(values.phone);
            
            writeContract({
                address: _addressIOU,
                abi: IOU_TOKEN_ABI,
                functionName: 'editPhone',
                args: [newPhone],
            });

            setIsApproved(true);
        } catch (error) {
            console.error('Error editing IOU phone:', error);
            throw error;
        }
    };

    // Edit IOU description function
    const editIOUDescr = async (values, _addressIOU) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!_addressIOU || !values.description) {
            throw new Error('Invalid parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            const newDescription = values.description;
            
            writeContract({
                address: _addressIOU,
                abi: IOU_TOKEN_ABI,
                functionName: 'editDescr',
                args: [newDescription],
            });

            setIsApproved(true);
        } catch (error) {
            console.error('Error editing IOU description:', error);
            throw error;
        }
    };

    // Edit IOU geographic location function
    const editIOUGeo = async (values, _addressIOU) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!_addressIOU || !values.country || !values.state || !values.city || !values.street) {
            throw new Error('Invalid parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            writeContract({
                address: _addressIOU,
                abi: IOU_TOKEN_ABI,
                functionName: 'editGeo',
                args: [
                    values.country.trim(),
                    values.state.trim(),
                    values.city.trim(),
                    values.street.trim()
                ],
            });

            setIsApproved(true);
        } catch (error) {
            console.error('Error editing IOU location:', error);
            throw error;
        }
    };

    // Add keywords to IOU function
    const editAddKeys = async (values, _addressIOU) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!_addressIOU || !values.keywords || !Array.isArray(values.keywords)) {
            throw new Error('Invalid parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            const newKeywords = values.keywords.map(keyword => 
                stringToBytes32(keyword.trim().toLowerCase())
            );
            
            writeContract({
                address: _addressIOU,
                abi: IOU_TOKEN_ABI,
                functionName: 'addKeys',
                args: [newKeywords],
            });

            setIsApproved(true);
        } catch (error) {
            console.error('Error adding IOU keywords:', error);
            throw error;
        }
    };

    // Delete keywords from IOU function
    const editDelKeys = async (values, _addressIOU) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!_addressIOU || !values.keyList || !Array.isArray(values.keyList)) {
            throw new Error('Invalid parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            const delKeywords = values.keyList.map(keyword => 
                stringToBytes32(keyword.trim().toLowerCase())
            );
            
            writeContract({
                address: _addressIOU,
                abi: IOU_TOKEN_ABI,
                functionName: 'delKeys',
                args: [delKeywords],
            });

            setIsApproved(true);
        } catch (error) {
            console.error('Error deleting IOU keywords:', error);
            throw error;
        }
    };

    // Update loading state based on transaction status
    React.useEffect(() => {
        if (isConfirmed || confirmError) {
            setIsApproved(false);
        }
    }, [isConfirmed, confirmError]);

    // Return hook interface
    return [
        editIOUPhone,    // function to edit phone
        editIOUDescr,    // function to edit description
        editIOUGeo,      // function to edit geographic location
        editAddKeys,     // function to add keywords
        editDelKeys,     // function to delete keywords
        {
            // Transaction status
            isLoading: isWritePending || isConfirming,
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