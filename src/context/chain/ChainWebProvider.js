import React, { useState, useEffect, useCallback, useContext } from 'react'
import ChainWebContext from './ChainWebContext'
import NotificationContext from '../notification/NotificationContext'
import * as a from '../../api/chain'
import * as t from '../../assets/translations.json'
import { useCookies } from 'react-cookie';

// const dappChains = require("../../assets/dappChains.json")

const ChainWebProvider = ({ children }) => {
const [hasInitialization, setHasInitialization] = useState(false)
const [provider, setProvider] = useState(null)
const [isRequest, setIsRequest] = useState(false)
const [isWalletRequest, setIsWalletRequest] = useState(false)
const [chainId, setChainId] = useState('')
const [isChainConnected, setIsChainConnected] = useState(false)
const [account, setAccount] = useState('')
const [stable, setStable] = useState(null)
const [token, setToken] = useState(null)
const [contract, setContract] = useState(null)
const [user, setUser] = useState(null)
const [statistics, setStatistics] = useState(null)
const [block, setBlock] = useState(null)
const [cookies, setCookie] = useCookies(['currChainId']);

const { createNote } = useContext(NotificationContext)

const handleAccountsChanged = useCallback((accounts) => {
    // console.log('---accountsChanged---') // --------------------------------------------------------------------------------------
    const account = accounts.length ? accounts[0] : ''
    setAccount(account)
  }, [setAccount])

useEffect(() => {
    if (!provider || !isChainConnected ) { return "dApp initializing..... waiting provider, isChainConnected " }

    if (!account) {
      setUser(null)
      return "dApp initializing..... waiting account "
    }

/*     const getBalance = async () => {
      const CSContract = contract?.contract
      const tokenContract = token?.contract
      const stableContract = stable?.contract

      setIsRequest(true)
      try {
        const user = await a.getUserBalance(provider.web3, CSContract, tokenContract, stableContract, account)
        user.remainingAllocation = contract.maxAmountSVETs - user.contributions * contract.rate
        setUser(user)
      } catch (error) {
        createNote({ children: t.getUserBalanceError })
      } finally {
        setIsRequest(false)
      }
    }

    getBalance() */
  }, [account, contract, token, stable, provider, isChainConnected, createNote])

const resetChainData = useCallback(() => {
/*     setStable(null)
    setToken(null)
    setChainToken(null)
    setContract(null)
    setUser(null)
    setStatistics(null)
    setBlock(null) */
  }, [])

  const reloadChainData = useCallback(async () => {
    setIsRequest(true)
    try {
/*       const { web3 } = provider
      const data = await a.loadFullData(web3)
      data.statistics.remainingSupply = data.statistics.totalSupply - data.statistics.raised * data.contract.rate

      setContract(data.contract)
      setStable(data.stable)
      setToken(data.token)
      setChainToken(data.chainToken)
      setStatistics(data.statistics)
      setBlock(data.block) */
    } catch (error) {
      createNote({ children: t.reloadChainDataError })
      resetChainData()
    } finally {
      setIsRequest(false)
    }
  }, [provider, resetChainData, createNote])

  const updateCurrentChainData = useCallback(async () => {
    // console.log('--- update chain data ---') // -------------------------------------------------------------------------------------------
    setIsRequest(true)

    const tokenContract = token?.contract
    const stableContract = stable?.contract
    const contractContract = contract?.contract

    try {
/*       const {
        user,
        statistics,
        block,
      } = await a.loadCurrentData(provider.web3, contractContract, tokenContract, stableContract, account)

      user.remainingAllocation = contract.maxAmountSVETs - user.contributions * contract.rate
      statistics.remainingSupply = statistics.totalSupply - statistics.raised * contract.rate
      setUser(user)
      setStatistics(statistics)
      setBlock(block) */
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsRequest(false)
    }
  }, [provider, contract, token, stable, account])

  useEffect(() => {
    let timer

    const update = async (delay) => {
      timer = setTimeout(async () => {
        try {
          update(a.CHAIN_UPDATE_DATE_DELAY)
          await updateCurrentChainData()
        } catch (error) {
          createNote({ children: t.updateCurrentChainDataError })
        }
      }, delay)
    }

    if (isChainConnected && contract && token && stable && account) {
      update(a.CHAIN_UPDATE_DATE_DELAY)
    }

    return () => clearTimeout(timer)
  }, [updateCurrentChainData, isChainConnected, chainId, account, contract, token, stable, createNote])

  const handleChainChanged = useCallback(async () => {
    // console.log('---chainChanged---') //
    const { ethereum, web3 } = await a.detectEthereumProvider()

    const chainId = await a.pollCurrentChainId(ethereum)

    setChainId(chainId)
    setCookie('currChainId', chainId, { path: '/' });
    await switchChain(chainId)
    setIsChainConnected(chainId === a.DAPP_CHAIN_ID)
    //window.location.reload();
  }, [])

  useEffect(() => {
    if (chainId === a.DAPP_CHAIN_ID) {
      reloadChainData(chainId)
    } else {
      resetChainData()
    }
  }, [chainId, reloadChainData, resetChainData])

  const handleConnect = useCallback((connectInfo) => {
    // console.log('---connect---', connectInfo)
  }, [])

  const handleDisconnect = useCallback((ProviderRpcError) => {
    // console.log('---disconnect---', ProviderRpcError.error)
  }, [])

  const handleMessage = useCallback((message) => {
    // console.log('---message---', message)
  }, [])

  const subscribe = useCallback((chainWeb) => {
    chainWeb.on('connect', handleConnect)
    chainWeb.on('disconnect', handleDisconnect)
    chainWeb.on('message', handleMessage)
    chainWeb.on('chainChanged', handleChainChanged)
    chainWeb.on('accountsChanged', handleAccountsChanged)
  }, [handleAccountsChanged, handleChainChanged, handleConnect, handleDisconnect, handleMessage])

  const unsubscribe = useCallback((chainWeb) => {
    chainWeb.removeListener('connect', handleConnect)
    chainWeb.removeListener('disconnect', handleDisconnect)
    chainWeb.removeListener('message', handleMessage)
    chainWeb.removeListener('chainChanged', handleChainChanged)
    chainWeb.removeListener('accountsChanged', handleAccountsChanged)
  }, [handleAccountsChanged, handleChainChanged, handleConnect, handleDisconnect, handleMessage])

  useEffect(() => {
    if (!provider) { return "dApp initializing..... waiting provider " }
    const { ethereum } = provider
    subscribe(ethereum)
    return () => { unsubscribe(ethereum) }
  }, [subscribe, unsubscribe, provider])

  const requestCurrentChainId = useCallback(async () => {
    setIsWalletRequest(true)
    try {
      setChainId(await a.pollCurrentChainId(provider.ethereum))
      handleChainChanged()
    } catch (error) {
      createNote({ children: t.requestCurrentChainIdError })
    } finally {
      setIsWalletRequest(false)
    }
  }, [setIsWalletRequest, handleChainChanged, provider, createNote])

  useEffect(() => {
    if (!provider || !hasInitialization) { return "dApp initializing..... waiting provider, hasInitialization " }
    requestCurrentChainId()
  }, [requestCurrentChainId, provider, hasInitialization])

  const initialization = useCallback(async () => {
    const { ethereum, web3 } = await a.detectEthereumProvider()
    setProvider((ethereum && web3) ? { ethereum, web3 } : null)
    var currchainID = cookies.currChainId;
/*     const dappChains = require("../../assets/dappChains.json")

    if (currchainID === "" || !dappChains.hasOwnProperty(currchainID)) {
      currchainID = Object.values(dappChains)[0].chainId;
      setCookie('currChainId',currchainID.toLowerCase(), { path: '/' });
      
    } */
    await switchChain(currchainID);
    setHasInitialization(true)
    setChainId(currchainID)
    createNote({ children: 'Initialization was successful', type: 'success' }) // example ------------------------------------------
  }, [createNote])

  const resetProvider = () => {
    setProvider(null)
    setHasInitialization(false)
  }

  const connectWallet = async () => {
    setIsWalletRequest(true)
    try {
      const accounts = await a.pollWalletConnect(provider.ethereum)
      handleAccountsChanged(accounts)
    } catch (error) {
      createNote({ children: t.connectWalletError })
    } finally {
      setIsWalletRequest(false)
    }
  }

  const requestPermissions = async () => {
    setIsWalletRequest(true)
    try {
      await a.pollWalletPermissions(provider.ethereum)
    } catch (error) {
      createNote({ children: t.requestPermissionsError })
    } finally {
      setIsWalletRequest(false)
    }
  }

  const switchChain = async (_chainConfig) => {
    setIsWalletRequest(true)
    var chainConfig
    try {
      const { ethereum, web3 } = await a.detectEthereumProvider()
      const currChain = await web3.eth.net.getId();     
      const dappChains = require("../../assets/dappChains.json")

      if (!dappChains.hasOwnProperty(_chainConfig)) {
         chainConfig = Object.values(dappChains)[0].chainId.toLowerCase();
       } else {
         chainConfig = _chainConfig;
       } 

      if (currChain !== web3.utils.hexToNumber(chainConfig)) {

        const  chainswitchmessage = "For starting of dApp let us to switch to "+dappChains[chainConfig].chainName +" chain. Press OK for switching:";

        if (window.confirm(chainswitchmessage) ) {
          await a.switchChain(ethereum, chainConfig)
        } else {
          alert ("Can't continue on this blockchain, sorry :(. We'll  reload page now and you can enable switching to nessesary blockchain")

        }
      }
    } catch (error) {
      createNote({ children: t.switchChainError })
    } finally {
      setIsWalletRequest(false)
    }
  }

  const addAssetToMetamask = async () => {
    if (!token) { return "waiting token " }

    setIsWalletRequest(true)

    try {
      const { address, symbol, decimals } = token
      await a.addTokenToWallet(provider.ethereum, { address, symbol, decimals })
    } catch (error) {
      createNote({ children: t.addAssetToMetamaskError })
    } finally {
      setIsWalletRequest(false)
    }
  }

  const buyTokens = async (stableAmount) => {
    setIsWalletRequest(true)
    try {
      const { address: CSAddress, contract: CSContract } = contract
      const { contract: stableContract } = stable
      const amount = provider.web3.utils.toWei(String(stableAmount), 'ether')

      await stableContract.methods.approve(CSAddress, amount).send({ from: account })
      await CSContract.methods.buyTokensDAI(account, amount).send({ from: account })
      await updateCurrentChainData()
      return 'success'
    } catch (error) {
      if (error.code === 4001) { // user rejected
        return null
      } else {
        return 'reject'
      }
    } finally {
      setIsWalletRequest(false)
    }
  }

  const withdrawTokens = async () => {
    setIsWalletRequest(true)
    try {
      const { contract: CSContract } = contract
      await CSContract.methods.withdrawTokens(account).send({ from: account })
      await updateCurrentChainData()
      return 'success'
    } catch (error) {
      if (error.code === 4001) { // user rejected
        return null
      } else {
        return 'reject'
      }
    } finally {
      setIsWalletRequest(false)
    }
  }

  const getTransactionCost = async () => {
    setIsRequest(true)
    try {
      const gasPriceInWei = await provider.web3.eth.getGasPrice()
      const gasPrice = provider.web3.utils.fromWei(String(gasPriceInWei), 'ether')
      const estimateGasApprove = 66300
      const estimateGasBuy = 347000
      return (estimateGasApprove + estimateGasBuy) * gasPrice
    } catch (error) {
      return 0
    } finally {
      setIsRequest(false)
    }
  }

  const getWithdrawTransactionCost = useCallback(async () => {
    setIsRequest(true)
    try {
      const { web3 } = provider
      const gasPriceInWei = await web3.eth.getGasPrice()
      const gasPrice = web3.utils.fromWei(String(gasPriceInWei), 'ether')
      const estimateGasWithdraw = 150000
      return (estimateGasWithdraw * gasPrice)
    } catch (error) {
      return 0
    } finally {
      setIsRequest(false)
    }
  }, [provider])

  const value = {
    hasInitialization,

    provider,
    initialization,
    resetProvider,

    isRequest,
    isWalletRequest,
    setIsWalletRequest,

    chainId,
    isChainConnected,
    switchChain,

    account,
    connectWallet,
    requestPermissions,
    addAssetToMetamask,

    stable,
    token,
    //chainToken,
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
