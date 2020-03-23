import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'

import useForm from '../../../hooks/useForm'
import useDebounce from '../../../hooks/useDebounce'

import { useStateContext } from '../../../context/State'
import { searchUsers } from '../../../context/actions'

let prevQuery
export default function useSearch() {
  const [filters, setFilters] = useState(null)
  const [filterName, filter, searchInput] = useForm(3)
  const debouncedSearch = useDebounce(searchInput.value, 500)
  const router = useRouter()

  const {
    state: { user, authToken, search },
    dispatch
  } = useStateContext()

  useEffect(() => {
    if (!router.query) return
    const { q = '', ...rest } = router.query
    const [filterNameValue = ''] = Object.keys(rest)
    filterName.onChange({ target: { value: filterNameValue } })
    process.nextTick(() => filter.onChange({ target: { value: filterName[filterNameValue] || '' } }))
    searchInput.onChange({ target: { value: q } })
  }, [])

  useEffect(() => {
    Axios.get('/api/filters', { headers: { authorization: authToken } }).then(setFilters)
  }, [])

  useEffect(() => {
    if (user.data?.role !== 'admin' || router.pathname !== '/') return
    const query = `/api/users?${filterName.value}=${filter.value}&q=${debouncedSearch}`
    if (query === prevQuery) return
    prevQuery = query
    searchUsers(dispatch, `${filterName.value}=${filter.value}&q=${debouncedSearch}`)
    router.push(
      `${router.pathname}?${filterName.value}=${filter.value}&q=${debouncedSearch}`,
      `${router.pathname}?${filterName.value}=${filter.value}&q=${debouncedSearch}`,
      { shallow: true }
    )
  }, [user.data, filterName, filter, router.pathname, debouncedSearch])

  useEffect(() => {
    filter.onChange({ target: { value: '' } })
  }, [filterName.value])

  return {
    result: search,
    handlers: { filterName, filter, search: searchInput },
    filters: { ...filters?.data }
  }
}
