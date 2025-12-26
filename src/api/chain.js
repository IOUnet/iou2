// Legacy API file - Most functionality is now handled by Wagmi
// This file is deprecated and maintained for backward compatibility
// Consider migrating to use Wagmi hooks directly for new functionality

import { getAddress } from 'viem'

// These constants might still be needed by the application
export const UNISWAP_CHAIN_ID = '0x1'
export const DAPP_CHAIN_ID = '0x539'
export const CHAIN_UPDATE_DATE_DELAY = 12000 // ms

// Helper function to validate and format addresses
export const formatAddress = (address) => {
  if (!address) return null
  try {
    return getAddress(address)
  } catch (error) {
    console.warn('Invalid address format:', address)
    return null
  }
}

// Legacy function - use Wagmi's useAccount hook instead
export const detectEthereumProvider = async ({ mustBeMetaMask = false, silent = false, timeout = 3000 } = {}) => {
  console.warn('detectEthereumProvider is deprecated. Use Wagmi hooks instead.')
  return { ethereum: null, web3: null }
}

// Legacy function - use Wagmi's useAccount hook instead  
export const pollWalletConnect = async (ethereum) => {
  console.warn('pollWalletConnect is deprecated. Use Wagmi hooks instead.')
  return []
}

// Legacy function - use Wagmi's useAccount hook instead
export const pollWalletPermissions = async (ethereum) => {
  console.warn('pollWalletPermissions is deprecated. Use Wagmi hooks instead.')
  return []
}

// Legacy function - use Wagmi's useAccount hook instead
export const pollCurrentChainId = async (ethereum) => {
  console.warn('pollCurrentChainId is deprecated. Use Wagmi hooks instead.')
  return '0x1'
}

// Legacy function - use Wagmi's useSwitchChain hook instead
export const switchChain = async (ethereum, chain) => {
  console.warn('switchChain is deprecated. Use Wagmi hooks instead.')
  throw new Error('Use Wagmi useSwitchChain hook instead')
}

// Legacy function - use Wagmi's useAccount hook instead
export const addTokenToWallet = async (ethereum, asset) => {
  console.warn('addTokenToWallet is deprecated. Use Wagmi hooks instead.')
  try {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: asset,
      },
    })
  } catch (error) {
    if (error.code === 4001) {
      return
    } else {
      throw error
    }
  }
}

// Legacy functions - use Wagmi's readContract and getBalance instead
export const getChainBalance = async (web3, address) => {
  console.warn('getChainBalance is deprecated. Use Wagmi readContract instead.')
  return '0'
}

export const getERC20ContractBalance = async (contract, address) => {
  console.warn('getERC20ContractBalance is deprecated. Use Wagmi readContract instead.')
  return '0'
}

export const getBlockData = async (web3) => {
  console.warn('getBlockData is deprecated. Use Wagmi readContract instead.')
  return {}
}