import React from 'react'
import * as t from '../../../assets/translations.json'

const TransactionRejectNotification = () => {
  return (
    <>
      Sorry, your Transaction didn't pass!<br/>
      Please, verify that you have enough tokens on your wallet to pay for the transactions fees and then try again.
    </>
  )
}

export const getTransactionRejectModal = () => ({
  title: t.transactionNotification,
  children: <TransactionRejectNotification />,
  buttonText: t.close,
  type: 'error',
})
