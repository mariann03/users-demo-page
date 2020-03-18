import withUser from '../../../utils/api/middlewares/withUser'

async function index(req, res) {
  const { user } = req
  res.status(200).json(user)
}

export default withUser(index)
