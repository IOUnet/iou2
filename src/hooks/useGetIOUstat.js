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
    const [IOUstat, setIOUstat] = useState();
    
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

    const changeIOUstat = useCallback((listItem) => {
        setIOUstat(listItem);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchIOUStatistics = async () => {
            const client = resolvedChainId ? getPublicClient(config, { chainId: resolvedChainId }) : undefined
            const hasClient = Boolean(resolvedChainId && client)
            const addressesForChain = resolvedChainId ? ADDRESS_BOOK?.[resolvedChainId] : undefined
            
            if (!hasClient || !addressesForChain?.StoreIOUs) {
                // console.warn(`[useGetIOUstat] Missing client or contract for chain ${resolvedChainId}`);
                return;
            }

            const storeIOUsAddress = getStoreIOUsAddress(resolvedChainId);
            if (!storeIOUsAddress) return;

            try {
                const stats = await readContract(config, {
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getIOUstotal',
                    chainId: resolvedChainId
                });
                
                if (!cancelled && stats) {
                    changeIOUstat(stats);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error fetching IOU statistics:', error);
                    changeIOUstat(null);
                }
            }
        };

        fetchIOUStatistics();

        return () => {
            cancelled = true;
        };
    }, [resolvedChainId, changeIOUstat]);

    return IOUstat;
}
