/* eslint-disable no-undef */
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'
import { Loading } from '~/components/Loading'

export default function RestaurantView() {

  return <Loading />
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    // if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
    try {
      if (storeUserId) {
        return {
          redirect: { destination: '/dashboard' },
          props: {
            user: user,
            idStore: null
          }
        }
      } 
      return {
        redirect: { destination: '/restaurante' },
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

RestaurantView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
