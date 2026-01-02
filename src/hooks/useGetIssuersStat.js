import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react'
import { readContract, getPublicClient } from 'wagmi/actions'
import {
    getStoreIOUsAddress,
    resolveChainId, 
    ADDRESS_BOOK
} from '../constants'
import { config } from '../wagmi'
import ChainWebContext from '../context/chain/ChainWebContext'

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
    const [IssuersStat, setIssuersStat] = useState();
    
    const { chainId: ctxChainId, resolvedChainId: ctxResolvedChainId, isChainConnected } =
        useContext(ChainWebContext) || {}

    const resolvedChainId = useMemo(
        () =>
        resolveChainId({
            walletChainId: ctxResolvedChainId || ctxChainId,
            isWalletConnected: isChainConnected,
        }),
        [ctxResolvedChainId, ctxChainId, isChainConnected]
    )

    const changeIssuersStat = useCallback((listItem) => {
        setIssuersStat(listItem);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchIssuersStatistics = async () => {
            const client = resolvedChainId ? getPublicClient(config, { chainId: resolvedChainId }) : undefined
            const hasClient = Boolean(resolvedChainId && client)
            const addressesForChain = resolvedChainId ? ADDRESS_BOOK?.[resolvedChainId] : undefined
            
            if (!hasClient || !addressesForChain?.StoreIOUs) {
                return;
            }

            const storeIOUsAddress = getStoreIOUsAddress(resolvedChainId);
            if (!storeIOUsAddress) return;

            try {
                const stats = await readContract(config, {
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getIssuerstotal',
                    chainId: resolvedChainId
                });
                
                if (!cancelled && stats) {
                    changeIssuersStat(stats);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error fetching issuers statistics:', error);
                    changeIssuersStat(null);
                }
            }
        };

        fetchIssuersStatistics();

        return () => {
            cancelled = true;
        };
    }, [resolvedChainId, changeIssuersStat]);

    return IssuersStat;
}
