import DashboardStore from 'container/dashboard/store'
import { withIronSessionSsr } from 'iron-session/next'

export default function dashboard() {
  return (<DashboardStore /> )
}
const cookie = {
  password: process.env.SESSION_KEY,
  cookieName: process.env.SESSION_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    const defaultReturnObject = {
      redirect: {
        destination: '/entrar',
        permanent: false
      }
    }
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: null
        }
      }
    }
    // eslint-disable-next-line no-unreachable
    catch (error) {
      return {}
    }
  },
  cookie
)