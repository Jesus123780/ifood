import { withIronSessionApiRoute } from 'iron-session/next'
import { cookie } from '~/utils'

export default withIronSessionApiRoute(
  (req, res) => {
    try {
      const { user } = req.session || {}
      const { isLoggedIn } = user || {}
      if (isLoggedIn === true) {
        req.session.destroy()
        res.status(200).json({
          status: 200,
          isLoggedIn: false,
          ok: true,
          user: null
        })
      } else {
        return res.status(200).json({})
      }
    } catch (error) {
      return res.status(200).json({
        status: 500,
        error: error.message,
        message: 'Lo sentimos, ha ocurrido un error interno al cerrar session'
      })
    }
  },
  cookie
)