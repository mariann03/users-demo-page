import jwt from 'jsonwebtoken'

export function sign(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_DURATION
  })
}

export function verify(obj) {
  return jwt.verify(obj, process.env.JWT_SECRET_KEY)
}

export function decode(obj) {
  return jwt.decode(obj, process.env.JWT_SECRET_KEY)
}

export default { sign, verify, decode }
