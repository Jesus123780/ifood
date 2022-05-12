import withSession from '../../../apollo/session'

// eslint-disable-next-line consistent-return
export default withSession(async (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.json({ isLoggedIn: false })
    return res.end()
  }
})
