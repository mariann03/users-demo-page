import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

const SessionManager = React.createContext({})

function Provider({ ...props }) {
  const router = useRouter()
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    setAuthToken(localStorage.authToken)
  }, [])

  const saveToken = useCallback((token, redirect = true, url = '/') => {
    if (token === null) return

    localStorage.setItem('authToken', token)
    setAuthToken(token)

    if (!redirect) return
    router.push(url)
  }, [])

  const removeToken = useCallback((redirect = true, url = '/signin') => {
    localStorage.removeItem('authToken')
    setAuthToken('')

    if (!redirect) return
    router.push(url)
  }, [])

  const isLogged = useMemo(() => !!authToken, [authToken])

  return <SessionManager.Provider {...props} value={{ authToken, saveToken, removeToken, isLogged }} />
}

export function useContext() {
  return React.useContext(SessionManager)
}

export default { Provider }
