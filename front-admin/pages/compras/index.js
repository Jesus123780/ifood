import { ShoppingC } from 'container/compras'

export default function shopping() {
  return <ShoppingC />
}

// export const getServerSideProps = withSession(async function ({ req }) {
//   // eslint-disable-next-line no-undef
//   if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
//   return {
//     props: {}
//   }
// }
// )