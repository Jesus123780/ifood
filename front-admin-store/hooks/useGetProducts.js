import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from 'container/update/Products/queries'

export const useGetProducts = () => {
  const { data, loading } = useQuery(GET_ALL_PRODUCTS)
  const [products, setProducts] = useState(data)
  //  const { setAlertBox } = useContext(Context)
  useEffect(() => {
    setProducts(products)
  }, [data, products])
  return [data, { loading }]
}