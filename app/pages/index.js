import { Container, makeStyles } from '@material-ui/core'
import NotLogged from '../src/layouts/home/NotLogged'
import Logged from '../src/layouts/home/Logged'
import { useStateContext } from '../src/context/State'

export default function Home() {
  const classes = useStyles()
  const { authToken } = useStateContext().state
  const Content = authToken ? Logged : NotLogged

  return (
    <Container maxWidth='sm' component='main' className={classes.heroContent}>
      <Content />
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}))
