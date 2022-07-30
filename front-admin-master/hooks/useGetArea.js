import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/index'
import { GET_ALL_AREAS } from '../../gql/Areas'

export const useGetAreas = () => {
    const { data, loading, error } = useQuery(GET_ALL_AREAS)
    const [areas, setAreas] = useState(data)
    useEffect(() => {
        setAreas(areas)
        if (error) return console.log({ message: `No hay ningún resultado o ${ error }`, duration: 5000 })
    }, [areas, data, error])
    return [data, { loading }]
}

// query getAllDynamicPassword {
//   getAllDynamicPassword {
//   dPassId
//   id
//   idStore
//   keyPassDynamic
//   deviceName
//   dState
//   DatCre
//   DatMod
//     }
      
//   }