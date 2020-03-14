import { query } from '../../lib/db'
import jwt from '../../utils/api/jwt'
import bcrypt from 'bcrypt'
import errorHandler, { NO_EMAIL_PASS } from '../../utils/api/errorHandler'

export default async function signup(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: errorHandler(NO_EMAIL_PASS) })
    return
  }

  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS)

  const { error } = await query`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`

  if (error) {
    console.error(error)
    res.status(400).json({ error: errorHandler(error.code) })
    return
  }

  try {
    const [{ id }] = await query`SELECT id FROM users WHERE email=${email}`

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_DURATION
    })

    res.status(200).json({ token })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: errorHandler() })
  }
}
