import db from '../../../../lib/db'
import withUser from '../../../../utils/api/middlewares/withUser'
import { errorIf } from '../../../../utils/api/errors'

import { NO_USER_PROFILE } from '../../../../utils/api/middlewares/withErrorHandler'

async function createProfile(req, res) {
  const { name, career, dateOfBirth, phone, country, city, paymentMethod, installments = null } = req.body

  const { error } = await db.query`
      UPDATE users_information
      SET name=${name}, career=${career}, date_of_birth=${dateOfBirth}, phone=${phone}, country=${country}, city=${city}, payment_method=${paymentMethod}, installments=${installments}
      WHERE id=${req.userId};
    `
  errorIf(error, error?.code)

  const [userProfile] = await db.query`SELECT * FROM users_information WHERE id=${req.userId}`
  errorIf(!userProfile, NO_USER_PROFILE)

  const { date_of_birth: dob, payment_method: pm, ...rest } = userProfile
  res.status(200).json({ ...rest, dateOfBirth: dob, paymentMethod: pm })
}

export default withUser(createProfile)
