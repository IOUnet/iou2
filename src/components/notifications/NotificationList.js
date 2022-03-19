import React from 'react'
import styled from 'styled-components'
import Notification from './Notification'

export default function NotificationList({ notes = [] }) {
  if (!notes.length) {
    return null
  }

  return (
    <NotesList>
      { notes.map(note => <Notification key={note.id} {...note} />) }
    </NotesList>
  )
}

const NotesList = styled.div`
  position: fixed;
  right: ${props => props.theme.spacing(1)};
  bottom: 80px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 10;

  div + div {
    margin-top: ${props => props.theme.spacing(1)};
  }
`
