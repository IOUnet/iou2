import React, { useContext } from 'react'
import styled from 'styled-components'
import ChainWebContext from '../../../context/chain/ChainWebContext'
import * as t from '../../../assets/translations.json'

const TransactionSuccessNotification = () => {
  const { token } = useContext(ChainWebContext)
  const symbol = token?.symbol || ''

  return (
    <>
      Congrats! Your Transaction has passed.<br/>
      You are now the <Marked>{ symbol }</Marked> Hodler! You will be able to withdraw your <Marked>{ symbol }</Marked> after the Vesting Period ends.
    </>
  )
}

const Marked = styled.span`
  color: ${props => props.theme.palette.text.corporate};
`

export const getTransactionSuccessModal = () => ({
  title: t.transactionNotification,
  children: <TransactionSuccessNotification />,
  buttonText: t.close,
  type: 'success',
})
