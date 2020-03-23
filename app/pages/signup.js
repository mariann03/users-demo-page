import { Avatar, TextField, Link as MUILink, Grid, Typography, makeStyles, Container, Zoom } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Alert from '@material-ui/lab/Alert'
import useForm from '../src/hooks/useForm'
import Link from 'next/link'
import usePost from '../src/hooks/usePost'
import Button from '../src/components/Button'
import { useStateContext } from '../src/context/State'
import { singIn } from '../src/context/actions'

export default function SignUp() {
  const [email, password] = useForm(2)
  const { post, loading, error } = usePost()
  const { dispatch } = useStateContext()

  const classes = useStyles()
  const inputProps = { variant: 'outlined', required: true, fullWidth: true, autoFocus: true }

  async function handleOnSubmit(e) {
    e.preventDefault()
    const res = await post('/api/signup', {
      email: email.value,
      password: password.value
    })
    if (res.status >= 400) return
    singIn(dispatch, res.data.token)
  }

  return (
    <Zoom in>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label='Email Address' autoComplete='email' type='email' {...inputProps} {...email} />
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
              Sign Up
            </Button>
            <Grid container justify='flex-end' spacing={2}>
              {!!error && (
                <Grid item xs={12}>
                  <Alert severity='error'>{error.data}</Alert>
                </Grid>
              )}
              <Grid item>
                <Link href='/signin'>
                  <MUILink variant='body2'> Already have an account? Sign in</MUILink>
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
