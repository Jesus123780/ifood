import withSession from '../../../apollo/session'

export default withSession(async (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.json({ isLoggedIn: false })
    return res.end()
  }
})
