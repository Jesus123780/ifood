import { MainCard } from 'components/common/Reusable/ShadowCard'
import { PColor, SFVColor } from 'public/colors'
import React from 'react'
import styled from 'styled-components'
import { ContentGrid, Text } from './styled'

export const AlertStatistic = () => {
  return (
    <MainCard title={'Mis clientes dicen'}>
      <ContentGrid>
        {[1, 2, 3, 4].map((x, i) => {return (
          <MainCard
            key={i + 1}
            noneShadow={true}
            width='100%'
          >
            <Box>
              <CircleStatus active={true}>
                <Text color='#3f3e3e' size='1.2em'>0</Text>
              </CircleStatus>
              <Text color='#3f3e3e' size='1.2em'>Pedidos errados</Text>
            </Box>
          </MainCard>
        )})}
      </ContentGrid>
    </MainCard>
  )
}
const CircleStatus = styled.div`
  height: 100px;
  width: 100px;
  border: ${({ active }) => {return active ? `4px solid ${SFVColor}65` : `4px solid ${PColor}`}};
  border-radius: 50%;
  place-content: center;
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    `