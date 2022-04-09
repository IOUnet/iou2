import Web3 from 'web3'
import tokenImg from '../assets/images/SVET.png'
import stableImg from '../assets/images/posDai.png'
import chainMainTokenImg from '../assets/images/polygonMatic.png'
import * as h from '../helpers/index'
//import contracts from './contracts.json'


export const UNISWAP_CHAIN_ID = '0x1'

export const DAPP_CHAIN_ID = '0x539'
export const CHAIN_UPDATE_DATE_DELAY = 12000 // ms

const chains = require("../assets/dappChains.json")

function detectEthereumProvider({
  mustBeMetaMask = true,
  silent = false,
  timeout = 3000,
} = {}) {
  let handled = false

  return new Promise((resolve) => {
    if (window.ethereum) {
      handleEthereum()
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, { once: true })
      setTimeout(() => {
        handleEthereum()
      }, timeout)
    }

    function handleEthereum() {
      if (handled) { return }
      handled = true

      window.removeEventListener('ethereum#initialized', handleEthereum)

      const { ethereum } = window

      if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
        resolve({ ethereum, web3: new Web3(ethereum) })
      } else {
        const message = mustBeMetaMask && ethereum
          ? 'Non-MetaMask window.ethereum detected.'
          : 'Unable to detect window.ethereum.'

        !silent && console.error('@metamask/detect-provider:', message)

        resolve({ ethereum: null, web3: null })
      }
    }
  })
}

const pollCurrentChainId = async (ethereum) => {
  try {
    return (await ethereum.request({
      method: 'eth_chainId',
      params: [],
    }))
  } catch (error) { // todo: maybe there are exceptions?
    throw new Error(error)
  }
}

const switchChain = async (ethereum, chain) => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain }],
    })
    return
  } catch (switchError) {
    if (switchError.code === 4001) { // user rejected
      throw new Error(switchError) 
    }
    else if (switchError.code === 4902) { // the chain has not been added to MetaMask
      //throw new Error(switchError)
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chains[chain]],
        })
      } catch (addError) {
        if (addError.code === 4001) { // user rejected
          throw new Error(addError)

        } else {
          throw new Error(addError)
        }
      }
    }
  }
}

const pollWalletConnect = async (ethereum) => {
  try {
    return (await ethereum.request({
      method: 'eth_requestAccounts',
    }))
  } catch (error) {
    if (error.code === 4001) { // user rejected
      return []
    } else {
      throw new Error(error)
    }
  }
}

const pollWalletPermissions = async (ethereum) => {
  try {
    return (await ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }]
    }))
  } catch (error) {
    if (error.code === 4001) { // user rejected
      return []
    } else {
      throw new Error(error)
    }
  }
}

// asset = {
//   address: string; // The address of the token contract
//   symbol: string; // A ticker symbol or shorthand, up to 5 characters
//   decimals: number; // The number of token decimals
//   image?: string; // A string url of the token logo
// }
const addTokenToWallet = async (ethereum, asset) => {
  try {
    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: asset,
      },
    })
  } catch (error) {
    if (error.code === 4001) { // user rejected
      return
    } else {
      throw new Error(error)
    }
  }
}

const getChainBalance = async (web3, address) => {
  return (await web3.eth.getBalance(address))
}

const getERC20ContractBalance = async (contract, address) => {
  return (await contract.methods.balanceOf(address).call())
}

const getBlockData = async (web3) => {
  return (await web3.eth.getBlock('latest'))
}

export {
  detectEthereumProvider,
  pollWalletConnect,
  pollWalletPermissions,
  pollCurrentChainId,
  switchChain,
  addTokenToWallet,
  getChainBalance,
  getBlockData,
}
