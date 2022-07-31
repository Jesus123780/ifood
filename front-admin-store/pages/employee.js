import Employees from 'container/employees'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from '~/utils'

export default function employeeView({ user, idStore }) {

  return (
    <Employees
      idStore={idStore}
      user={user}
    />
  )
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
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