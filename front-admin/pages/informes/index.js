import { ReportsC } from 'container/reports'

export default function Reports() {
  return <ReportsC />
}

// export const getServerSideProps = withSession(async function ({ req }) {
//   // eslint-disable-next-line no-undef
//   if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
//   return {
//     props: {}
//   }
// }
// )