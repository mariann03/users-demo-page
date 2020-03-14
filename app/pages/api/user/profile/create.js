import db from '../../../../lib/db'
import errorHandler from '../../../../utils/api/errorHandler'
import withUser from '../../../../utils/api/middlewares/withUser'

async function createProfile(req, res) {
  try {
    const { id, email } = req.user
    const { name, career, dateOfBirth, phone, country, city, paymentMethod, installments = null } = req.body

    const { error } = await db.query`
      INSERT INTO 
      users_information (id, name, email, career, date_of_birth, phone, country, city, payment_method, installments) 
      values (${id}, ${name}, ${email}, ${career}, ${dateOfBirth}, ${phone}, ${country}, ${city}, ${paymentMethod}, ${installments})
    `

    if (error) {
      console.error(error)
      res.status(400).json({ error: errorHandler(error.code) })
      return
    }

    res.status(200).json({ user: { ...req.body, ...req.user } })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: errorHandler() })
  }
}

export default withUser(createProfile)
