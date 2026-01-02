import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi'
import { formatEther, hexToString, stringToHex, parseEther } from 'viem'
import TokensListContext from '../context/TokensListContext';
import { getFeedbacks } from '../helpers/getFeedbacks';
import { getAllIOUs } from "../helpers/getAllIOUs";
import { getStoreIOUsAddress, getProxyIOUAddress, resolveChainId } from '../constants';

// Contract ABIs - these would typically be imported from separate files
const STORE_IOUS_ABI = [
  {
    "inputs": [
      {"name": "keyword", "type": "bytes32"},
      {"name": "country", "type": "string"},
      {"name": "state", "type": "string"},
      {"name": "city", "type": "string"},
      {"name": "street", "type": "string"}
    ],
    "name": "getIOUsbyStreet",
    "outputs": [{"type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "keyword", "type": "bytes32"},
      {"name": "country", "type": "string"},
      {"name": "state", "type": "string"},
      {"name": "city", "type": "string"}
    ],
    "name": "getIOUsbyCity",
    "outputs": [{"type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "keyword", "type": "bytes32"}],
    "name": "getIOUListKey",
    "outputs": [{"type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "getIOUList",
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

export default function useFindIOU(factory, deps) {
  const params = useParams();
  const { address, isConnected, chainId: walletChainId } = useAccount();
  const [IOUAddreses, setIOUAddreses] = useState();
  const [IOUList, setIOUList] = useState();
  const [feedbackList, setFeedbackList] = useState(null);
  const [tokenHolders, setTokenHolders] = useState(null);
  
  const tokenList = useContext(TokensListContext)
  const [values, setFormValues] = useState(tokenList.values)

  const resolvedChainId = React.useMemo(
    () => resolveChainId({ walletChainId, isWalletConnected: isConnected }),
    [walletChainId, isConnected]
  )

  const storeIOUsAddress = React.useMemo(
    () => getStoreIOUsAddress(resolvedChainId),
    [resolvedChainId]
  )

  const proxyIOUAddress = React.useMemo(
    () => getProxyIOUAddress(resolvedChainId),
    [resolvedChainId]
  )

  const changeIOUListAddreses = useCallback((addressList) => {
    setIOUAddreses(addressList);
  }, []);

  const changeIOUList = useCallback((listItem) => {
    setIOUList(listItem)
  }, []);

  // Convert string to bytes32 for contract calls
  const stringToBytes32 = (str) => stringToHex(str.toLowerCase().trim())

  // Search for IOU addresses based on search criteria
  useEffect(() => {
    if (!isConnected || !address || !storeIOUsAddress) return;

    const searchIOUs = async () => {
      if (values.searchStreet) {
        const addresses = await fetchIOUAddressesByStreet(values);
        changeIOUListAddreses(addresses);
      } else if (values.searchLocation) {
        const addresses = await fetchIOUAddressesByLocation(values);
        changeIOUListAddreses(addresses);
      } else if (values.keyword) {
        const addresses = await fetchIOUAddressesByKeyword(values.keyword.trim().toLowerCase());
        changeIOUListAddreses(addresses);
      } else {
        // Get all IOU addresses for connected account
        const addresses = await fetchAllIOUAddresses();
        changeIOUListAddreses(addresses);
      }
    };

    searchIOUs();
  }, [values, isConnected, address, changeIOUListAddreses, storeIOUsAddress]);

  // Helper function to fetch IOU addresses by street
  const fetchIOUAddressesByStreet = async (searchValues) => {
    try {
      const { readContract } = await import('wagmi/actions');
        const addresses = await readContract({
          address: storeIOUsAddress,
        abi: STORE_IOUS_ABI,
        functionName: 'getIOUsbyStreet',
        args: [
          stringToBytes32(searchValues.keyword.trim().toLowerCase()),
          searchValues.country.trim(),
          searchValues.state.trim(),
          searchValues.city.trim(),
          searchValues.street.trim()
        ]
      });
      return addresses || [];
    } catch (error) {
      console.error('Error fetching IOUs by street:', error);
      return [];
    }
  };

  // Helper function to fetch IOU addresses by location
  const fetchIOUAddressesByLocation = async (searchValues) => {
    try {
      const { readContract } = await import('wagmi/actions');
        const addresses = await readContract({
          address: storeIOUsAddress,
        abi: STORE_IOUS_ABI,
        functionName: 'getIOUsbyCity',
        args: [
          stringToBytes32(searchValues.keyword.trim().toLowerCase()),
          searchValues.country.trim(),
          searchValues.state.trim(),
          searchValues.city.trim()
        ]
      });
      return addresses || [];
    } catch (error) {
      console.error('Error fetching IOUs by location:', error);
      return [];
    }
  };

  // Helper function to fetch IOU addresses by keyword
  const fetchIOUAddressesByKeyword = async (keyword) => {
    try {
      const { readContract } = await import('wagmi/actions');
        const addresses = await readContract({
          address: storeIOUsAddress,
        abi: STORE_IOUS_ABI,
        functionName: 'getIOUListKey',
        args: [stringToBytes32(keyword)]
      });
      return addresses || [];
    } catch (error) {
      console.error('Error fetching IOUs by keyword:', error);
      return [];
    }
  };

  // Helper function to fetch all IOU addresses for connected account
  const fetchAllIOUAddresses = async () => {
    try {
      const { readContract } = await import('wagmi/actions');
        const addresses = await readContract({
          address: storeIOUsAddress,
        abi: STORE_IOUS_ABI,
        functionName: 'getIOUList',
        args: [address]
      });
      return addresses || [];
    } catch (error) {
      console.error('Error fetching all IOUs:', error);
      return [];
    }
  };

  // Process IOU addresses to get detailed information
  useEffect(() => {
    const processIOUAddresses = async () => {
       if (!IOUAddreses || IOUAddreses.length === 0 || !proxyIOUAddress) return;

      const IOUListObjects = [];
      
      for (let i = 0; i < IOUAddreses.length; i++) {
        try {
          const { readContract } = await import('wagmi/actions');
          const iouData = await readContract({
            address: proxyIOUAddress,
            abi: PROXY_IOU_ABI,
            functionName: 'getIOU',
            args: [IOUAddreses[i]]
          });

          if (iouData) {
            // Convert keywords from bytes32 to string
            const keys = iouData.description.keywords.map(bytes32 => 
              hexToString(bytes32)
            );

            // Get feedbacks and holders using the updated helpers
            const feedbacks = getFeedbacks(IOUAddreses[i]);
            const holders = getAllIOUs(IOUAddreses[i]);

            if (feedbacks.length === 0) {
              setFeedbackList(feedbacks);
            }

            IOUListObjects.push({
              id: i,
              title: iouData.name,
              symbol: iouData.symbol,
              count: i,
              description: iouData.description.description,
              issuerName: iouData.description.myName,
              issuerAddr: iouData.description.issuer,
              socialProfile: iouData.description.socialProfile,
              keys: keys.join(','),
              portfolio: "coming soon...",
              address: IOUAddreses[i],
              minted: formatEther(iouData.description.totalMinted),
              payed: formatEther(iouData.description.totalBurned),
              rating: iouData.description.avRate,
              units: hexToString(iouData.description.units),
              location: iouData.description.location,
              phone: hexToString(iouData.description.phone),
              feedbacks,
              holders,
            });

            changeIOUList(IOUListObjects);
          }
        } catch (error) {
          console.error(`Error processing IOU ${IOUAddreses[i]}:`, error);
        }
      }
    };

    processIOUAddresses();
  }, [IOUAddreses, changeIOUList, proxyIOUAddress]);

  return [IOUList];
}
