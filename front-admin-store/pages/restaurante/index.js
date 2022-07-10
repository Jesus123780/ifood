/* eslint-disable no-undef */
import { Restaurant } from '../../container/Restaurant'
import { EmptyLayout } from 'pages/_app'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'

export default function RestaurantView () {
  return <Restaurant />
}
RestaurantView.Layout = EmptyLayout

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    if (storeUserId) return { redirect: { destination: '/dashboard' } }
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user,
          idStore: null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
