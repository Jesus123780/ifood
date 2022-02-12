import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { GET_ONE_STORE } from '../../container/Restaurant/queries'
import { GET_ALL_CATEGORIES } from '../../container/Update/Categories/queries'
import { Context } from '../../context/Context'

export const useStore = () => {
    const { data, loading, error } = useQuery(GET_ONE_STORE)
    const [store, setStore] = useState(data)
    useEffect(() => {
        setStore(store)
        if (error) return console.log({ message: `No hay ningún resultado o ${ error }`, duration: 5000 })
    }, [data])
    return [data?.getStore || null, { loading }]
}