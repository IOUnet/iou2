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

/* const getFullContractData = async (web3, abi, address) => {
  const contract = new web3.eth.Contract(abi, address)

  const [
    addressDAI,
    addressSVET,
    rate,
    openingTime,
    closingTime,
    vestingPeriod,
    minAmountSVETs,
    maxAmountSVETs,
  ] = await Promise.all([
    contract.methods.addressDAI().call(),
    contract.methods.token().call(),
    contract.methods.rate().call(),
    contract.methods.openingTime().call(),
    contract.methods.closingTime().call(),
    contract.methods.vestingPeriod().call(),
    contract.methods.minAmountSVETs().call(),
    contract.methods.maxAmountSVETs().call(),
  ])

  return {
    address,
    contract,
    addressDAI,
    addressSVET,
    rate,
    openingTime,
    closingTime,
    vestingPeriod,
    minAmountSVETs: web3.utils.fromWei(minAmountSVETs, 'ether'),
    maxAmountSVETs: web3.utils.fromWei(maxAmountSVETs, 'ether'),
  }
}

const getERC20ContractData = async (web3, abi, address) => {
  const contract = new web3.eth.Contract(abi, address)

  const [symbol, decimals] = await Promise.all([
    contract.methods.symbol().call(),
    contract.methods.decimals().call(),
  ])

  return { symbol, decimals, address, contract }
} */

/* const getUserBalance = async (web3, contract, tokenContract, stableContract, address) => {
  const [
    CSBalance,
    tokenBalance,
    stableBalance,
    chainTokenBalance,
    contributions,
  ] = await Promise.all([
    contract.methods.balanceOf(address).call(),
    getERC20ContractBalance(tokenContract, address),
    getERC20ContractBalance(stableContract, address),
    getChainBalance(web3, address),
    contract.methods.contributions(address).call(),
  ])

  return {
    CSBalance: web3.utils.fromWei(CSBalance, 'ether'),
    tokenBalance: web3.utils.fromWei(tokenBalance, 'ether'),
    stableBalance: web3.utils.fromWei(stableBalance, 'ether'),
    chainTokenBalance: web3.utils.fromWei(chainTokenBalance, 'ether'),
    contributions: web3.utils.fromWei(contributions, 'ether'),
    remainingAllocation: 0,
  }
}

const getStatistics = async (web3, tokenContract, CSContract) => {
  const totalSupply = await tokenContract.methods.totalSupply().call()
  const weiRaised = await CSContract.methods.weiRaised().call()
  return {
    totalSupply: web3.utils.fromWei(totalSupply, 'ether'),
    raised: web3.utils.fromWei(weiRaised, 'ether'),
    remainingSupply: 0,
  }
}
 */
const getBlockData = async (web3) => {
  return (await web3.eth.getBlock('latest'))
}

/* const loadFullData = async (web3) => {
  const contractAbi = contracts.SVETCrowdsale.abi
  const contractAddress = contracts.SVETCrowdsale.address
  const tokenAbi = contracts.SVETPoSToken.abi
  const stableAbi = contracts.StableToken.abi

  const contractData = await getFullContractData(web3, contractAbi, contractAddress)

  const [stableData, tokenData, block] = await Promise.all([
    getERC20ContractData(web3, stableAbi, contractData.addressDAI),
    getERC20ContractData(web3, tokenAbi, contractData.addressSVET),
    getBlockData(web3),
  ])
  const statistics = await getStatistics(web3, tokenData.contract, contractData.contract)

  return {
    contract: contractData,
    stable: { ...stableData, img: stableImg },
    token: { ...tokenData, img: tokenImg },
    chainToken: { ...(h.getChainToken(DAPP_CHAIN_ID)), img: chainMainTokenImg },
    statistics,
    block,
  }
}
 */
/* const loadCurrentData = async (web3, contract, tokenContract, stableContract, address) => {
  const [user, statistics, block] = await Promise.all([
    getUserBalance(web3, contract, tokenContract, stableContract, address),
    getStatistics(web3, tokenContract, contract),
    getBlockData(web3),
  ])

  return { user, statistics, block }
}
 */
export {
  detectEthereumProvider,
  pollWalletConnect,
  pollWalletPermissions,
  pollCurrentChainId,
  switchChain,
  addTokenToWallet,

  //loadFullData,
  getChainBalance,
  //getUserBalance,
  //loadCurrentData,
  getBlockData,
}
