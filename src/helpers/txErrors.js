const hasCode = (err, codes = []) => codes.some((c) => `${err?.code}` === `${c}` || `${err?.cause?.code}` === `${c}`)

const includesMessage = (err, markers = []) => {
  const msg = `${err?.shortMessage || err?.message || ''}`.toUpperCase()
  return markers.some((marker) => msg.includes(marker))
}

export const mapTxError = (err = {}) => {
  if (hasCode(err, [4001]) || includesMessage(err, ['ACTION_REJECTED']) || hasCode(err, ['ACTION_REJECTED'])) {
    return { code: err.code || 'ACTION_REJECTED', messageKey: 'tx.error.userRejected' }
  }

  if (hasCode(err, ['INSUFFICIENT_FUNDS']) || includesMessage(err, ['INSUFFICIENT_FUNDS'])) {
    return { code: err.code || 'INSUFFICIENT_FUNDS', messageKey: 'tx.error.insufficientFunds' }
  }

  if (hasCode(err, ['CHAIN_MISMATCH']) || includesMessage(err, ['CHAIN_MISMATCH', 'WRONG NETWORK'])) {
    return { code: err.code || 'CHAIN_MISMATCH', messageKey: 'tx.error.wrongNetwork' }
  }

  return { code: err.code || 'UNKNOWN', messageKey: 'tx.error.generic' }
}

export default mapTxError
