import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { GET_ALL_AREAS } from '../../gql/Areas'

export const useGetAreas = () => {
    const { data, loading, error } = useQuery(GET_ALL_AREAS)
    const [areas, setAreas] = useState(data)
  //  const { setAlertBox } = useContext(Context)
    useEffect(() => {
        setAreas(areas)
        if (error) return console.log({ message: `No hay ningún resultado o ${ error }`, duration: 5000 })
    }, [data])
    return [data, { loading }]
}