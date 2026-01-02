import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import dappChains from './assets/dappChains.json'

const convertToWagmiChain = (chainData) => {
  const id = parseInt(chainData.chainId, 16)
  const rpcUrls = chainData.rpcUrls || []
  
  // Handle native currency inconsistency in dappChains.json
  const nativeCurrency = {
    name: chainData.nativeCurrency.name || chainData.nativeCurrency.chainName || chainData.nativeCurrency.symbol,
    symbol: chainData.nativeCurrency.symbol,
    decimals: chainData.nativeCurrency.decimals || 18,
  }

  return {
    id,
    name: chainData.chainName,
    nativeCurrency,
    rpcUrls: {
      default: { http: rpcUrls },
      public: { http: rpcUrls },
    },
    blockExplorers: chainData.blockExplorerUrls?.[0]
      ? { default: { name: 'Explorer', url: chainData.blockExplorerUrls[0] } }
      : undefined,
    testnet: chainData.chainName.toLowerCase().includes('testnet') || id === 1337 || id === 5777,
  }
}

const chains = Object.values(dappChains).map(convertToWagmiChain)

if (chains.length === 0) {
  console.error('No supported chains found in dappChains.json')
}

const transports = {}

chains.forEach(chain => {
    const url = chain.rpcUrls.default.http[0]
    if (url) {
        transports[chain.id] = http(url)
    } else {
        transports[chain.id] = http()
    }
})

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({ projectId: 'your-project-id' }), // Replace with actual project ID
  ],
  transports,
})
