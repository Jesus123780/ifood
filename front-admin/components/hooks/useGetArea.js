import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ALL_AREAS } from '../../gql/Areas'

export const useGetAreas = () => {
  const { data, loading } = useQuery(GET_ALL_AREAS)
  const [areas, setAreas] = useState(data)
  //  const { setAlertBox } = useContext(Context)
  useEffect(() => {
    setAreas(areas)
  }, [data])
  return [data, { loading }]
}