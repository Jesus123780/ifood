import { useQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { useEffect, useState } from 'react'

export const useCategoriesProduct = () => {
  const { data, loading, error, networkStatus } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
  const [categories, setCategories] = useState(data)
  useEffect(() => {
    setCategories(data?.catProductsAll)
  }, [categories, data])
  return [data?.catProductsAll, { loading, error, networkStatus }]
}