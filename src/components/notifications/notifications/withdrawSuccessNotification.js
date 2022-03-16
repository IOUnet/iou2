import React, { useContext } from 'react'
import styled from 'styled-components'
import ChainWebContext from '../../../context/chain/ChainWebContext'
import * as t from '../../../assets/translations.json'

const WithdrawSuccessNotification = () => {
  const { token } = useContext(ChainWebContext)
  const symbol = token?.symbol || ''

  return (
    <>
      Congratulations! Your tokens withdraw has been successfully completed.<br/>
      Now you have <Marked>{ symbol }</Marked> on your wallet and you can use it to stake and increase your profits.
    </>
  )
}

const Marked = styled.span`
  color: ${props => props.theme.palette.text.corporate};
`

export const getWithdrawSuccessModal = () => ({
  title: t.transactionNotification,
  children: <WithdrawSuccessNotification />,
  buttonText: t.close,
  type: 'success',
})
