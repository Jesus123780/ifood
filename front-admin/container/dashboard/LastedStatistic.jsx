import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Rate } from 'components/Rate'
import { PColor } from 'public/colors'
import { IconShopping } from 'public/icons'
import React from 'react'
import { Content, MediaValue, Text } from './styled'

export const LastedStatistic = () => {
  return (
    <div>

      <div>
        <MainCard title={'Ultimos 90 dias'}>
          <Content>
            <div style={{ width: '30%' }}>
              <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <MediaValue>4.5</MediaValue>
                <Rate size={35} rating={4.5} onRating={rate => console('rate')} />
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
          </Content>
        </MainCard>
      </div>
    </div>
  )
}
