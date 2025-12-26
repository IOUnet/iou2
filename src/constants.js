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
// Stored at repo root and bundled by Vite.
import addresses from '../addresses.json';

const getCookieValue = (name) => {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export const getCurrentChainId = () => {
  // Primary: app cookie set by the chain selector.
  const fromCookie = getCookieValue('currChainId');
  if (fromCookie) return String(fromCookie);

  // Fallback: injected provider chainId.
  if (typeof window !== 'undefined' && window.ethereum?.chainId) {
    try {
      return String(parseInt(window.ethereum.chainId, 16));
    } catch {
      // ignore
    }
  }

  // Last resort: keep existing default chainId used in addresses.json.
  return '999';
}

export const getStoreIOUsAddress = (chainId = getCurrentChainId()) => {
  return addresses?.[chainId]?.StoreIOUs;
}

export const getProxyIOUAddress = (chainId = getCurrentChainId()) => {
  return addresses?.[chainId]?.ProxyIOU;
}

export const getMakeIOUAddress = (chainId = getCurrentChainId()) => {
  return addresses?.[chainId]?.MakeIOU;
}

export const getIOUtokenAddress = (chainId = getCurrentChainId()) => {
  return addresses?.[chainId]?.IOUtoken;
}
