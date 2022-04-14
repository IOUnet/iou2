import React, { useContext } from 'react'
import styled from 'styled-components'
import ChainWebContext from '../../context/chain/ChainWebContext'
import { NotificationContainer } from './Containers'
import  Button  from '../button/Button'
import * as t from '../../assets/translations.json' 

export default function ConnectProviderFailure({ type = 'error' }) {
  const { resetProvider, isRequest } = useContext(ChainWebContext)

  return (isRequest
    ? null
    : (<NotificationContainer type={type}>
        <Title type={type}>
          { t.connectProviderNotification }
        </Title>

        <Body>
          <h1> Welcome to IOUVerse</h1> <p>
          Unfortunately, dApp failed to connect to blockchain provider  in your browser<br/>
      
          To use our dapp, you need to install<br/>
          a <Anchor target="_blank" rel="noreferrer" href="https://metamask.io/download.html">MetaMask wallet</Anchor>!<br/>
          After installation, reload the page.
          </p>
          <p>
            Also, you can read in Google Docs how to configure your wallet manually <Anchor target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/e/2PACX-1vQcv_ZTJD6-54AMjLLCXQv1LtMSOtLdBzhGXo0aAIDkGljgivZABIMQbJyIOF0c6r1W9w8cNY4ATUoE/pub#h.657r6xhsbgq"> HOWTO Choosing a Blockchain </Anchor>
          </p>
        </Body>

        <Actions>
          <Button onClick={resetProvider}>
            { t.reloadPage }
          </Button>
        </Actions>
      </NotificationContainer>)
  )
}

const Title = styled.h3`
  text-align: left;
  font-weight: 700;
  font-size: 1.25em;
  line-height: 1.25;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Body = styled.div`
  text-align: center;
  line-height: 1.6;
`
const Anchor = styled.a`
  margin: 0 0.3em;
`
const Actions = styled.div`
  display: flex;
  justify-content: center;
`
