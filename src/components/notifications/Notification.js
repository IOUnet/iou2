import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import NotificationContext from '../../context/notification/NotificationContext'
import { Button, CloseIconButton } from '../common/Buttons'

export default function Notification({
  id,
  children = '',
  timer = 6, // null | number (sec)
  type = 'error',
  isClosable = true,
  buttonText = 'OK',
  cb,
}) {
  const { destroyNote } = useContext(NotificationContext)

  useEffect(() => {
    if (!timer) { return }

    const timeout = setTimeout(() => destroyNote(id), timer * 1000)

    return () => clearTimeout(timeout)
  }, [timer, destroyNote, id])

  const handleAction = () => {
    if (typeof cb === 'function') { cb() }
    destroyNote(id)
  }

  return (
    <Container type={type}>
      <Content>
        <ModalBody>{ children }</ModalBody>
        {
          typeof cb === 'function' &&
          <Action onClick={handleAction}>{ buttonText }</Action>
        }
      </Content>

      { isClosable && <CloseIcon onClick={() => destroyNote(id)} /> }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${props => props.theme.spacing(0.75)};
  background: ${props => props.theme.palette.background.main};
  border-radius: ${props => props.theme.shape.borderRadius()};
  border-right: 5px solid ${props => props.theme.palette.color[props.type]};
  box-shadow: ${props => props.theme.shadows[4]};
  animation: fadeIn 0.3s;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${props => props.theme.spacing(0, 1)};
`
const ModalBody = styled.div`
  line-height: 1.6;
`
const Action = styled(Button)`
  margin-top: ${props => props.theme.spacing(1)};
`
const CloseIcon = styled(CloseIconButton)`
  flex-shrink: 0;
`
