export const ROUTES = {
  main: '/',
  mintEditToken: '/mint-edit-token',
  editorIOU: '/editor-iou-page',
  mintSelectToken: '/mint-select-token',
  mintSelectReceiver: '/mint-select-receiver',
  makeIOUToken1: '/make-iou-token-1',
  makeIOUToken2: '/make-iou-token-2',
  payoffSelectToken: '/payoff-select-token',
  payoffAndFeedback: '/payoff-and-feedback',
  stakeSelectToken: '/stake-select-token',
  stakeAddPair: '/stake-add-pair',
  stakeAddLiquidity: '/stake-add-liquidity',
  findBuyIOU: '/find-buy-iou',
  buyIOUSelect: '/buy-iou-select',
  buyIOU: '/buy-iou',
  selectDesiredIOUSwap: '/select-desired-iou-swap',
  swapSelectDesiredToken: '/swap-select-desired-token',
  swapSelectAvailableToken: '/swap-select-available-token',
  exchange: 'https://quickswap.exchange/#/swap?outputCurrency='
};

// ---- Contract address helpers ----
// Stored at repo root and bundled by Vite. Artifacts also carry deployed addresses per network.
import storeIOUsArtifact from './artifacts/StoreIOUs.json';
import proxyIOUArtifact from './artifacts/ProxyIOU.json';
import makeIOUArtifact from './artifacts/MakeIOU.json';
import iouTokenArtifact from './artifacts/IOUtoken.json';
import { config } from './wagmi';

export const DEFAULT_CHAIN_ID = 137;

export const normalizeChainId = (value) => {
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

export const getPersistedChainId = () => {
  const fromCookie = getCookieValue('currChainId')
  if (fromCookie) return String(fromCookie)

  if (typeof window !== 'undefined') {
    try {
      const fromLocalStorage =
        window.localStorage?.getItem('currChainId') || window.localStorage?.getItem('chainId')
      if (fromLocalStorage) return String(fromLocalStorage)
    } catch {
      // ignore storage access issues
    }
  }

  return null
}

export const persistChainId = (chainId) => {
  const value = String(chainId)

  if (typeof document !== 'undefined') {
    document.cookie = `currChainId=${value}; path=/`;
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage?.setItem('currChainId', value)
    } catch {
      // ignore storage access issues
    }
  }
}

export const SUPPORTED_CHAINS = (config?.chains || []).map(({ id, name }) => ({ id, name }))
export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map(({ id }) => id)
export const SUPPORTED_CHAIN_NAMES = SUPPORTED_CHAINS.map(({ id, name }) => `${name} (${id})`)

export const resolveChainId = ({ walletChainId, isWalletConnected } = {}) => {
  const walletPreferred = isWalletConnected ? normalizeChainId(walletChainId) : null
  if (walletPreferred && SUPPORTED_CHAIN_IDS.includes(walletPreferred)) {
    persistChainId(walletPreferred)
    return walletPreferred
  }

  const persisted = normalizeChainId(getPersistedChainId())
  if (persisted && SUPPORTED_CHAIN_IDS.includes(persisted)) {
    return persisted
  }

  persistChainId(DEFAULT_CHAIN_ID)
  return DEFAULT_CHAIN_ID
}

const networksToAddresses = (artifact, key) =>
  Object.entries(artifact?.networks || {}).reduce((acc, [chainId, data]) => {
    if (!data?.address) return acc
    const id = String(chainId)
    acc[id] = { ...acc[id], [key]: data.address }
    return acc
  }, {})

const mergeAddressBooks = (...books) =>
  books.reduce((acc, book = {}) => {
    Object.entries(book).forEach(([chainId, contracts]) => {
      if (!contracts) return
      const id = String(chainId)
      acc[id] = { ...(acc[id] || {}), ...contracts }
    })
    return acc
  }, {})

// Artifacts only.
export const ADDRESS_BOOK = mergeAddressBooks(
  networksToAddresses(storeIOUsArtifact, 'StoreIOUs'),
  networksToAddresses(proxyIOUArtifact, 'ProxyIOU'),
  networksToAddresses(makeIOUArtifact, 'MakeIOU'),
  networksToAddresses(iouTokenArtifact, 'IOUtoken')
)

const getCookieValue = (name) => {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export const getCurrentChainId = ({ walletChainId, isWalletConnected } = {}) => {
  const injectedHex =
    walletChainId || (typeof window !== 'undefined' ? window?.ethereum?.chainId : undefined)

  const resolved = resolveChainId({
    walletChainId: injectedHex,
    isWalletConnected: Boolean(isWalletConnected || injectedHex),
  })

  return resolved !== null ? String(resolved) : null
}

export const getStoreIOUsAddress = (chainId = getCurrentChainId()) => {
  const key = String(chainId)
  return ADDRESS_BOOK?.[key]?.StoreIOUs;
}

export const getProxyIOUAddress = (chainId = getCurrentChainId()) => {
  const key = String(chainId)
  return ADDRESS_BOOK?.[key]?.ProxyIOU;
}

export const getMakeIOUAddress = (chainId = getCurrentChainId()) => {
  const key = String(chainId)
  return ADDRESS_BOOK?.[key]?.MakeIOU;
}

export const getIOUtokenAddress = (chainId = getCurrentChainId()) => {
  const key = String(chainId)
  return ADDRESS_BOOK?.[key]?.IOUtoken;
}

/**
 * Lightweight preflight helper: checks if a feature/address exists for a chain.
 * Accepts decimal or hex (0x-prefixed) chain ids.
 */
export const getFeatureAvailability = (chainId = getCurrentChainId(), featureKey) => {
  const normalized = (() => {
    if (typeof chainId === 'string' && chainId.startsWith('0x')) {
      return String(parseInt(chainId, 16))
    }
    return String(chainId)
  })()

  const addressForFeature = featureKey ? ADDRESS_BOOK?.[normalized]?.[featureKey] : undefined

  return {
    chainId: normalized,
    feature: featureKey,
    available: Boolean(addressForFeature),
    address: addressForFeature || null,
  }
}
