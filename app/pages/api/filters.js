import { query } from '../../lib/db'
import withUser from '../../utils/api/middlewares/withUser'
import { errorIf } from '../../utils/api/errors'

import { FORBIDDEN } from '../../utils/api/middlewares/withErrorHandler'

async function filters(req, res) {
  errorIf(req.user.role !== 'admin', FORBIDDEN)

  let careers = await query`SELECT DISTINCT career FROM users_information`
  let countries = await query`SELECT DISTINCT country FROM users_information`

  careers = careers.map(({ career }) => career)
  countries = countries.map(({ country }) => country)

  res.status(200).json({ careers, countries })
}

export default withUser(filters)
