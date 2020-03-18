import React, { useState, useEffect } from 'react'
import { useContext as useSessionManagerContext } from './SessionManager'
import useGet from '../hooks/useGet'

const User = React.createContext({})

export function useContext() {
  return React.useContext(User)
}

function Provider({ ...props }) {
  const { response, loading, error, get, clear } = useGet('/api/user')
  const [state, setState] = useState({ data: response, loading, error })
  const { isLogged } = useSessionManagerContext()

  useEffect(() => {
    if (response?.data && !isLogged) clear()
  }, [isLogged])

  useEffect(() => {
    if (!response?.data && !loading && isLogged) get()
  }, [isLogged])

  useEffect(() => {
    setState({ data: response?.data, loading, error })
  }, [response, loading, error])

  return <User.Provider {...props} value={state} />
}

export default { Provider }
