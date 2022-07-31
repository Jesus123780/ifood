import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { useEffect, useState } from 'react'

export const useGetProductsFood = ({ fetchPolicy = 'network-only', search = null, pState, gender, desc, categories, toDate, fromDate, min, max = 50 }) => {
  const [productsFood, setProductsFood] = useState([])
  const [showMore, setShowMore] = useState(50)
  const { data, loading, fetchMore, error } = useQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: fetchPolicy,
    variables:
    {
      pState: pState || 0,
      search: search ?? search,
      gender: gender || [],
      desc: desc || [],
      categories: categories || [],
      toDate: toDate || null,
      fromDate: fromDate || null,
      max: max || null,
      min: min || null
    }
  })
  useEffect(() => {
    setProductsFood(data?.productFoodsAll || [])
  }, [data, productsFood])
  return [productsFood, { loading, fetchMore, error, setShowMore, showMore }]
}