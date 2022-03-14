import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Rate } from 'components/Rate'
import { PColor } from 'public/colors'
import { IconShopping } from 'public/icons'
import React, { useEffect, useState } from 'react'
import { Content, MediaValue, Text } from './styled'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_ALL_RATING_START_STORE, GET_ALL_VISITOR_STORE, GET_MIN_PEDIDO } from './queriesStore'

export const LastedStatistic = ({ idStore }) => {
  const [getAllRatingStar, { data: dataStartStore }] = useLazyQuery(GET_ALL_RATING_START_STORE)
  const [getAllVisitorStore, { data: VISITOR }] = useLazyQuery(GET_ALL_VISITOR_STORE)
  const [getMinPrice, { data: dataMinPedido }] = useLazyQuery(GET_MIN_PEDIDO)
  const [stars, setStars] = useState(null)
  useEffect(() => {
    getAllRatingStar()
    getAllVisitorStore()
    getMinPrice()
    let suma = 0
    const avg = dataStartStore?.getAllRatingStar?.map((x, index) => (suma += x.rScore) / (index + 1))
    !!avg && setStars((avg[avg.length - 1])?.toFixed(1))

  }, [dataStartStore, dataMinPedido, VISITOR])
  return (
    <div>
      <div>
        <MainCard title={'Ultimos 90 dias'}>
          <Content>
            <div style={{ width: '30%' }}>
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <MediaValue>{stars}</MediaValue>
                <Rate size={35} rating={stars} onRating={rate => console('rate')} />
              </div>
              <Text size='1.2em' color='#3f3e3e'>Media de calificaciones</Text>
            </div>
            <div style={{ width: '30%' }}>
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <MediaValue>100%</MediaValue>
                <IconShopping size='30px' color={PColor} />
              </div>
              <Text size='1.2em' color='#3f3e3e'>Pedidos entregados</Text>
            </div>
            <div style={{ width: '30%' }}>
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <MediaValue>2</MediaValue>
              </div>
              <Text size='1.2em' color='#3f3e3e'>Pedidos Cancelados</Text>
            </div>
            <div style={{ width: '30%' }}>
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <MediaValue>{!!VISITOR && VISITOR?.getAllVisitorStore?.length || 0}</MediaValue>
              </div>
              <Text size='1.2em' color='#3f3e3e'>Usuario Visitados</Text>
            </div>
          </Content>
        </MainCard>
      </div>
    </div>
  )
}
