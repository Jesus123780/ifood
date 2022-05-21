import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ONE_STORE } from '../../container/Restaurant/queries'

export const useStore = () => {
  const { data, loading } = useQuery(GET_ONE_STORE)
  const [store, setStore] = useState(data)
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setStore(store)
  }, [data, store])
  return [data?.getStore || null, { loading }]
}