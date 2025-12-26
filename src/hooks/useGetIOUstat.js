import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getStoreIOUsAddress } from '../constants'

// Contract ABI for StoreIOUs
const STORE_IOUS_ABI = [
  {
    "inputs": [],
    "name": "getIOUstotal",
    "outputs": [
      {
        "components": [
          {"name": "totalIOUs", "type": "uint256"},
          {"name": "totalTokens", "type": "uint256"},
          {"name": "totalHolders", "type": "uint256"},
          {"name": "totalBurned", "type": "uint256"}
        ],
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function useGetIOUstat() {
    const { address, isConnected } = useAccount();
    const [IOUstat, setIOUstat] = useState();
    
    const storeIOUsAddress = getStoreIOUsAddress();

    const changeIOUstat = useCallback((listItem) => {
        setIOUstat(listItem);
    }, []);

    useEffect(() => {
        const fetchIOUStatistics = async () => {
            if (!isConnected || !address) return;

            try {
                const { readContract } = await import('wagmi/actions');
                const stats = await readContract({
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getIOUstotal'
                });
                
                if (stats) {
                    changeIOUstat(stats);
                }
            } catch (error) {
                console.error('Error fetching IOU statistics:', error);
                changeIOUstat(null);
            }
        };

        fetchIOUStatistics();
    }, [address, isConnected, changeIOUstat]);

    return IOUstat;
}