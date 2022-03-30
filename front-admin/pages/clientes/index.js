import withSession from "apollo/session";
import { Clients } from "container/clients";

export default function Loyalty() {
  return <Clients />
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)