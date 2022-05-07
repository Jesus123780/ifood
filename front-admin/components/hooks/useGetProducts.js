import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from 'container/update/Products/queries'
import { useEffect, useState } from 'react'

export const useGetProducts = () => {
  const { data, loading } = useQuery(GET_ALL_PRODUCTS)
  const [products, setProducts] = useState(data)
  //  const { setAlertBox } = useContext(Context)
  useEffect(() => {
    setProducts(products)
  }, [data])
  return [data, { loading }]
}