import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { GET_ALL_CATEGORIES } from '../../container/Update/Categories/queries'
import { Context } from '../../context'

export const useCategories = () => {
    const { data, loading, error } = useQuery(GET_ALL_CATEGORIES)
    const [categories, setCategories] = useState(data)
    // const { setAlertBox } = useContext(Context)
    useEffect(() => {
        setCategories(categories)
        if (error) return console.log({ message: `No hay ningún resultado o ${ error }`, duration: 5000 })
    }, [data])
    return [data, { loading }]
}