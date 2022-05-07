import { MainCard } from 'components/common/Reusable/ShadowCard'
import React from 'react'
import styled from 'styled-components'
import { Content, ContentGrid, Text } from './styled'

export const DeliveryFood = () => {
  return (
    <MainCard noneShadow={true} title={'Sobre el domicilio'}>
      <ContentGrid>
        {[1, 2, 3, 4].map((x, i) => {return (
          <MainCard key={i + 1} width='100%' >
            <Box>
              <Text
                align='center'
                color='#3f3e3e'
                justify='center'
                size='1.2em'
              >Tiempo</Text>
              <CardStatus active={true}>
                <Text color='#3f3e3e' size='1.2em'>0</Text>
                <Text color='#3f3e3e' size='1.2em'>1</Text>
              </CardStatus>
            </Box>
          </MainCard>
        )})}
      </ContentGrid>
    </MainCard>
  )
}
const CardStatus = styled.div`
  height: 100px;
  place-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 30px; */
`
const Box = styled.div`
  padding: 30px;

    `