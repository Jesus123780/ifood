
import { withIronSessionApiRoute } from 'iron-session/next'
export default withIronSessionApiRoute(() => {
  console.log('first') 
}, sessionOptions)

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'iron-session/examples/next.js',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}