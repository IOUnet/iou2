import React, { useState, useCallback } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// ERC20 Token ABI with mint function
const ERC20_ABI = [
  {
    "constant": false,
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "amount", "type": "uint256"},
      {"name": "comment", "type": "string"}
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function useSendIOU() {
    const { address, isConnected } = useAccount();
    const [mintParameters, setMintParameters] = useState();
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

    // Mint tokens function
    const mintTokens = useCallback(async (mintParams) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!mintParams || !mintParams.tokenAddress || !mintParams.address || !mintParams.amount) {
            throw new Error('Invalid mint parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            // Convert amount to wei (assuming 18 decimal places)
            const tokenAmount = parseEther(mintParams.amount.toString());

            // Send mint transaction using Wagmi
            writeContract({
                address: mintParams.tokenAddress,
                abi: ERC20_ABI,
                functionName: 'mint',
                args: [
                    mintParams.address,
                    tokenAmount,
                    mintParams.comment || ''
                ],
            });

            setIsApproved(true);
            return hash;

        } catch (error) {
            console.error('Error minting tokens:', error);
            throw error;
        }
    }, [isConnected, address, writeContract, hash, isWritePending, isConfirming]);

    // Handle mint parameters changes
    React.useEffect(() => {
        if (mintParameters && !isWritePending && !isConfirming) {
            mintTokens(mintParameters);
        }
    }, [mintParameters, mintTokens, isWritePending, isConfirming]);

    // Update loading state based on transaction status
    React.useEffect(() => {
        if (isConfirmed || confirmError) {
            setMintParameters(undefined); // Clear parameters after completion
        }
    }, [isConfirmed, confirmError]);

    // Check transaction status
    React.useEffect(() => {
        if (receipt) {
            if (receipt.status === 'success') {
                console.log('Mint transaction successful');
                // Handle success - could emit event, update state, etc.
            } else {
                console.log('Mint transaction failed');
                // Handle failure
            }
        }
    }, [receipt]);

    // Set mint parameters function (for external use)
    const setAmount = useCallback((params) => {
        setMintParameters(params);
    }, []);

    // Return hook interface
    return [
        isApproved, // approval status
        setAmount, // function to set mint parameters
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
            data: receipt,
            // Transaction details
            mintParameters
        }
    ];
}