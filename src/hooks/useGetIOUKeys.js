import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { hexToString } from 'viem'
import { getStoreIOUsAddress } from '../constants'

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
    const { address, isConnected } = useAccount();
    const [IOUKeys, setIOUKeys] = useState();
    
    const storeIOUsAddress = getStoreIOUsAddress();

    const changeIOUKeys = useCallback((listItem) => {
        setIOUKeys(listItem);
    }, []);

    useEffect(() => {
        const fetchIOUKeys = async () => {
            if (!isConnected || !address) return;

            try {
                const { readContract } = await import('wagmi/actions');
                const keys = await readContract({
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getKeystotal'
                });
                
                if (keys) {
                    const decodedKeys = keys.map((value) => {
                        if (value !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                            return hexToString(value);
                        }
                        return null;
                    }).filter(Boolean); // Remove null values
                    
                    changeIOUKeys(decodedKeys);
                }
            } catch (error) {
                console.error('Error fetching IOU keys:', error);
                changeIOUKeys([]);
            }
        };

        fetchIOUKeys();
    }, [address, isConnected, changeIOUKeys]);

    return IOUKeys;
}