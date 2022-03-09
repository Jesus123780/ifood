import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_ALL_PEDIDOS } from './queries'
import { CardPedido, Text } from './styled'
import { Context } from 'context/Context'
import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { ListPedidos } from './ListPedidos'
import Tabs from 'components/Tabs'

const PedidosStore = () => {
  const { data } = useQuery(GET_ALL_PEDIDOS, {
    pollInterval: 60000,
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.log(e),
    onCompleted: (data) => console.log(data)
  })
  const { setAlertBox, setCountPedido, countPedido } = useContext(Context)
  useEffect(() => {
    setCountPedido(data?.getAllPedidoStoreFinal?.length || 0)
  }, [data])

  return (
    <div>
      <Container>
        <LocationName />
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`Pedidos`}>
            <ListPedidos data={data?.getAllPedidoStoreFinal} />
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