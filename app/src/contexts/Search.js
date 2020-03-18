import React, { useEffect } from 'react'
import { useContext as useUserContext } from './User'
import useGet from '../hooks/useGet'
import useDebounce from '../hooks/useDebounce'
import useForm from '../hooks/useForm'
import { useRouter } from 'next/router'

const Search = React.createContext({})

export function useContext() {
  return React.useContext(Search)
}

let prevQuery = ''
function Provider({ ...props }) {
  const { data } = useUserContext()
  const { pathname } = useRouter()
  const { response: filters } = useGet('/api/filters')
  const { response, loading, error, get } = useGet('/api/users', true, false)
  const [filterName, filter, search] = useForm(3)
  const debouncedSearch = useDebounce(search.value, 500)

  useEffect(() => {
    if (data?.role !== 'admin' || pathname !== '/') return
    const query = `/api/users?${filterName.value}=${filter.value}&q=${debouncedSearch}`
    if (query === prevQuery) return
    prevQuery = query
    get(`/api/users?${filterName.value}=${filter.value}&q=${debouncedSearch}`)
  }, [data, filterName, filter, pathname, debouncedSearch])

  useEffect(() => {
    filter.onChange({ target: { value: '' } })
  }, [filterName.value])

  return (
    <Search.Provider
      {...props}
      value={{
        result: { data: response?.data, loading, error },
        handlers: { filterName, filter, search },
        filters: { ...filters?.data }
      }}
    />
  )
}

export default { Provider }
