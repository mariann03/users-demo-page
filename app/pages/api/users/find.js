import { query } from '../../../lib/db'
import withUser from '../../../utils/api/middlewares/withUser'
import { BAD_QUERY, FORBIDDEN } from '../../../utils/api/middlewares/withErrorHandler'
import { errorIf } from '../../../utils/api/errors'

async function find(req, res) {
  errorIf(req.user.role !== 'admin', FORBIDDEN)
  const { filter, q = '' } = req.query

  errorIf(!filter.match(/^(name|email|country|career)$/g), BAD_QUERY)

  const wildcard = `%${q}%`
  let users
  switch (filter) {
    case 'name':
      users = await query`SELECT * FROM users_information where name LIKE ${wildcard}`
      break
    case 'email':
      users = await query`SELECT * FROM users_information where email LIKE ${wildcard}`
      break
    case 'country':
      users = await query`SELECT * FROM users_information where country LIKE ${wildcard}`
      break
    case 'career':
      users = await query`SELECT * FROM users_information where career LIKE ${wildcard}`
      break
  }

  res.status(200).json({ users })
}

export default withUser(find)
