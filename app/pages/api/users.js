import { query } from '../../lib/db'
import withUser from '../../utils/api/middlewares/withUser'
import { errorIf } from '../../utils/api/errors'

import { FORBIDDEN } from '../../utils/api/middlewares/withErrorHandler'

async function find(req, res) {
  errorIf(req.user.role !== 'admin', FORBIDDEN)
  const { Career = '', Country = '', q = '' } = req.query

  const wildcard = `%${q}%`
  let users
  if (Career) {
    users = await query`
    SELECT * FROM users_information 
    WHERE career = ${Career} AND
    (email LIKE ${wildcard} OR name LIKE ${wildcard})`
  } else if (Country) {
    users = await query`
    SELECT * FROM users_information 
    WHERE country = ${Country} AND
    (email LIKE ${wildcard} OR name LIKE ${wildcard})`
  } else {
    users = await query`SELECT * FROM users_information where email LIKE ${wildcard} OR name LIKE ${wildcard}`
  }

  const parsedUsers = users.map(user => ({
    ...user,
    dateOfBirth: user.date_of_birth,
    paymentMethod: user.payment_method
  }))
  res.status(200).json([...parsedUsers])
}

export default withUser(find)
