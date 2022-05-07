import { useContext } from 'react'
import { LocationC } from '../../../container/update/Location'
import { Context } from '../../../context/Context'

export default function LocationView() {
  const { setAlertBox } = useContext(Context)
  return(<LocationC setAlertBox={setAlertBox} /> )
}
