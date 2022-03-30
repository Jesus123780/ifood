import { PromoBannerDashboard } from 'container/update/PromoBannerDashboard'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { Context } from '../../../context/Context'

export default function PromoBannerDashboardView() {
  const { setAlertBox } = useContext(Context)
  return (<PromoBannerDashboard setAlertBox={setAlertBox} />)
}
