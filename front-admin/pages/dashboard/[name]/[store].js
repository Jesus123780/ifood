import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import DashboardStore from '../../../container/dashboard/Store'
import Context from '../../../Context'

export default function DASHBOARD() {
  const router = useRouter()
  // const { setAlertBox } = useContext(Context)
  return (<DashboardStore StoreId={router.query.store} />
  )
}
