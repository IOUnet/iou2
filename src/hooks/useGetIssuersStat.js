import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getStoreIOUsAddress } from '../constants'

// Contract ABI for StoreIOUs
const STORE_IOUS_ABI = [
  {
    "inputs": [],
    "name": "getIssuerstotal",
    "outputs": [
      {
        "components": [
          {"name": "totalIssuers", "type": "uint256"},
          {"name": "activeIssuers", "type": "uint256"},
          {"name": "newIssuersToday", "type": "uint256"}
        ],
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function useGetIssuersStat() {
    const { address, isConnected } = useAccount();
    const [IssuersStat, setIssuersStat] = useState();
    
    const storeIOUsAddress = getStoreIOUsAddress();

    const changeIssuersStat = useCallback((listItem) => {
        setIssuersStat(listItem);
    }, []);

    useEffect(() => {
        const fetchIssuersStatistics = async () => {
            if (!isConnected || !address) return;

            try {
                const { readContract } = await import('wagmi/actions');
                const stats = await readContract({
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getIssuerstotal'
                });
                
                if (stats) {
                    changeIssuersStat(stats);
                }
            } catch (error) {
                console.error('Error fetching issuers statistics:', error);
                changeIssuersStat(null);
            }
        };

        fetchIssuersStatistics();
    }, [address, isConnected, changeIssuersStat]);

    return IssuersStat;
}