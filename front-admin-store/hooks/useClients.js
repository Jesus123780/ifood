import { useQuery } from '@apollo/client'
import { GET_ALL_CLIENTS } from 'container/clients/queries'
import { useEffect, useState } from 'react'

export const useGetClients = () => {
  const { data, loading, error } = useQuery(GET_ALL_CLIENTS)
  const [clientes, setClients] = useState(data)
  useEffect(() => {
    setClients(clientes)
  }, [clientes, data])
  return [data?.getAllClients, { loading, error }]
}
