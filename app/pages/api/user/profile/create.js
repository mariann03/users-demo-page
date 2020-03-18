import db from '../../../../lib/db'
import withUser from '../../../../utils/api/middlewares/withUser'
import { errorIf } from '../../../../utils/api/errors'

async function createProfile(req, res) {
  const { id, email } = req.user
  const { name, career, dateOfBirth, phone, country, city, paymentMethod, installments = null } = req.body

  const { error } = await db.query`
      INSERT INTO 
      users_information (id, name, email, career, date_of_birth, phone, country, city, payment_method, installments) 
      values (${id}, ${name}, ${email}, ${career}, ${dateOfBirth}, ${phone}, ${country}, ${city}, ${paymentMethod}, ${installments})
    `
  errorIf(error, error?.code + '_PROFILE')

  res.status(200).json({ ...req.body, ...req.user })
}

export default withUser(createProfile)
