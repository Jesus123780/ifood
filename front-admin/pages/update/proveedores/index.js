import withSession from 'apollo/session'
import { ProvidersC } from 'container/providers'

export default function providers() {
  return <ProvidersC />
}

export const getServerSideProps = withSession(async function ({ req }) {
  // eslint-disable-next-line no-undef
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
    props: {}
  }
}
)
