import withSession from 'apollo/session'
import { Restaurant } from '../../container/Restaurant'
export default function RestaurantView() {
  return (<Restaurant />)
}
export const getServerSideProps = withSession(async function ({ req }) {
  // eslint-disable-next-line no-undef
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
    props: {}
  }
}
)