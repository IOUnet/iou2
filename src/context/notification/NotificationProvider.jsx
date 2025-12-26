import React, { useState, useCallback } from 'react'
import NotificationContext from './NotificationContext'
import NotificationList from '../../components/notifications/NotificationList'
import * as h from '../../helpers'

const NotificationProvider = ({ children }) => {
  const [notes, setNotes] = useState([])

  const createNote = useCallback((config) => {
    const id = h.makeId()
    setNotes(s => ([{ ...config, id }, ...s]))
  }, [])

  const destroyNote = useCallback((id) => {
    setNotes(s => {
      const index = s.findIndex(note => note.id === id)
      return index === -1
        ? s
        : [...s.slice(0, index), ...s.slice(index + 1)]
    })
  }, [])

  const value = {
    createNote,
    destroyNote,
  }

  return (
    <NotificationContext.Provider value={value}>
      { children }
      { notes.length ? <NotificationList notes={notes} /> : null }
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
