import { Link as MUILink, Button } from '@material-ui/core'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function NotLogged({ className }) {
  return (
    <>
      <Link href='/signup'>
        <MUILink variant='button' color='textPrimary' className={className}>
          sign up
        </MUILink>
      </Link>
      <Link href='/signin'>
        <Button color='primary' variant='outlined' className={className}>
          sign in
        </Button>
      </Link>
    </>
  )
}

NotLogged.propTypes = {
  className: PropTypes.string.isRequired
}
