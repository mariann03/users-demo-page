import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import Link from 'next/link'

import NotLogged from './NotLogged'
import Logged from './Logged'
import { useRouter } from 'next/router'
import { useStateContext } from '../../context/State'

export default function Nav() {
  const classes = useStyles()
  const { pathname } = useRouter()
  const { state } = useStateContext()
  const NavContent = state?.authToken ? Logged : NotLogged

  return (
    <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link href='/'>
          {pathname === '/' ? (
            <Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
              Tell us your preference
            </Typography>
          ) : (
            <HomeIcon className={classes.toolbarTitle} />
          )}
        </Link>
        <nav className={classes.container}>
          <NavContent className={classes.link} />
        </nav>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 0,
    cursor: 'pointer'
  },
  link: {
    margin: theme.spacing(1, 1.5),
    flexShrink: 0
  },
  container: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  }
}))
