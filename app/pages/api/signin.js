import { query } from '../../lib/db'
import jwt from '../../utils/api/jwt'
import errorHandler, { NO_EMAIL_PASS, EMAIL_PASSWORD_ERROR } from '../../utils/api/errorHandler'
import bcrypt from 'bcrypt'

export default async function signin(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: errorHandler(NO_EMAIL_PASS) })
    return
  }

  const [user] = await query`SELECT * FROM users WHERE email=${email}`

  if (!user || (await bcrypt.compare(user.password, password))) {
    res.status(400).json({ error: errorHandler(EMAIL_PASSWORD_ERROR) })
    return
  }

  const token = jwt.sign({ userId: user.id })
  res.status(200).json({ token })
}
