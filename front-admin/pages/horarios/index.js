import { Horarios } from "container/Horarios";
import withSession from "apollo/session";

export default function shopping() {
  return <Horarios />
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)