import { query } from '../../lib/db'
import jwt from '../../utils/api/jwt'
import bcrypt from 'bcrypt'
import withErrorHandler, { NO_EMAIL_PASS, EMAIL_PASSWORD_ERROR } from '../../utils/api/middlewares/withErrorHandler'
import { errorIf } from '../../utils/api/errors'

async function signin(req, res) {
  const { email, password } = req.body
  errorIf(!email || !password, NO_EMAIL_PASS)

  const [user] = await query`SELECT * FROM users WHERE email=${email}`
  errorIf(!user || !(await bcrypt.compare(password, user.password)), EMAIL_PASSWORD_ERROR)

  const token = jwt.sign({ userId: user.id })
  res.status(200).json({ token })
}

export default withErrorHandler(signin)
