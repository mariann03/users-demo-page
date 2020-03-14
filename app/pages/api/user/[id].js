import db from '../../../lib/db'
import withAutorization from '../../../utils/api/middlewares/withAutorization'
import errorHandler, { NO_USER, FORBIDDEN } from '../../../utils/api/errorHandler'

async function id(req, res) {
  try {
    const { query } = req

    const [user] = await db.query`SELECT id, email, role, created_at FROM users WHERE id=${query.id}`
    if (!user) {
      res.status(404).json({ error: errorHandler(NO_USER) })
      return
    }

    if (user.role !== 'admin' && user.id !== id) {
      res.status(403).json({ error: errorHandler(FORBIDDEN) })
      return
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: errorHandler() })
  }
}

export default withAutorization(id)
