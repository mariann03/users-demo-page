import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { node, bool } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

export default function MyButton({ loading, children, ...rest }) {
  const { loader } = useStyles()
  return (
    <Button disabled={loading} {...rest}>
      {loading ? <CircularProgress className={loader} size='1.8em' /> : children}
    </Button>
  )
}

const useStyles = makeStyles(() => ({
  loader: {
    padding: 2
  }
}))

MyButton.propTypes = {
  loading: bool,
  children: node
}
