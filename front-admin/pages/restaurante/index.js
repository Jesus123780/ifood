/* eslint-disable no-undef */
import { Restaurant } from '../../container/Restaurant'
import { EmptyLayout } from 'pages/_app'
import { withIronSessionSsr } from 'iron-session/next'

const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
export default function RestaurantView() {
  return (<Restaurant />)
}
RestaurantView.Layout = EmptyLayout

// export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
//   // eslint-disable-next-line no-undef
//   let User = {}
//   // eslint-disable-next-line no-undef
//   if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
//   // const attributes = getAttributes(Store, info)
//   const { token } = req.session.get('user') || {}
//   User = jwt.verify(token, process.env.AUTHO_USER_KEY)
//   const data = await Store.findOne({
//     attributes: ['id'],
//     where: {
//       id: deCode(User.id)
//     }
//   })
//   if (data?.id) return { redirect: { destination: '/dashboard' } }

//   return {
//     props: {
//     }
//   }
// }
// )
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    const defaultReturnObject = {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
    console.log(req.cookies[process.env.SESSION_NAME])
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      // let userSession = req.session.user
      // if (!userSession?.token) {
      //   return defaultReturnObject
      // }
      // const { token } = userSession
      // if (!userSession) {
      //   return defaultReturnObject
      // }
      return {
        props: {
          user
        }
      }
    }
    catch (error) {
      return defaultReturnObject
    }
  },
  cookie
)