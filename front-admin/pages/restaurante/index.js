import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
// import { Context } from '../../../context'

import { useEffect } from 'react'
import { Restaurant } from '../../container/Restaurant'
import { Context } from '../../Context'

export default function RestaurantView() {
  // const { setAlertBox } = useContext(Context)
  return (<Restaurant />)
}
