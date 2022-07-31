import { useQuery } from '@apollo/client'
import { GET_ALL_STORE_REPORT, GET_ALL_USER_REPORT } from 'gql/Admin'
import { useEffect, useState } from 'react'

export const useUserAdmin = () => {
  const { data, loading, error } = useQuery(GET_ALL_USER_REPORT, {
    context: { clientName: "admin-store" }
  })
  const [user, setUser] = useState(data)
  useEffect(() => {
    if (error) return console.log({ message: `No hay ningún resultado o ${error}`, duration: 5000 })
    setUser(user)
  }, [user, data, error])
  return [data?.getAllUserActives, { loading, error }]
}
