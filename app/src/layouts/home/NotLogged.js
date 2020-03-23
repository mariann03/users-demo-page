import { Typography, makeStyles, Link as MUILink } from '@material-ui/core'
import Link from 'next/link'

export default function NotLoggedContent() {
  const classes = useStyles()

  return (
    <>
      <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
        Welcome buddy!
      </Typography>
      <Typography variant='h5' align='center' color='textSecondary' component='p'>
        On this page you can tell us what is your preferred payment method to buy courses
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary' component='p' className={classes.getStarted}>
        You just need to
        <Link href='/signup'>
          <MUILink align='center' className={classes.link}>
            {' sign up '}
          </MUILink>
        </Link>
        or
        <Link href='/signin'>
          <MUILink align='center' className={classes.link}>
            {' sign in '}
          </MUILink>
        </Link>
        to get started!
      </Typography>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  getStarted: {
    margin: theme.spacing(1, 1.5)
  },
  link: {
    cursor: 'pointer'
  }
}))
