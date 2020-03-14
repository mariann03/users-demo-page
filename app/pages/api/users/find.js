import { query } from '../../../lib/db'
import errorHandler, { BAD_QUERY, FORBIDDEN } from '../../../utils/api/errorHandler'
import withUser from '../../../utils/api/middlewares/withUser'

async function find(req, res) {
  if (req.user.role !== 'admin') {
    req.status(403).json({ error: errorHandler(FORBIDDEN) })
  }
  const { filter, keyword = '' } = req.query

  if (!filter.match(/^(name|email|country|career)$/g)) {
    res.status(400).json({ error: errorHandler(BAD_QUERY) })
  }

  const parsedKeyword = `%${keyword}%`

  let users
  switch (filter) {
    case 'name':
      users = await query`SELECT * FROM users_information where name LIKE ${parsedKeyword}`
      break
    case 'email':
      users = await query`SELECT * FROM users_information where email LIKE ${parsedKeyword}`
      break
    case 'country':
      users = await query`SELECT * FROM users_information where country LIKE ${parsedKeyword}`
      break
    case 'career':
      users = await query`SELECT * FROM users_information where career LIKE ${parsedKeyword}`
      break
  }

  res.status(200).json({ users })
}

export default withUser(find)
