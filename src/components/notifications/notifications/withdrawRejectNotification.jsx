import React from 'react'
import * as t from '../../../assets/translations.json'

const WithdrawRejectNotification = () => {
  return (
    <>
      Sorry, your transaction has not passed.<br/>
      Please, make sure that you have sufficient funds on your wallet to pay for the transaction fees and then try again.
    </>
  )
}

export const getWithdrawRejectModal = () => ({
  title: t.transactionNotification,
  children: <WithdrawRejectNotification />,
  buttonText: t.close,
  type: 'error',
})
