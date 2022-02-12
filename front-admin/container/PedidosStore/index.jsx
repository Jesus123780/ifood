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
  const { data } = useQuery(GET_ALL_PEDIDOS)
  console.log(data)
  const { setAlertBox, setCountPedido, countPedido } = useContext(Context)
  useEffect(() => {
    setCountPedido(data?.getAllPedidoStore?.length || 0)
  }, [data])
  console.log(data)
  return (
    <div>
      <Container>
        {data?.getAllPedidoStore?.map((p) => (
          <CardPedido key={p.pdpId}>
            <div>
              <Text size='1.4em'>{p.productFoodsOne?.pName}</Text>
              <Text size='1.4em'>{p.unidProducts}</Text>
              <Text>{p.unidProducts}</Text>
              <Text>{p.productFoodsOne.ProPrice}</Text>
              <Text>{p.productFoodsOne.ProDescription}</Text>
            </div>
            <div>
              <button className="button-show-more" onClick={() => console.log('first')}>Ver mas detalles</button>

            </div>
          </CardPedido>
        ))}
        <LocationName />
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`Pedidos`}>
            <ListPedidos />
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