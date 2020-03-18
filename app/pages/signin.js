import { Avatar, TextField, Link as MUILink, Grid, Typography, makeStyles, Container, Zoom } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useForm from '../src/hooks/useForm'
import Link from 'next/link'
import Button from '../src/components/Button'
import usePost from '../src/hooks/usePost'
import { useContext } from '../src/contexts/SessionManager'

export default function SignUp() {
  const classes = useStyles()
  const inputProps = { variant: 'outlined', required: true, fullWidth: true, autoFocus: true }
  const [email, password] = useForm(2)
  const { post, loading, error } = usePost()
  const { saveToken } = useContext()

  async function handleOnSubmit(e) {
    e.preventDefault()
    const res = await post('/api/signin', {
      email: email.value,
      password: password.value
    })
    if (res.status >= 400) return
    saveToken(res.data.token)
  }

  return (
    <Zoom in>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label='Email Address' autoComplete='email' {...inputProps} {...email} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  inputProps={{ minLength: 4 }}
                  {...inputProps}
                  {...password}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              loading={loading}>
              Sign In
            </Button>
            <Grid container justify='flex-end' spacing={2}>
              {!!error && (
                <Grid item xs={12}>
                  <Alert severity='error'>{error.data}</Alert>
                </Grid>
              )}
              <Grid item>
                <Link href='/signup'>
                  <MUILink variant='body2'>Don&apos;t have an account? Sign Up</MUILink>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Zoom>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
