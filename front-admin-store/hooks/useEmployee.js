import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_EMPLOYEES } from '~/container/employees/queries'

export const useEmployee = () => {
  const [clientes, setClients] = useState(data)
  const [more, setMore] = useState(100)
  const { data, loading, error, fetchMore } = useQuery(GET_EMPLOYEES)
  useEffect(() => {
    setClients(clientes)
  }, [clientes, data])
  return [data?.employees, { loading, error, fetchMore, setMore, more }]
}
