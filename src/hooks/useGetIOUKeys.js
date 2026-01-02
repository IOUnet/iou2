import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react'
import { readContract, getPublicClient } from 'wagmi/actions'
import { hexToString } from 'viem'
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
    "name": "getKeystotal",
    "outputs": [{"type": "bytes32[]"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function useGetKeys() {
    const [IOUKeys, setIOUKeys] = useState();
    
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

    const changeIOUKeys = useCallback((listItem) => {
        setIOUKeys(listItem);
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchIOUKeys = async () => {
            const client = resolvedChainId ? getPublicClient(config, { chainId: resolvedChainId }) : undefined
            const hasClient = Boolean(resolvedChainId && client)
            const addressesForChain = resolvedChainId ? ADDRESS_BOOK?.[resolvedChainId] : undefined
            
            if (!hasClient || !addressesForChain?.StoreIOUs) {
                return;
            }

            const storeIOUsAddress = getStoreIOUsAddress(resolvedChainId);
            if (!storeIOUsAddress) return;

            try {
                const keys = await readContract(config, {
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getKeystotal',
                    chainId: resolvedChainId
                });
                
                if (!cancelled && keys) {
                    const decodedKeys = keys.map((value) => {
                        if (value !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                            return hexToString(value);
                        }
                        return null;
                    }).filter(Boolean); // Remove null values
                    
                    changeIOUKeys(decodedKeys);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error fetching IOU keys:', error);
                    changeIOUKeys([]);
                }
            }
        };

        fetchIOUKeys();

        return () => {
            cancelled = true;
        };
    }, [resolvedChainId, changeIOUKeys]);

    return IOUKeys;
}
