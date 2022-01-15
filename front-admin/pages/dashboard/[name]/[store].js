import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import DashboardStore from '../../../container/dashboard/store'

export default function DASHBOARD() {
    const router = useRouter()
    return (<DashboardStore StoreId={router.query.store} />
  )
}
