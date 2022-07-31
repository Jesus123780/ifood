import DashboardStore from 'container/dashboard/store'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'
import NotFountView from 'pages/404'
import { cookie, defaultReturnObject } from 'utils'

export default function dashboard ({ idStore }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { name } = router.query
  const isValidate = idStore === name[1] 
  if (isValidate) {
    return <DashboardStore />
  } 
  return <NotFountView />
  
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || null,
          idStore: idStore || null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
