import { query } from '../../../../lib/db'
import errorHandler, { NO_USER_PROFILE, FORBIDDEN } from '../../../../utils/api/errorHandler'
import withUser from '../../../../utils/api/middlewares/withUser'

async function id(req, res) {
  try {
    const {
      query: { id },
      user
    } = req
    if (user.role !== 'admin' && user.id !== id) {
      res.status(403).json({ error: errorHandler(FORBIDDEN) })
      return
    }
    const [userProfile] = await query`SELECT * FROM users_information WHERE id=${id}`

    if (!userProfile) {
      res.status(404).json({ error: errorHandler(NO_USER_PROFILE) })
      return
    }

    res.status(200).json({ user: userProfile })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: errorHandler() })
  }
}

export default withUser(id)
