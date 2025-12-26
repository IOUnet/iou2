import React from 'react'
import styled from 'styled-components'
import * as t from '../../../assets/translations.json'

const UniswapModal = ({ address }) => {
  return (
    <IFrame
      src={`https://app.uniswap.org/#/swap?outputCurrency=${address}`}
      height="600px"
      width="100%"
      id="Uniswap"
      title="Uniswap"
    />
  )
}

const IFrame = styled.iframe`
  border: 0;
  margin: 0 auto;
  display: block;
  border-radius: ${props => props.theme.shape.borderRadius()};
  max-width: 600px;
  min-width: 350px;
`

export const getUniswapModal = (address, action = () => {}) => ({
  children: <UniswapModal address={address} />,
  buttonText: t.close,
  type: 'iframe',
  cb: (chainId) => action(chainId),
})
