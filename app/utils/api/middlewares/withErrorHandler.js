export const NO_EMAIL_PASS = 'NO_EMAIL_PASS'
export const ER_DUP_ENTRY = 'ER_DUP_ENTRY'
export const EMAIL_PASSWORD_ERROR = 'EMAIL_PASSWORD_ERROR'
export const NO_USER = 'NO_USER'
export const NO_USER_PROFILE = 'NO_USER_PROFILE'
export const BAD_QUERY = 'BAD_QUERY'
export const FORBIDDEN = 'FORBIDDEN'
export const TOKEN_ERROR = 'TOKEN_ERROR'

export default function withErrorHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (error) {
      switch (error) {
        case NO_EMAIL_PASS:
          res.status(400).json({ error: 'You must fill all fields' })
          break
        case ER_DUP_ENTRY:
          res.status(400).json({ error: 'The email is already registered' })
          break
        case EMAIL_PASSWORD_ERROR:
          res.status(400).json({ error: 'Wrong email or password' })
          break
        case NO_USER:
          res.status(404).json({ error: 'User does not exists' })
          break
        case NO_USER_PROFILE:
          res.status(404).json({ error: 'User profile not exists' })
          break
        case TOKEN_ERROR:
          res
            .status(401)
            .json({ error: 'The access token provided is expired, malformed, or invalid for other reasons' })
          console.log(error)
          break
        case BAD_QUERY:
          res.status(501).json({ error: 'Query type is not supported' })
          break
        case FORBIDDEN:
          res.status(403).json({ error: "You don't have permission for this" })
          break
        default:
          res.status(500).json({ error: 'Something went wrong' })
          console.error('Something went wrong')
      }
    }
  }
}
