import { query } from '../../../lib/db'
import withAutorization from './withAutorization'
import { errorIf } from '../errors'

import withErrorHandler, { NO_USER } from './withErrorHandler'

function withUser(handler) {
  return async (req, res) => {
    const [user] = await query`SELECT id, email, role, created_at FROM users WHERE id=${req.userId}`
    errorIf(!user, NO_USER)

    req.user = user
    await handler(req, res)
  }
}

export default handler => withErrorHandler(withAutorization(withUser(handler)))
