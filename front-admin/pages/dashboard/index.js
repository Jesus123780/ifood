import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import withSession from '../../apollo/session'
import Dashboard from '../../container/dashboard'
import Context from '../../context/Context'
import { decodeToken } from '../../utils'

export default function DASHBOARD() {
  // const { setAlertBox } = useContext(Context)
  return <Dashboard />
}

export const getServerSideProps = withSession(async function ({ req }) {
  const user = req?.session?.get('user')
  const { token } = user || {}
  const data = decodeToken(token)
  const { id } = data ||{}
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }

  return {
      props: {}
  }
}
)
