import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { readContract, getPublicClient } from 'wagmi/actions'
import { formatEther, hexToString } from 'viem'
import { config } from '../wagmi'
import { getStoreIOUsAddress, getProxyIOUAddress, resolveChainId } from '../constants'

// Contract ABIs
const STORE_IOUS_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "getIOUListHold",
    "outputs": [{"type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  }
];

const PROXY_IOU_ABI = [
  {
    "inputs": [{"name": "ioUAddress", "type": "address"}],
    "name": "getIOU",
    "outputs": [{
      "components": [
        {"name": "name", "type": "string"},
        {"name": "symbol", "type": "string"},
        {
          "name": "description",
          "type": "tuple",
          "components": [
            {"name": "description", "type": "string"},
            {"name": "myName", "type": "string"},
            {"name": "issuer", "type": "address"},
            {"name": "socialProfile", "type": "string"},
            {"name": "keywords", "type": "bytes32[]"},
            {"name": "totalMinted", "type": "uint256"},
            {"name": "totalBurned", "type": "uint256"},
            {"name": "avRate", "type": "uint8"},
            {"name": "units", "type": "bytes32"},
            {"name": "location", "type": "string"},
            {"name": "phone", "type": "bytes32"}
          ]
        }
      ],
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function useGetIOUsPayof() {
    const { address, isConnected, chainId: walletChainId } = useAccount();
    const [IOUAddresses, setIOUAddresses] = useState();
    const [IOUList, setIOUList] = useState();
    
    const resolvedChainId = useMemo(
        () => resolveChainId({ walletChainId, isWalletConnected: isConnected }),
        [walletChainId, isConnected]
    )

    const storeIOUsAddress = useMemo(
        () => getStoreIOUsAddress(resolvedChainId),
        [resolvedChainId]
    )

    const proxyIOUAddress = useMemo(
        () => getProxyIOUAddress(resolvedChainId),
        [resolvedChainId]
    )

    const changeIOUListAddresses = useCallback((addressList) => {
        setIOUAddresses(addressList);
    }, []);

    const changeIOUList = useCallback((listItem) => {
        setIOUList(listItem);
    }, []);

    // Fetch IOU addresses held by the connected account
    useEffect(() => {
        const fetchHeldIOUAddresses = async () => {
            if (!isConnected || !address || !storeIOUsAddress) return;

            const publicClient = getPublicClient(config)
            if (!publicClient) return

            try {
                const addresses = await readContract(config, {
                    address: storeIOUsAddress,
                    abi: STORE_IOUS_ABI,
                    functionName: 'getIOUListHold',
                    args: [address]
                });
                changeIOUListAddresses(addresses || []);
            } catch (error) {
                console.error('Error fetching held IOU addresses:', error);
                changeIOUListAddresses([]);
            }
        };

        fetchHeldIOUAddresses();
    }, [address, isConnected, changeIOUListAddresses, storeIOUsAddress]);

    // Fetch detailed IOU information
    useEffect(() => {
        const fetchIOUDetails = async () => {
            if (!IOUAddresses || IOUAddresses.length === 0 || !proxyIOUAddress) return;

            const publicClient = getPublicClient(config)
            if (!publicClient) return

            const IOUListObjects = [];
            
            for (let i = 0; i < IOUAddresses.length; i++) {
                try {
                    const iouData = await readContract(config, {
                        address: proxyIOUAddress,
                        abi: PROXY_IOU_ABI,
                        functionName: 'getIOU',
                        args: [IOUAddresses[i]]
                    });

                    if (iouData) {
                        // Convert keywords from bytes32 to string
                        const keys = iouData.description.keywords.map(bytes32 => 
                            hexToString(bytes32)
                        );

                        IOUListObjects.push({
                            id: i,
                            title: iouData.name,
                            count: i,
                            description: iouData.description.description,
                            keys: keys.join(','),
                            address: IOUAddresses[i],
                            minted: formatEther(iouData.description.totalMinted),
                            payed: formatEther(iouData.description.totalBurned),
                            rating: iouData.description.avRate,
                            units: hexToString(iouData.description.units),
                            location: iouData.description.location,
                            phone: hexToString(iouData.description.phone)
                        });
                    }
                } catch (error) {
                    console.error(`Error fetching IOU details for ${IOUAddresses[i]}:`, error);
                }
            }

            changeIOUList(IOUListObjects);
        };

        fetchIOUDetails();
    }, [IOUAddresses, changeIOUList]);

    return IOUList;
}