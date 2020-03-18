export const NO_EMAIL_PASS = 'NO_EMAIL_PASS'
export const ER_DUP_ENTRY = 'ER_DUP_ENTRY'
export const ER_DUP_ENTRY_PROFILE = 'ER_DUP_ENTRY_PROFILE'
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
          res.status(400).send('You must fill all fields')
          break
        case ER_DUP_ENTRY:
          res.status(400).send('The email is already registered')
          break
        case ER_DUP_ENTRY_PROFILE:
          res.status(400).send('The user profile is already created')
          break
        case EMAIL_PASSWORD_ERROR:
          res.status(400).send('Wrong email or password')
          break
        case NO_USER:
          res.status(404).send('User does not exists')
          break
        case NO_USER_PROFILE:
          res.status(404).send('User profile not exists')
          break
        case TOKEN_ERROR:
          res.status(401).send('The access token provided is expired, malformed, or invalid for other reasons')
          console.error(error)
          break
        case BAD_QUERY:
          res.status(501).send('Query type is not supported')
          break
        case FORBIDDEN:
          res.status(403).send("You don't have permission for this")
          break
        default:
          res.status(500).send('Something went wrong')
          console.error(error)
      }
    }
  }
}
