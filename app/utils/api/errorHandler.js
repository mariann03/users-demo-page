export const NO_EMAIL_PASS = 'NO_EMAIL_PASS'
export const ER_DUP_ENTRY = 'ER_DUP_ENTRY'
export const EMAIL_PASSWORD_ERROR = 'EMAIL_PASSWORD_ERROR'
export const NO_USER = 'NO_USER'
export const NO_USER_PROFILE = 'NO_USER_PROFILE'
export const TOKEN_EXPIRED_ERROR = 'TokenExpiredError'
export const BAD_QUERY = 'BAD_QUERY'
export const FORBIDDEN = 'FORBIDDEN'
export const TOKEN_ERROR = 'TOKEN_ERROR'

export default function errorHandler(code) {
  switch (code) {
    case NO_EMAIL_PASS:
      return 'You must fill all fields'
    case ER_DUP_ENTRY:
      return 'The email is already registered'
    case EMAIL_PASSWORD_ERROR:
      return 'Wrong email or password'
    case NO_USER:
      return 'User does not exists'
    case NO_USER_PROFILE:
      return 'User profile not created'
    case TOKEN_EXPIRED_ERROR:
    case TOKEN_ERROR:
      return 'You must sign in again'
    case BAD_QUERY:
      return 'Query type is not supported'
    case FORBIDDEN:
      return "You don't have permission for this"
    default:
      return 'Something went wrong'
  }
}
