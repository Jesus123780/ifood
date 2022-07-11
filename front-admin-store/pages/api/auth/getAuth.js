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
    if (!req.cookies[process.env.SESSION_NAME]) {
      return res.status(500).json({
        isSession: false,
        storeUserId: null
      })
    }
    if (!token) {
      req.session.destroy()
      res.setHeader('location', '/app/entrar')
      res.statusCode = 302
      res.end()
      return res.status(500).json({
        ok: false,
        isSession: false
      })
    }
    const { error } = await getUserFromToken(token)
    if (error) {
      req.session.destroy()
      res.setHeader('location', '/app/entrar')
      res.statusCode = 302
      res.end()
      return res.status(500).json({
        ok: req.session,
        isSession: false
      })

    }
    return res.status(500).json({
      ok: req.session,
      isSession: true
    })

  } catch (e) {
    return res.status(500).json({
      ok: req.session,
      isSession: true
    })
  }
}, cookie)