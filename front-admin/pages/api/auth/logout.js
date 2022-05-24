import { withIronSessionApiRoute } from 'iron-session/next'

const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export default withIronSessionApiRoute(
  function signOut(req, res) {
    req.session.destroy()
    res.status(200).json({ ok: true })
  },
  cookie
)