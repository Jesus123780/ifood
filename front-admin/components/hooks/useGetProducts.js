import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from 'container/update/Products/queries'
import { useEffect, useState } from 'react'

export const useGetProducts = () => {
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
    const [products, setProducts] = useState(data)
  //  const { setAlertBox } = useContext(Context)
    useEffect(() => {
        setProducts(products)
        if (error) return console.log({ message: `No hay ningún resultado o ${ error }`, duration: 5000 })
    }, [data])
    return [data, { loading }]
}