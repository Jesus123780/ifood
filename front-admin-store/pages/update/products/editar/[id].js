import { ProductEdit } from 'container/producto/editar'
import { useRouter } from 'next/router'

export default function ProductEditView() {
  const location = useRouter()
  const id = location.query.id
  return (<ProductEdit id={id} />)
}