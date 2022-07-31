import { GET_ONE_STORE_IN_CATEGORY } from '@/container/categoryStores/queries'
import { useQuery } from '@apollo/client'
import { Context } from 'context'
import { useContext, useEffect, useState } from 'react'

export const useGetCategorieStore = ({ catStoreId }) => {
  const { setAlertBox } = useContext(Context)

  const { data: dataCatSto, loading, error } = useQuery(GET_ONE_STORE_IN_CATEGORY, {
    variables: {
      catStore: catStoreId
    },
    onError: () => {
      setAlertBox({ message: '', duration: 5000 })

    }
  })
  const [categories, setCategorieStore] = useState([])
  useEffect(() => {
    setCategorieStore(dataCatSto?.getOneCatStore || [])
  }, [dataCatSto])
  return [categories, { loading, error }]
}