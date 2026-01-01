import { useContext, useEffect, useMemo, useState } from 'react'
import { readContract } from 'wagmi/actions'
import { getCurrentChainId, getStoreIOUsAddress } from '../constants'
import addresses from '../../addresses.json'
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

export default function useGetDashboardTotals() {
  const [totals, setTotals] = useState({ ious: '0', issuers: '0' })
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

  const resolvedChainId = useMemo(() => {
    const preferred = normalizeChainId(ctxChainId) ?? normalizeChainId(getCurrentChainId())
    if (preferred && config?.transports?.[preferred]) return preferred
    return supportedChainIds[0] ?? null
  }, [ctxChainId, supportedChainIds])

  useEffect(() => {
    let cancelled = false

    const loadTotals = async () => {
      if (!resolvedChainId || !config?.transports?.[resolvedChainId]) {
        setError('No supported chain configuration found')
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
          readContract({
            address: storeAddress,
            abi: STORE_ABI,
            functionName: 'getIOUstotal',
            chainId: Number.isFinite(chainId) ? chainId : undefined,
          }),
          readContract({
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
