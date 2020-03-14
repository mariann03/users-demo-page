import db from '../../../lib/db'
import withUser from '../../../utils/api/middlewares/withUser'
import { errorIf } from '../../../utils/api/errors'
import { NO_USER, FORBIDDEN } from '../../../utils/api/middlewares/withErrorHandler'

async function id(req, res) {
  const { query } = req
  const [user] = await db.query`SELECT id, email, role, created_at FROM users WHERE id=${query.id}`

  errorIf(!user, NO_USER)
  errorIf(req.user.role !== 'admin' && user.id !== req.user.id, FORBIDDEN)

  res.status(200).json({ user })
}

export default withUser(id)
