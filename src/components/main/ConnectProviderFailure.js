import React, { useContext } from 'react'
import styled from 'styled-components'
import ChainWebContext from '../../context/chain/ChainWebContext'
import { NotificationContainer } from './Containers'
import { Button } from '../button/Buttons'
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
          Failed to connect to blockchain provider<br/>
          To use our dapp, you need to install<br/>
          a <Anchor target="_blank" rel="noreferrer" href="https://metamask.io/download.html">MetaMask wallet</Anchor>!<br/>
          After installation, reload the page.
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
  padding: ${props => props.theme.spacing(1, 1)};
  text-align: left;
  font-weight: 700;
  font-size: 1.25em;
  line-height: 1.25;
  color: ${props => props.theme.palette.color[props.type]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Body = styled.div`
  padding: ${props => props.theme.spacing(3, 2)};
  text-align: center;
  line-height: 1.6;
`
const Anchor = styled.a`
  margin: 0 0.3em;
  color: ${props => props.theme.palette.text.corporate};
`
const Actions = styled.div`
  padding: ${props => props.theme.spacing(3, 2, 2)};
  display: flex;
  justify-content: center;
`
