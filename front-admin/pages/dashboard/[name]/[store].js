import withSession from 'apollo/session'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import DashboardStore from '../../../container/dashboard/Store'
import { Context } from '../../../context/Context'

export default function DASHBOARD() {
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  return (<DashboardStore setAlertBox={setAlertBox} StoreId={router.query.store} />
  )
}

export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }
  return {
      props: {}
  }
}
)