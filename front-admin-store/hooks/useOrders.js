import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { GET_ALL_PEDIDOS } from 'container/PedidosStore/queries'
import { Context } from 'context/Context'
import { numberFormat } from 'utils'

export const useOrders = ({
  refetchWritePolicy = 'merge',
  refetchReadPolicy,
  refetch,
  statusOrder,
  nextFetchPolicy = 'cache-first',
  fetchPolicy = 'cache-and-network',
  pollInterval = 60000,
  onError
}) => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_PEDIDOS, {
    refetchWritePolicy: refetchWritePolicy,
    pollInterval,
    fetchPolicy,
    refetch,
    refetchReadPolicy,
    nextFetchPolicy: nextFetchPolicy,
    onError: onError
      ? onError
      : e => {
          return console.log(e)
        },
    variables: {
      statusOrder: statusOrder
    }
  })
  const { setCountPedido } = useContext(Context)

  const [orders, setOrders] = useState(data)
  useEffect(() => {
    if (data?.getAllPedidoStoreFinal?.length) {
      setOrders(orders)
      setCountPedido(numberFormat(data?.getAllPedidoStoreFinal?.length) || 0)
    } 
  }, [orders, data])
  return [
    data?.getAllPedidoStoreFinal,
    { loading, error, data, fetchMore }
  ]
}
