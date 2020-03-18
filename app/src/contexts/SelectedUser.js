import React, { useState } from 'react'

const SelectedUser = React.createContext({})

export function useContext() {
  return React.useContext(SelectedUser)
}

function Provider({ ...props }) {
  const [selectedUser, setSelectedUser] = useState(null)

  return <SelectedUser.Provider {...props} value={{ selectedUser, setSelectedUser }} />
}

export default { Provider }
