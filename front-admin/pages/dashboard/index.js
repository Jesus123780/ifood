import withSession from 'apollo/session'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Dashboard from '../../container/dashboard'
import { decodeToken } from '../../utils'

export default function DASHBOARD() {
  return <Dashboard />
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)
