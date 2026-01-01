import { useContext, useEffect, useMemo, useState } from 'react'
import { formatEther, hexToString, stringToHex } from 'viem'
import { readContract } from 'wagmi/actions'
import { getCurrentChainId, getProxyIOUAddress, getStoreIOUsAddress } from '../constants'
import addresses from '../../addresses.json'
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

export default function useGetIOUsByKeyword(keyword) {
  const [data, setData] = useState([])
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

  useEffect(() => {
    let cancelled = false

    const fetchIOUs = async () => {
      if (!keyword) {
        setData([])
        setError(null)
        return
      }

      if (!chainId || !config?.transports?.[chainId]) {
        setError('No supported chain configuration found')
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

        const iouAddresses = await readContract({
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
              const result = await readContract({
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
