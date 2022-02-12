import { MainCard } from 'components/common/Reusable/ShadowCard'
import React from 'react'
import styled from 'styled-components'
import { Content, Text } from './styled'

export const DeliveryFood = () => {
  return (
    <MainCard noneShadow={true}  title={'Sobre el domicilio'}>
      <Content>
        {[1, 2, 3, 4].map(x => (
          <MainCard key={x._id} width='24%' >
            <Text align='center' justify='center' size='1.2em' color='#3f3e3e'>Tiempo</Text>
            <Box>
              <CardStatus active={true}>
                <Text size='1.2em' color='#3f3e3e'>0</Text>
                <Text size='1.2em' color='#3f3e3e'>1</Text>
              </CardStatus>
            </Box>
          </MainCard>
        ))}
      </Content>
    </MainCard>
  )
}
const CardStatus = styled.div`
  height: 100px;
  width: 100px;
  place-content: center;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-around;
  align-items: center;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    `