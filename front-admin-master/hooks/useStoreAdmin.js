import { useQuery } from '@apollo/client'
import { GET_ALL_STORE_REPORT } from 'gql/Admin'
import { useEffect, useState } from 'react'

export const useStoreAdmin = () => {
  const { data, loading, error } = useQuery(GET_ALL_STORE_REPORT, {
    context: { clientName: "admin-store" }
  })
  const [stores, setStore] = useState(data)
  useEffect(() => {
    setStore(stores)
    if (error) return console.log({ message: `No hay ningún resultado o ${error}`, duration: 5000 })
  }, [stores, data, error])
  return [data?.getAllStoreAdminReport, { loading }]
}