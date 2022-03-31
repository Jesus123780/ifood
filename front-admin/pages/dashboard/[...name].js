import withSession from 'apollo/session'
import DashboardStore from 'container/dashboard/store'

export default function dashboard() {
  return (<DashboardStore /> )
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)