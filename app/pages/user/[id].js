import UserProfileCard from '../../src/components/ProfileCard'
import { useContext } from '../../src/contexts/SelectedUser'
import { useContext as useUserContext } from '../../src/contexts/User'
import useGet from '../../src/hooks/useGet'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import CardSkeleton from '../../src/components/ProfileCard/Skeleton'

export default function User() {
  const { selectedUser } = useContext()
  const { query } = useRouter()
  const { data } = useUserContext()
  const { get, response, loading, error } = useGet(`/api/user/profile/${query.id}`, true, false)

  useEffect(() => {
    if (selectedUser || !query.id) return
    get()
  }, [selectedUser, query])

  if (loading) {
    return <CardSkeleton />
  }

  if (error) {
    return <Alert severity='error'>{error.data}</Alert>
  }
  return <UserProfileCard defaultValue={selectedUser || response.data} readOnly={query.id !== data?.id} />
}
