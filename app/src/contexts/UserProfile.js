import React, { useState, useEffect, useCallback } from 'react'
import { useContext as useSessionManagerContext } from './SessionManager'
import useGet from '../hooks/useGet'

const UserProfile = React.createContext({})

export function useContext() {
  return React.useContext(UserProfile)
}

function Provider({ ...props }) {
  const { response, loading, error, clear } = useGet('/api/user/profile')
  const [state, setState] = useState({ data: response, loading, error })
  const { isLogged } = useSessionManagerContext()

  const updateData = useCallback(data => {
    setState({ data, loading: false, error: null })
  }, [])

  useEffect(() => {
    if (response?.data && !isLogged) clear()
  }, [isLogged])

  useEffect(() => {
    setState({ data: response?.data, loading, error })
  }, [response, loading, error])

  return <UserProfile.Provider {...props} value={{ ...state, updateData }} />
}

export default { Provider }
