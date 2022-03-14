import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { GET_ALL_PEDIDOS } from './queries'
import { CardPedido, Text } from './styled'
import { Context } from 'context/Context'
import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { ListPedidos } from './ListPedidos'
import Tabs from 'components/Tabs'

const PedidosStore = () => {
  const [more, setMore] = useState(100)
  const [getAllPedidoStoreFinal, { data, fetchMore }] = useLazyQuery(GET_ALL_PEDIDOS, {
    notifyOnNetworkStatusChange: true,
    refetchWritePolicy: 'merge',
    pollInterval: 60000,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onError: (e) => console.log(e),
    onCompleted: (data) => console.log(data)
  })
  const { setAlertBox, setCountPedido, countPedido } = useContext(Context)
  useEffect(() => {
    setCountPedido(data?.getAllPedidoStoreFinal?.length || 0)
    getAllPedidoStoreFinal()
  }, [data])

  return (
    <div>
      <Container>
        <LocationName />
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`Pedidos`}>
            <ListPedidos setMore={setMore} more={more} data={data?.getAllPedidoStoreFinal} fetchMore={fetchMore} />
          </Tabs.Panel>
          <Tabs.Panel label={``}>

          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  )
}

PedidosStore.propTypes = {}

export default PedidosStore