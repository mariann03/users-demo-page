import Button from '@material-ui/core/Button'

import { useRouter } from 'next/router'
import SearchBar from './SearchBar'

import { singOut } from '../../../context/actions'
import { useStateContext } from '../../../context/State'

import PropTypes from 'prop-types'

export default function Logged({ className }) {
  const { pathname } = useRouter()
  const {
    state: { user },
    dispatch
  } = useStateContext()

  const showSearch = user?.data?.role === 'admin' && pathname === '/'

  function handleOnClick() {
    singOut(dispatch)
  }

  return (
    <>
      {showSearch && <SearchBar />}
      <Button color='primary' variant='outlined' className={className} onClick={handleOnClick}>
        log out
      </Button>
    </>
  )
}

Logged.propTypes = {
  className: PropTypes.string.isRequired
}
