import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { CategoriesStore } from '../../../container/update/Categoria-tienda'
import { Context } from '../../../context/Context'

export default function ProductsView() {
  const { setAlertBox } = useContext(Context)
  return (<CategoriesStore setAlertBox={setAlertBox} />)
}
