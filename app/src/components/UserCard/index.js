import { Grid, Avatar, Typography, makeStyles } from '@material-ui/core'
import { string } from 'prop-types'
import { useRouter } from 'next/router'
import { useStateContext } from '../../context/State'
import { selectUser } from '../../context/actions'

export default function UserCard({ id, name, email, ...rest }) {
  const classes = useStyles()
  const router = useRouter()
  const { dispatch } = useStateContext()

  function handleOnClick() {
    selectUser(dispatch, { id, name, email, ...rest })
    router.push('/user/[id]', `/user/${id}`)
  }

  return (
    <Grid container alignItems='center' className={classes.container} onClick={handleOnClick}>
      <Grid item xs={4}>
        <Avatar className={classes.avatar}>{name[0]}</Avatar>
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <Typography component='h3' variant='h6'>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='p' variant='subtitle1' color='textSecondary'>
              {email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

UserCard.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  email: string.isRequired
}

const useStyles = makeStyles({
  container: {
    cursor: 'pointer'
  },
  avatar: {
    margin: 'auto',
    textTransform: 'capitalize'
  }
})
