import { Typography, Box } from '@material-ui/core'
import UserProfileCard from '../../../components/ProfileCard'
import { useContext } from '../../../contexts/User'
import { useContext as useProfileContext } from '../../../contexts/UserProfile'
import AdminPage from './AdminPage'
import { useRouter } from 'next/router'
import Alert from '@material-ui/lab/Alert'
import Skeleton from '@material-ui/lab/Skeleton'

export default function Logged() {
  const { data, loading, error } = useContext()
  const { loading: profileLoading, error: profileError } = useProfileContext()
  const router = useRouter()

  if (loading || profileLoading) {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Skeleton variant='text' height={50} width={400} />
        <Skeleton variant='text' height={20} width={300} />
        <br />
        <Skeleton variant='rect' height={550} width={350} />
      </Box>
    )
  }

  if (profileError?.status === 404) {
    router.push('/profile')
    return null
  }

  if (data.role === 'admin') return <AdminPage />

  return (
    <>
      <Typography component='h1' variant='h4' align='center' color='textPrimary' gutterBottom>
        Thanks for sharing your data.
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
        Please feel free to change what you want
      </Typography>
      {error ? <Alert severity='error'>{(error || profileError)?.data}</Alert> : <UserProfileCard />}
    </>
  )
}
