import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from 'container/update/Categories/queries'
import { useEffect, useState } from 'react'

export const useCategories = () => {
  const { data, loading } = useQuery(GET_ALL_CATEGORIES)
  const [categories, setCategories] = useState(data)
  useEffect(() => {
    setCategories(categories)
  }, [categories, data])
  return [data, { loading }]
}