import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { hexToString } from 'viem'
import { readContract, getPublicClient } from 'wagmi/actions'
import {
  ADDRESS_BOOK,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAIN_NAMES,
  resolveChainId,
  getCurrentChainId,
  getStoreIOUsAddress,
} from '../constants'
import { config } from '../wagmi'
import ChainWebContext from '../context/chain/ChainWebContext'
import storeIOUsArtifact from '../artifacts/iStoreIOUs.json'

const STORE_ABI = storeIOUsArtifact.abi

export const useGetKeywordsList = () => {
  const [keywords, setKeywords] = useState([])
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

  const fetchKeywords = useCallback(async () => {
    const client = chainId ? getPublicClient(config, { chainId }) : undefined
    const hasClient = Boolean(chainId && client)
    const addressesForChain = chainId ? ADDRESS_BOOK?.[chainId] : undefined
    const hasAddresses = Boolean(
      chainId &&
        addressesForChain?.StoreIOUs &&
        addressesForChain?.ProxyIOU &&
        addressesForChain?.MakeIOU
    )

    console.info('[useGetKeywordsList] chain resolution', {
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
    if (!storeAddress) {
      setError('StoreIOUs address is not configured for this chain')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await readContract(config, {
        address: storeAddress,
        abi: STORE_ABI,
        functionName: 'getKeystotal',
        chainId: Number.isFinite(chainId) ? chainId : undefined,
      })

      const decoded = (response || [])
        .map((value) => {
          if (
            value === '0x0000000000000000000000000000000000000000000000000000000000000000'
          ) {
            return null
          }
          try {
            return hexToString(value)
          } catch {
            return null
          }
        })
        .filter(Boolean)
        .map((word) => word.toLowerCase())
        .sort((a, b) => a.localeCompare(b))

      setKeywords(decoded)
    } catch (err) {
      console.error('Failed to fetch keywords', err)
      setError(err?.message || 'Failed to fetch keywords')
      setKeywords([])
    } finally {
      setIsLoading(false)
    }
  }, [chainId])

  useEffect(() => {
    fetchKeywords()
  }, [fetchKeywords])

  return { keywords, isLoading, error, refetch: fetchKeywords }
}
