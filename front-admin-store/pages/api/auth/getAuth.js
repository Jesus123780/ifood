import { withIronSessionApiRoute } from 'iron-session/next'
import { defaultReturnObject } from '~/utils'
import { getUserFromToken } from '.'

const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    maxAge: 60 * 60 * 8, // 8 hours,
    secure: process.env.NODE_ENV === 'production'
  }
}

export default async function isAuth(req, res) {
  try {
    const { token } = req.session.user || {}
    if (!req.cookies[process.env.SESSION_NAME]) {
      return {
        props: {}
      }
    }
    if (!token) {
      // req.session.destroy()
      // res.setHeader('location', '/app/entrar')
      // res.statusCode = 302
      // res.end()
      return {
        // defaultReturnObject,
        props: {}
      }
    }
    const { error } = await getUserFromToken(token)
    console.log("🚀 ~ file: getAuth.js ~ line 34 ~ isAuth ~ error", error)
    if (error) {
      req.session.destroy()
      res.setHeader('location', '/app/entrar')
      res.statusCode = 302
      res.end()
      return {
        // defaultReturnObject,
        props: {}
      }
    } else {
      // res.status(500).json({
      //   ok: req.session
      // })
      return {
        props: {
          ok: req.session
        }
      }
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/entrar',
        permanent: false
      },
      props: {}
    }
  }
}