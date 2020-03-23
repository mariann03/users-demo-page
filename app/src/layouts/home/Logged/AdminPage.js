import { Typography, GridList, GridListTile, makeStyles, CircularProgress, Box } from '@material-ui/core'
import UserCard from '../../../components/UserCard'
import { useStateContext } from '../../../context/State'
import Alert from '@material-ui/lab/Alert'

function Loader() {
  return (
    <Box display='flex' justifyContent='center' marginTop={10}>
      <CircularProgress />
    </Box>
  )
}

export default function AdminPage() {
  const classes = useStyles()
  const { data, loading, error } = useStateContext().state.search

  return (
    <>
      <Typography component='h1' variant='h4' align='center' color='textPrimary' gutterBottom>
        Welcome back boss!
      </Typography>
      <Typography
        variant='subtitle1'
        align='center'
        color='textSecondary'
        component='p'
        className={classes.description}>
        Here are all registered members
      </Typography>
      {data && (
        <GridList cellHeight='auto' spacing={14}>
          {data.map(user => (
            <GridListTile key={user.id} classes={{ tile: classes.card }}>
              <UserCard {...user} />
            </GridListTile>
          ))}
        </GridList>
      )}
      {loading && <Loader />}
      {error && <Alert severity='error'>{error}</Alert>}
    </>
  )
}

const useStyles = makeStyles({
  description: {
    marginBottom: 20
  },
  card: {
    boxShadow: '2px 3px 6px 1px rgba(0,0,0,0.25)',
    borderRadius: 4
  }
})
