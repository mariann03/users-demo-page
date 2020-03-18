import { query } from '../../../../lib/db'
import withUser from '../../../../utils/api/middlewares/withUser'
import { errorIf } from '../../../../utils/api/errors'

import { NO_USER_PROFILE, FORBIDDEN } from '../../../../utils/api/middlewares/withErrorHandler'

async function id(req, res) {
  const {
    query: { id },
    user
  } = req
  errorIf(user.role !== 'admin' && user.id !== id, FORBIDDEN)

  const [userProfile] = await query`SELECT * FROM users_information WHERE id=${id}`
  errorIf(!userProfile, NO_USER_PROFILE)

  const { date_of_birth: dateOfBirth, payment_method: paymentMethod, ...rest } = userProfile
  res.status(200).json({ ...rest, dateOfBirth, paymentMethod })
}

export default withUser(id)
