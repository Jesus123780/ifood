import { LoyaltyC } from 'container/loyalty'

export default function Loyalty() {
  return <LoyaltyC />
}

// export const getServerSideProps = withSession(async function ({ req }) {
//   // eslint-disable-next-line no-undef
//   if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
//   return {
//     props: {}
//   }
// }
// )