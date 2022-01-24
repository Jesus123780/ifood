import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { LocationC } from '../../../container/update/Location'
import { Context } from '../../../context'

export default function LocationView() {
  const { setAlertBox } = useContext(Context)
  return(<LocationC setAlertBox={setAlertBox} /> )
}
