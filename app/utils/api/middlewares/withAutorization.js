import jwt from '../../api/jwt'
import withErrorHandler, { TOKEN_ERROR } from './withErrorHandler'

function withAutorization(handler) {
  return async (req, res) => {
    try {
      req.userId = jwt.verify(req.headers.authorization).userId
    } catch (error) {
      throw TOKEN_ERROR
    }
    await handler(req, res)
  }
}

export default handler => withErrorHandler(withAutorization(handler))
