import { useContext, useEffect, useMemo, useState } from 'react'
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

const normalizeBigIntToString = (value) => {
  if (typeof value === 'bigint') return value.toString()
  if (value === undefined || value === null) return '0'
  try {
    return Number(value).toString()
  } catch {
    return String(value)
  }
}

export const useGetDashboardTotals = () => {
  const [totals, setTotals] = useState({ ious: '0', issuers: '0' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    let cancelled = false

    const loadTotals = async () => {
      const client = resolvedChainId ? getPublicClient(config, { chainId: resolvedChainId }) : undefined
      const hasClient = Boolean(resolvedChainId && client)
      const addressesForChain = resolvedChainId ? ADDRESS_BOOK?.[resolvedChainId] : undefined
      const hasAddresses = Boolean(
        resolvedChainId &&
          addressesForChain?.StoreIOUs &&
          addressesForChain?.ProxyIOU &&
          addressesForChain?.MakeIOU
      )

      console.info('[useGetDashboardTotals] chain resolution', {
        ctxChainId,
        cookieChainId: getCurrentChainId(),
        resolvedChainId,
        hasClient,
        hasAddresses,
        addressesForChain,
        supportedChainIds: SUPPORTED_CHAIN_IDS,
        supportedChainNames: SUPPORTED_CHAIN_NAMES,
        chainIdType: typeof resolvedChainId,
      })

      if (!hasClient) {
        setError(
          `Unsupported chain ${resolvedChainId ?? 'unknown'}. Supported chains: ${SUPPORTED_CHAIN_NAMES.join(', ')}`
        )
        return
      }

      if (!hasAddresses) {
        setError(
          `Contracts are not configured for chain ${resolvedChainId}. Check artifact networks (not addresses.json). Supported chains: ${SUPPORTED_CHAIN_NAMES.join(', ')}`
        )
        return
      }

      const storeAddress = getStoreIOUsAddress(resolvedChainId)
      const chainId = resolvedChainId

      if (!storeAddress) {
        setError('StoreIOUs address is not configured for this chain')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const [iousTotal, issuersTotal] = await Promise.all([
          readContract(config, {
            address: storeAddress,
            abi: STORE_ABI,
            functionName: 'getIOUstotal',
            chainId: Number.isFinite(chainId) ? chainId : undefined,
          }),
          readContract(config, {
            address: storeAddress,
            abi: STORE_ABI,
            functionName: 'getIssuerstotal',
            chainId: Number.isFinite(chainId) ? chainId : undefined,
          }),
        ])

        if (!cancelled) {
          setTotals({
            ious: normalizeBigIntToString(iousTotal),
            issuers: normalizeBigIntToString(issuersTotal),
          })
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load totals', err)
          setError(err?.message || 'Failed to load totals')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadTotals()

    return () => {
      cancelled = true
    }
  }, [resolvedChainId])

  return { ...totals, isLoading, error }
}
