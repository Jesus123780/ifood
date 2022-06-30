import { withIronSessionApiRoute } from 'iron-session/next'
import { getUserFromToken } from '.'

const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    maxAge: 60 * 60 * 8, // 8 hours,
    secure: process.env.NODE_ENV === 'production'
  }
}

export default withIronSessionApiRoute(async function isAuth(req, res) {
  try {
    const { token } = req.session.user || {}
    const { error } = await getUserFromToken(token)
    if (error === true) {
      req.session.destroy()
      res.setHeader('location', '/')
      res.statusCode = 302
      res.end()
    } else {
      res.status(500).json({
        ok: req.session
      })
    }
  } catch (e) {
    throw new Error('Lo sentimos, ha ocurrido un error interno al cerrar session')
  }
},
cookie
)