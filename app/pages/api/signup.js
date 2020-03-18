import { query } from '../../lib/db'
import jwt from '../../utils/api/jwt'
import bcrypt from 'bcrypt'
import { errorIf } from '../../utils/api/errors'
import withErrorHandler, { NO_EMAIL_PASS } from '../../utils/api/middlewares/withErrorHandler'

async function signup(req, res) {
  const { email, password } = req.body
  errorIf(!email || !password, NO_EMAIL_PASS)

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
  const { error } = await query`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`
  errorIf(error, error?.code)

  const [{ id }] = await query`SELECT id FROM users WHERE email=${email}`
  const token = jwt.sign({ userId: id })
  res.status(200).json({ token })
}

export default withErrorHandler(signup)
