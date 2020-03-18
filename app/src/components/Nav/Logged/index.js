import Button from '@material-ui/core/Button'

import PropTypes from 'prop-types'
import { useContext } from '../../../contexts/User'
import { useRouter } from 'next/router'
import SearchBar from './SearchBar'

export default function Logged({ className, removeToken }) {
  const { data, loading } = useContext()
  const { pathname } = useRouter()
  const showSearch = !loading && data?.role === 'admin' && pathname === '/'

  return (
    <>
      {showSearch && <SearchBar />}
      <Button color='primary' variant='outlined' className={className} onClick={removeToken}>
        log out
      </Button>
    </>
  )
}

Logged.propTypes = {
  className: PropTypes.string.isRequired,
  removeToken: PropTypes.func.isRequired
}
