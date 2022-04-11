import { useContext } from 'react'
import { ProductsC } from '../../../container/update/Products'
import { Context } from '../../../context/Context'

export default function ProductsView() {
  const { setAlertBox } = useContext(Context)
  return (<ProductsC setAlertBox={setAlertBox} />)
}
