import Axios from 'axios'
import { useState, useCallback } from 'react'
import { useContext } from '../contexts/SessionManager'

export default function usePost(defaultUrl, defaultData, defaultConfig = { headers: {} }) {
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { authToken, removeToken } = useContext()

  const post = useCallback(
    async (url = defaultUrl, data = defaultData, config = defaultConfig) => {
      let res
      try {
        setLoading(true)
        res = await Axios.post(url, data, {
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
    [authToken, defaultUrl, defaultData, defaultConfig]
  )

  return { post, response, loading, error }
}
