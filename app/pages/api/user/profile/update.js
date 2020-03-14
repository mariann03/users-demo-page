import db from '../../../../lib/db'
import errorHandler, { NO_USER_PROFILE } from '../../../../utils/api/errorHandler'
import withUser from '../../../../utils/api/middlewares/withUser'

async function createProfile(req, res) {
  try {
    const { name, career, dateOfBirth, phone, country, city, paymentMethod, installments = null } = req.body

    const { error } = await db.query`
      UPDATE users_information
      SET name=${name}, career=${career}, date_of_birth=${dateOfBirth}, phone=${phone}, country=${country}, city=${city}, payment_method=${paymentMethod}, installments=${installments}
      WHERE id=${req.userId};
    `
    if (error) {
      console.error(error)
      res.status(400).json({ error: errorHandler(error.code) })
      return
    }

    const [user] = await db.query`SELECT * FROM users_information WHERE id=${req.userId}`
    if (!user) {
      res.status(404).json({ error: errorHandler(NO_USER_PROFILE) })
      return
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: errorHandler() })
  }
}

export default withUser(createProfile)
