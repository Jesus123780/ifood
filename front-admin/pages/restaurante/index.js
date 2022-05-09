/* eslint-disable no-undef */
import withSession from 'apollo/session'
import Store from 'pages/api/lib/models/Store/Store'
import { deCode } from 'pages/api/lib/utils/util'
import { Restaurant } from '../../container/Restaurant'
import jwt from 'jsonwebtoken'

export default function RestaurantView() {
  return (<Restaurant />)
}
export const getServerSideProps = withSession(async function ({ req }) {
  // eslint-disable-next-line no-undef
  let User = {}
  // eslint-disable-next-line no-undef
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  // const attributes = getAttributes(Store, info)
  const { token } = req.session.get('user') || {}
  User = jwt.verify(token, process.env.AUTHO_USER_KEY)
  const data = await Store.findOne({
    attributes: ['id'],
    where: {
      id: deCode(User.id)
    }
  })
  if (data?.id) return { redirect: { destination: '/dashboard' } }
  
  return {
    props: {
    }
  }
}
)