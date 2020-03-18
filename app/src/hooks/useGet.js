import Axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useContext } from '../contexts/SessionManager'

export default function useGet(defaultUrl, needAuth = true, autoFetch = true, defaultConfig = { headers: {} }) {
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState(null)
  const { isLogged, authToken, removeToken } = useContext()

  const get = useCallback(
    async (url = defaultUrl, config = defaultConfig) => {
      let res
      try {
        setLoading(true)
        res = await Axios.get(url, {
          ...config,
          headers: {
            authorization: authToken,
            ...config.headers
          }
        })
        setResponse(res)
      } catch ({ response }) {
        setError(response)
        res = response
        if (res.status === 401) {
          removeToken()
        }
      }
      setLoading(false)
      return res
    },
    [defaultUrl, defaultConfig, authToken]
  )

  const clear = useCallback(() => {
    setResponse({})
    setLoading(false)
    setError(null)
  }, [])

  useEffect(() => {
    if (!autoFetch || (needAuth && !isLogged)) return
    get()
  }, [isLogged, needAuth])

  return { get, response, loading, error, clear }
}
