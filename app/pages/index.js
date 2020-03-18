import { Container, makeStyles } from '@material-ui/core'
import NotLogged from '../src/layouts/home/NotLogged'
import Logged from '../src/layouts/home/Logged'
import { useContext } from '../src/contexts/SessionManager'

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}))

export default function Home() {
  const classes = useStyles()
  const { isLogged } = useContext()
  const Content = isLogged ? Logged : NotLogged

  return (
    <Container maxWidth='sm' component='main' className={classes.heroContent}>
      <Content />
    </Container>
  )
}
