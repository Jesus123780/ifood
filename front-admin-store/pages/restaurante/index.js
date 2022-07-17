/* eslint-disable no-undef */
import { Restaurant } from '../../container/Restaurant'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, decodeToken, defaultReturnObject } from 'utils'

export default function RestaurantView({ user }) {
  const { token } = user || {}
  const userToken = decodeToken(token)
  return <Restaurant userToken={userToken} />
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    // if (storeUserId) return { redirect: { destination: '/dashboard' } }
    try {
      // if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || {},
          idStore: null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)

RestaurantView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
