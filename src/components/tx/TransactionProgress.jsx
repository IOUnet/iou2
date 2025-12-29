import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import * as t from '../../assets/translations.json'

const statusMessages = {
  idle: '',
  waiting_wallet: t['tx.waitingWallet'] || 'Confirm in your wallet',
  submitted: t['tx.submitted'] || 'Transaction submitted, waiting for confirmation',
  confirmed: t['tx.confirmed'] || 'Transaction confirmed',
  failed: t['tx.failed'] || 'Transaction failed'
}

const explorerByChain = (chainLabel = '') => {
  const key = chainLabel.toLowerCase()
  if (key.includes('polygon') || key.includes('matic')) return 'https://polygonscan.com/tx/'
  if (key.includes('ethereum') || key.includes('eth')) return 'https://etherscan.io/tx/'
  return undefined
}

export default function TransactionProgress({ status, txHash, chainLabel, errorMessage }) {
  const explorer = explorerByChain(chainLabel)
  const message = statusMessages[status] || statusMessages.idle

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius(),
        backgroundColor: theme.palette.background.main,
        boxShadow: theme.shadows[1],
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.5)
      })}
    >
      {message && (
        <Typography variant="body1" fontWeight={600}>
          {message}
        </Typography>
      )}

      {status === 'failed' && errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}

      {txHash && explorer && (
        <Link href={`${explorer}${txHash}`} target="_blank" rel="noopener noreferrer">
          {t.viewInExplorer || 'View in explorer'}
        </Link>
      )}

      {chainLabel && (
        <Typography color="text.secondary" variant="body2">
          {chainLabel}
        </Typography>
      )}
    </Box>
  )
}
