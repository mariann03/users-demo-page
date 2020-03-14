import jwt from '../../api/jwt'
import errorHandler, { TOKEN_EXPIRED_ERROR, TOKEN_ERROR } from '../errorHandler'

export default function withAutorization(handler) {
  return (req, res) => {
    try {
      req.userId = jwt.verify(req.headers.authorization).userId
      handler(req, res)
    } catch (error) {
      if (error.name === TOKEN_EXPIRED_ERROR) {
        res.status(401).json({ error: errorHandler(TOKEN_EXPIRED_ERROR) })
        return
      }
      console.error(error)
      res.status(401).json({ error: errorHandler(TOKEN_ERROR) })
    }
  }
}
