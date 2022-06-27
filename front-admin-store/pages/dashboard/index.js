import { withIronSessionSsr } from 'iron-session/next'
// import getAuth from 'pages/api/auth/getAuth'
import { cookie, defaultReturnObject } from 'utils'
import Dashboard from '../../container/dashboard'


export default function DASHBOARD() {

  return <Dashboard />
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, res }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    // const auth = await  getAuth(req)
    // console.log("🚀 ~ file: index.js ~ line 18 ~ getServerSideProps ~ auth", auth)
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user  || '',
          idStore: idStore || '',
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
