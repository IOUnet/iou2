import { createContext } from 'react'

const ChainWebContext = createContext({
  hasInitialization: false,

  provider: null,
  initialization: async () => {},
  resetProvider: async () => {},

  isRequest: false,
  isWalletRequest: false,
  setIsWalletRequest: () => {},

  chainId: '',
  isChainConnected: false,
  switchChain: async () => {},

  account: '',
  connectWallet: async () => {},
  requestPermissions: async () => {},
  addAssetToMetamask: async () => {},

  stable: null,
  token: null,
  chainToken: null,
  contract: null,
  user: null,
  statistics: null,
  block: null,

  buyTokens: async () => {},
  withdrawTokens: async () => {},
  getTransactionCost: async () => {},
  getWithdrawTransactionCost: async () => {},
})

export default ChainWebContext
