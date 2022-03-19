import { createContext } from 'react'

const NotificationContext = createContext({
  createNote: () => {},
  destroyNote: () => {},
})

export default NotificationContext
