import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { hexToString } from 'viem'
import { readContract } from 'wagmi/actions'
import { getCurrentChainId, getStoreIOUsAddress } from '../constants'
import addresses from '../../addresses.json'
import { config } from '../wagmi'
import ChainWebContext from '../context/chain/ChainWebContext'
import storeIOUsArtifact from '../artifacts/iStoreIOUs.json'

const STORE_ABI = storeIOUsArtifact.abi

export default function useGetKeywordsList() {
  const [keywords, setKeywords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { chainId: ctxChainId } = useContext(ChainWebContext) || {}

  const normalizeChainId = (value) => {
    if (value === undefined || value === null) return null
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (!trimmed) return null
      if (trimmed.startsWith('0x')) {
        const parsed = Number.parseInt(trimmed, 16)
        return Number.isNaN(parsed) ? null : parsed
      }
      const parsed = Number(trimmed)
      return Number.isNaN(parsed) ? null : parsed
    }
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    return null
  }

  const supportedChainIds = useMemo(
    () =>
      Object.keys(addresses)
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id) && config?.transports?.[id]),
    []
  )

  const chainId = useMemo(() => {
    const preferred = normalizeChainId(ctxChainId) ?? normalizeChainId(getCurrentChainId())
    if (preferred && config?.transports?.[preferred]) return preferred
    return supportedChainIds[0] ?? null
  }, [ctxChainId, supportedChainIds])

  const fetchKeywords = useCallback(async () => {
    if (!chainId || !config?.transports?.[chainId]) {
      setError('No supported chain configuration found')
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
      const response = await readContract({
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
