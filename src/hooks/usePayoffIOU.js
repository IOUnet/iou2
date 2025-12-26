import React, { useState, useCallback } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

// ERC20 Token ABI with burn function
const ERC20_ABI = [
  {
    "constant": false,
    "inputs": [
      {"name": "amount", "type": "uint256"},
      {"name": "rate", "type": "uint256"},
      {"name": "feedback", "type": "string"}
    ],
    "name": "burn",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function usePayoffIOU() {
    const { address, isConnected } = useAccount();
    const [burnParameters, setBurnParameters] = useState();
    
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

    // Burn tokens function
    const burnTokens = useCallback(async (burnParams) => {
        if (!isConnected || !address) {
            throw new Error('Wallet not connected');
        }

        if (!burnParams || !burnParams.tokenAddress || !burnParams.amount) {
            throw new Error('Invalid burn parameters');
        }

        if (isWritePending || isConfirming) {
            throw new Error('Transaction already in progress');
        }

        try {
            // Convert amount to wei (assuming 18 decimal places)
            const tokenAmount = parseEther(burnParams.amount.toString());

            // Send burn transaction using Wagmi
            writeContract({
                address: burnParams.tokenAddress,
                abi: ERC20_ABI,
                functionName: 'burn',
                args: [
                    tokenAmount,
                    burnParams.rate || 0,
                    burnParams.feedback || ''
                ],
            });

            return hash;

        } catch (error) {
            console.error('Error burning tokens:', error);
            throw error;
        }
    }, [isConnected, address, writeContract, hash, isWritePending, isConfirming]);

    // Handle burn parameters changes
    React.useEffect(() => {
        if (burnParameters && !isWritePending && !isConfirming) {
            burnTokens(burnParameters);
        }
    }, [burnParameters, burnTokens, isWritePending, isConfirming]);

    // Update loading state based on transaction status
    React.useEffect(() => {
        if (isConfirmed || confirmError) {
            setBurnParameters(undefined); // Clear parameters after completion
        }
    }, [isConfirmed, confirmError]);

    // Check transaction status
    React.useEffect(() => {
        if (receipt) {
            if (receipt.status === 'success') {
                console.log('Burn transaction successful');
                // Handle success - could emit event, update state, etc.
            } else {
                console.log('Burn transaction failed');
                // Handle failure
            }
        }
    }, [receipt]);

    // Set burn parameters function (for external use)
    const setParameters = useCallback((params) => {
        setBurnParameters(params);
    }, []);

    // Return hook interface
    return [
        burnParameters, // current burn parameters
        setParameters, // function to set burn parameters
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
            burnParameters
        }
    ];
}