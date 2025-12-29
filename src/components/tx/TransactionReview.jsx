import React from 'react'
import { Box, Typography } from '@mui/material'
import Button from '../button/Button'

const containerSx = (theme) => ({
  width: '100%',
  maxWidth: 480,
  margin: '0 auto',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius(),
  backgroundColor: theme.palette.background.main,
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
})

const listItemSx = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  fontSize: '1rem'
})

export default function TransactionReview({
  title,
  summaryItems = [],
  chainLabel,
  feeHint,
  onConfirm,
  onCancel
}) {
  return (
    <Box sx={containerSx}>
      <Typography variant="h6">{title}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {summaryItems.map(({ label, value }) => (
          <Box key={label} sx={listItemSx}>
            <Typography color="text.secondary">{label}</Typography>
            <Typography fontWeight={600}>{value}</Typography>
          </Box>
        ))}
      </Box>

      <Typography color="text.secondary" variant="body2">
        {chainLabel}
      </Typography>

      {feeHint && (
        <Typography color="text.secondary" variant="body2">
          {feeHint}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  )
}
