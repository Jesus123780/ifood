import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_ONE_STORE } from '../../container/Restaurant/queries'

export const useStore = () => {
  const [store, setStore] = useState({})
  const { loading, error } = useQuery(GET_ONE_STORE, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      const { getStore } = res || {}
      setStore(getStore)
    },
    onError: (err) => { 
      // eslint-disable-next-line
      console.log(err)
    }
  })
  return [store, { loading, error }]
}