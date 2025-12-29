import React, { useState, useEffect, useCallback, useContext } from 'react'
import ChainWebContext from './ChainWebContext'
import NotificationContext from '../notification/NotificationContext'
import t from '../../assets/translations.json'
import { useCookies } from 'react-cookie';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance, useWalletClient } from 'wagmi'
import { formatEther } from 'viem'

import dappChains from '../../assets/dappChains.json'

// const dappChains = require("../../assets/dappChains.json")

const ChainWebProvider = ({ children }) => {
 const [hasInitialization, setHasInitialization] = useState(false)
 const [isRequest, setIsRequest] = useState(false)
 const [isWalletRequest, setIsWalletRequest] = useState(false)
 const [stable, setStable] = useState(null)
 const [token, setToken] = useState(null)
 const [contract, setContract] = useState(null)
 const [user, setUser] = useState(null)
 const [statistics, setStatistics] = useState(null)
 const [block, setBlock] = useState(null)
 const [cookies, setCookie] = useCookies(['currChainId']);

 const { createNote } = useContext(NotificationContext)

 const { address, isConnected, chainId } = useAccount()
 const { connect, connectors } = useConnect()
 const { disconnect } = useDisconnect()
 const { switchChain } = useSwitchChain()
 const { data: walletClient } = useWalletClient()

useEffect(() => {
  if (isConnected && address) {
    // Initialization logic if needed
    setHasInitialization(true)
    createNote({ children: 'Wallet connected successfully', type: 'success' })
  } else {
    setHasInitialization(false)
  }
}, [isConnected, address, createNote])

const initialization = useCallback(async () => {
  // Wagmi handles initialization automatically
  setHasInitialization(true)
  createNote({ children: 'Initialization was successful', type: 'success' })
}, [createNote])

const resetProvider = () => {
  disconnect()
  setHasInitialization(false)
}

const connectWallet = async () => {
  setIsWalletRequest(true)
  try {
    const injectedConnector = connectors.find(c => c.id === 'injected')
    if (injectedConnector) {
      await connect({ connector: injectedConnector })
    }
  } catch (error) {
    createNote({ children: t.connectWalletError })
  } finally {
    setIsWalletRequest(false)
  }
}

const requestPermissions = async () => {
  // Wagmi handles permissions automatically
}

  const normalizeHexChainId = (maybeId) => {
    if (!maybeId) return null
    if (typeof maybeId === 'string') {
      if (maybeId.startsWith('0x')) return maybeId.toLowerCase()
      const parsed = Number(maybeId)
      if (!Number.isNaN(parsed)) return `0x${parsed.toString(16)}`
      return null
    }
    if (typeof maybeId === 'number') return `0x${maybeId.toString(16)}`
    return null
  }

  const switchChainHandler = async (_chainConfig) => {
    setIsWalletRequest(true)
    try {
      let chainConfig = normalizeHexChainId(_chainConfig)

      if (!chainConfig || !dappChains.hasOwnProperty(chainConfig)) {
        chainConfig = Object.values(dappChains)[0].chainId.toLowerCase()
      }

      await switchChain({ chainId: parseInt(chainConfig, 16) })
      setCookie('currChainId', chainConfig, { path: '/' })
    } catch (error) {
      createNote({ children: t.switchChainError })
    } finally {
      setIsWalletRequest(false)
    }
  }

const addAssetToMetamask = async () => {
  if (!token || !walletClient) { return "waiting token or wallet client" }

  setIsWalletRequest(true)

  try {
    const { address, symbol, decimals } = token
    await walletClient.watchAsset({
      type: 'ERC20',
      options: { address, symbol, decimals }
    })
  } catch (error) {
    createNote({ children: t.addAssetToMetamaskError })
  } finally {
    setIsWalletRequest(false)
  }
}

const buyTokens = async (stableAmount) => {
  // This needs to be refactored to use useWriteContract in hooks
  return 'not implemented'
}

const withdrawTokens = async () => {
  // This needs to be refactored to use useWriteContract in hooks
  return 'not implemented'
}

const getTransactionCost = async () => {
  // Use Wagmi's estimateGas
  return 0 // placeholder
}

const getWithdrawTransactionCost = useCallback(async () => {
  // Use Wagmi's estimateGas
  return 0 // placeholder
}, [])

  const value = {
    hasInitialization,
    initialization,
    resetProvider,

    isRequest,
    isWalletRequest,
    setIsWalletRequest,

    chainId: chainId?.toString(),
    isChainConnected: isConnected,
    switchChain: switchChainHandler,

    account: address,
    connectWallet,
    requestPermissions,
    addAssetToMetamask,

    stable,
    token,
    contract,
    user,
    statistics,
    block,

    buyTokens,
    withdrawTokens,
    getTransactionCost,
    getWithdrawTransactionCost,
  }
/*   if (hasInitialization) { */
    return (
      <ChainWebContext.Provider value={value}>
        { children }
      </ChainWebContext.Provider>
    )

}

export default ChainWebProvider
