import { withIronSessionApiRoute } from 'iron-session/next'

const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    maxAge:  60 * 60 * 8, // 8 hours,
    secure: process.env.NODE_ENV === 'production'
  }
}

export default withIronSessionApiRoute(
  function signOut(req, res) {
    try {
      req.session.destroy()
      res.status(200).json({ ok: true })
    } catch (error) {
      throw new Error('Lo sentimos, ha ocurrido un error interno al cerrar session')
    }
  },
  cookie
)