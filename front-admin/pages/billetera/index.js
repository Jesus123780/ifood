import withSession from 'apollo/session'
import { WalletC } from 'container/wallet'

export default function shopping() {
  return <WalletC />
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
    props: {}
  }
}
)
