import withSession from 'apollo/session'
import Dashboard from '../../container/dashboard'

export default function DASHBOARD() {
  return <Dashboard />
}

// export const getServerSideProps = withSession(async function ({ req }) {
//   // eslint-disable-next-line no-undef
//   if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
//   return {
//     props: {}
//   }
// }
// )
