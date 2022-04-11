import withSession from 'apollo/session'
import { Contact } from "container/contactos";

export default function shopping() {
  return <Contact />
}
export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)
