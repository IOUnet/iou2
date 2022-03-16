import * as t from '../assets/translations.json'
import dappChains from '../assets/dappChains.json'
import chains from '../assets/chains.json'

export const idToHex = (id) => {
  const hex = Number(id).toString(16)
  return `0x${hex}`
}

export const idToDecimal = (id) => {
  const decimal = id.replace('0x', '')
  return Number.parseInt(decimal, 16)
}

export const getChain = (id) => (
  chains.find(({ chainId }) => chainId === idToDecimal(id))
)

export const getChainName = (id) => (
  dappChains.find(({ chainId }) => chainId === id)?.chainName
)

export const getChainToken = (id) => {
  const chain = dappChains.find(({ chainId }) => chainId === id)
  return {
    symbol: chain?.nativeCurrency?.symbol,
    decimals: chain?.nativeCurrency?.decimals,
  }
}

export const matchChainId = (id) => dappChains.find(({ chainId }) => chainId === id)

export const formatAddress = (a) => {
  return [a.substring(0, 2), `${a.substring(2, 6)} ... ${a.substring(a.length - 4)}`]
}

export const walletText = (accountAddress) => {
  return (accountAddress === '')
    ? t.connectWallet
    : formatAddress(accountAddress)
}

export const hexToRGBa = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return (alpha)
    ? `rgba(${r},${g},${b},${alpha})`
    : `rgb(${r},${g},${b})`
}

export const setLongTimeout = (cb, timeout) => {
  let timer
  const msInDay = 60 * 60 * 24 * 1000

  if (timeout > msInDay) {
    timer = setTimeout(() => setLongTimeout(timeout - msInDay), msInDay)
  } else {
    timer = setTimeout(() => cb(), timeout + 1)
  }

  return timer
}

export const getDate = (timestamp) => {
  if (!timestamp) {
    return '.../.../...'
  }

  return new Date(timestamp).toLocaleDateString()
}

export const makeId = () => {
  const rand = Math.round(Math.random() * 10 ** 9)
  const timeStamp = new Date().getTime()
  return `${timeStamp}-${rand}`
}

export { toPrecision } from './toPrecision'
export { getDateComponents } from './getDateComponents'
