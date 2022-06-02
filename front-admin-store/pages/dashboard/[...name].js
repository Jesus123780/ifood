import DashboardStore from 'container/dashboard/store'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'

export default function dashboard() {
  return (<DashboardStore /> )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
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