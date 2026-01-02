import { useContext, useEffect, useMemo, useState } from 'react'
import { formatEther, hexToString, stringToHex } from 'viem'
import { readContract, getPublicClient } from 'wagmi/actions'
import {
  ADDRESS_BOOK,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAIN_NAMES,
  resolveChainId,
  getCurrentChainId,
  getProxyIOUAddress,
  getStoreIOUsAddress,
} from '../constants'
import { config } from '../wagmi'
import ChainWebContext from '../context/chain/ChainWebContext'
import storeIOUsArtifact from '../artifacts/iStoreIOUs.json'

const STORE_ABI = storeIOUsArtifact.abi

const PROXY_ABI = [
  {
    inputs: [{ name: 'ioUAddress', type: 'address' }],
    name: 'getIOU',
    outputs: [
      {
        components: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          {
            name: 'description',
            type: 'tuple',
            components: [
              { name: 'description', type: 'string' },
              { name: 'myName', type: 'string' },
              { name: 'issuer', type: 'address' },
              { name: 'socialProfile', type: 'string' },
              { name: 'keywords', type: 'bytes32[]' },
              { name: 'totalMinted', type: 'uint256' },
              { name: 'totalBurned', type: 'uint256' },
              { name: 'avRate', type: 'uint8' },
              { name: 'units', type: 'bytes32' },
              { name: 'location', type: 'string' },
              { name: 'phone', type: 'bytes32' },
            ],
          },
        ],
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const useGetIOUsByKeyword = (keyword) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { chainId: ctxChainId, resolvedChainId: ctxResolvedChainId, isChainConnected } =
    useContext(ChainWebContext) || {}

  const chainId = useMemo(
    () =>
      resolveChainId({
        walletChainId: ctxResolvedChainId || ctxChainId,
        isWalletConnected: isChainConnected,
      }),
    [ctxResolvedChainId, ctxChainId, isChainConnected]
  )

  useEffect(() => {
    let cancelled = false

    const fetchIOUs = async () => {
      if (!keyword) {
        setData([])
        setError(null)
        return
      }

      const client = chainId ? getPublicClient(config, { chainId }) : undefined
      const hasClient = Boolean(chainId && client)
      const addressesForChain = chainId ? ADDRESS_BOOK?.[chainId] : undefined
      const hasAddresses = Boolean(
        chainId &&
          addressesForChain?.StoreIOUs &&
          addressesForChain?.ProxyIOU &&
          addressesForChain?.MakeIOU
      )

      console.info('[useGetIOUsByKeyword] chain resolution', {
        ctxChainId,
        cookieChainId: getCurrentChainId(),
        resolvedChainId: chainId,
        hasClient,
        hasAddresses,
        addressesForChain,
        supportedChainIds: SUPPORTED_CHAIN_IDS,
        supportedChainNames: SUPPORTED_CHAIN_NAMES,
        chainIdType: typeof chainId,
      })

      if (!hasClient) {
        setError(
          `Unsupported chain ${chainId ?? 'unknown'}. Supported chains: ${SUPPORTED_CHAIN_NAMES.join(', ')}`
        )
        return
      }

      if (!hasAddresses) {
        setError(
          `Contracts are not configured for chain ${chainId}. Check artifact networks (not addresses.json). Supported chains: ${SUPPORTED_CHAIN_NAMES.join(', ')}`
        )
        return
      }

      const storeAddress = getStoreIOUsAddress(chainId)
      const proxyAddress = getProxyIOUAddress(chainId)

      if (!storeAddress || !proxyAddress) {
        setError('StoreIOUs/ProxyIOU addresses are not configured for this chain')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        let keyBytes
        try {
          keyBytes = stringToHex(keyword.trim().toLowerCase(), { size: 32 })
        } catch (conversionError) {
          setError('Keyword is too long to encode')
          setIsLoading(false)
          return
        }

        const iouAddresses = await readContract(config, {
          address: storeAddress,
          abi: STORE_ABI,
          functionName: 'getIOUListKey',
          args: [keyBytes],
          chainId: Number.isFinite(chainId) ? chainId : undefined,
        })

        if (cancelled) return

        if (!iouAddresses?.length) {
          setData([])
          return
        }

        const tokens = await Promise.all(
          iouAddresses.map(async (address) => {
            try {
              const result = await readContract(config, {
                address: proxyAddress,
                abi: PROXY_ABI,
                functionName: 'getIOU',
                args: [address],
                chainId: Number.isFinite(chainId) ? chainId : undefined,
              })

              const description = result?.description || {}
              const keywords = (description.keywords || [])
                .map((val) => {
                  try {
                    return hexToString(val)
                  } catch {
                    return null
                  }
                })
                .filter(Boolean)
                .join(', ')

              return {
                id: address,
                title: result?.name || 'IOU',
                symbol: result?.symbol || '',
                description: description.description || '',
                issuerName: description.myName || '',
                issuerAddr: description.issuer,
                socialProfile: description.socialProfile,
                keys: keywords,
                address,
                minted: description.totalMinted ? formatEther(description.totalMinted) : undefined,
                payed: description.totalBurned ? formatEther(description.totalBurned) : undefined,
                rating: description.avRate ?? undefined,
                units: description.units ? hexToString(description.units) : undefined,
                location: description.location,
                phone: description.phone ? hexToString(description.phone) : undefined,
              }
            } catch (err) {
              console.error(`Failed to load IOU data for ${address}`, err)
              return {
                id: address,
                title: 'IOU',
                symbol: '',
                description: '',
                issuerAddr: address,
                address,
              }
            }
          })
        )

        if (!cancelled) {
          setData(tokens)
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch IOUs by keyword', err)
          setError(err?.message || 'Failed to fetch IOUs')
          setData([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchIOUs()

    return () => {
      cancelled = true
    }
  }, [keyword, chainId])

  return { data, isLoading, error }
}
