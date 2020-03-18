import { query } from '../../../../lib/db'
import withAutorization from '../../../../utils/api/middlewares/withAutorization'
import { errorIf } from '../../../../utils/api/errors'

import { NO_USER_PROFILE } from '../../../../utils/api/middlewares/withErrorHandler'

async function index(req, res) {
  const { userId } = req

  const [userProfile] = await query`SELECT * FROM users_information WHERE id=${userId}`
  errorIf(!userProfile, NO_USER_PROFILE)

  const { date_of_birth: dateOfBirth, payment_method: paymentMethod, ...rest } = userProfile
  res.status(200).json({ ...rest, dateOfBirth, paymentMethod })
}

export default withAutorization(index)
