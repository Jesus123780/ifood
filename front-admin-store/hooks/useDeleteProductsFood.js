import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { useEffect, useState } from 'react'

export const useDeleteProductsFood = ({ search = null, pState, gender, desc, categories }) => {
  const [productsFood, setProductsFood] = useState([])
  const [showMore, setShowMore] = useState(0)
  const { data, loading, fetchMore, error } = useQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: 'network-only',
    variables:
    {
      pState: pState || 0,
      search: search ?? search,
      gender: gender || [],
      desc: desc || [],
      categories: categories || []
    }
  })
  useEffect(() => {
    setProductsFood(data?.productFoodsAll || [])
  }, [data, productsFood])
  return [productsFood, { loading, fetchMore, error, setShowMore, showMore }]
}