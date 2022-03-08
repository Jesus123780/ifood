import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GET_ALL_DEVICES } from '../../container/profile/queries'
import { Security } from '../../container/profile/Security'

export default function ProfileView() {
  const { data: dataDevice } = useQuery(GET_ALL_DEVICES)
  const [deviceId, setDeviceId] = useState(false)

  console.log(dataDevice)
  useEffect(() => {
    setDeviceId(window.localStorage.getItem('deviceid'))
}, [])
  return (
    <div >
      <Head>
        <title>Delibery de Historia </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Security 
      dataDevice={dataDevice}
      deviceId={deviceId}
      />
    </div>
  )
}