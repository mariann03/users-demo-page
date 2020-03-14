import { query } from '../../../lib/db'
import withAutorization from './withAutorization'
import errorHandler, { NO_USER } from '../errorHandler'

function withUser(handler) {
  return async (req, res) => {
    try {
      const [user] = await query`SELECT * FROM users WHERE id=${req.userId}`
      if (!user) {
        res.status(404).json({ error: errorHandler(NO_USER) })
        return
      }
      req.user = user
      handler(req, res)
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: errorHandler() })
    }
  }
}

export default handler => withAutorization(withUser(handler))
