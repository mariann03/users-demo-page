import Axios from 'axios'

import Alert from '@material-ui/lab/Alert'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import UserProfileCard from '../../src/components/ProfileCard'
import CardSkeleton from '../../src/components/ProfileCard/Skeleton'
import { useStateContext } from '../../src/context/State'

export default function User() {
  const { selectedUser, userProfile, authToken } = useStateContext().state
  const { query } = useRouter()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function getUser() {
    if (userProfile.id === query.id) {
      setUser(userProfile.data)
      setLoading(false)
      return
    }

    if (selectedUser) {
      setUser(selectedUser)
      setLoading(false)
      return
    }

    try {
      const response = await Axios.get(`/api/user/profile/${query.id}`, {
        headers: {
          authorization: authToken
        }
      })
      setUser(response.data)
    } catch (error) {
      setError(error.response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!userProfile.data) return
    getUser()
  }, [userProfile])

  if (loading) {
    return <CardSkeleton />
  }

  if (error) {
    return <Alert severity='error'>{error}</Alert>
  }

  return <UserProfileCard defaultValue={user} readOnly={userProfile.data?.id !== query.id} />
}
