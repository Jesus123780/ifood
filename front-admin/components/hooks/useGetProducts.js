import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS } from '../../container/Update/Products/queries'

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