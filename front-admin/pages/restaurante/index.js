import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { Restaurant } from '../../container/Restaurant'
import Context from '../../Context'

export default function RestaurantView() {
  // const { setAlertBox } = useContext(Context)
  //  useEffect(() => {
  //      setAlertBox({ message: 'Operación exitosa', color: 'success' })
  //  }, [])
  return (
    <Restaurant  />
  )
}
