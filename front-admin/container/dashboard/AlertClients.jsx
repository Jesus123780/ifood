import { MainCard } from 'components/common/Reusable/ShadowCard'
import { PColor, SFVColor } from 'public/colors'
import React from 'react'
import styled from 'styled-components'
import { Content, ContentGrid, Text } from './styled'

export const AlertStatistic = () => {
  return (
    <MainCard title={'Mis clientes dicen'}>
      <ContentGrid>
        {[1, 2, 3, 4].map((x, i) => (
          <MainCard key={i + 1} width='100%' noneShadow={true}>
            <Box>
              <CircleStatus active={true}>
                <Text size='1.2em' color='#3f3e3e'>0</Text>
              </CircleStatus>
              <Text size='1.2em' color='#3f3e3e'>Pedidos errados</Text>
            </Box>
          </MainCard>
        ))}
      </ContentGrid>
    </MainCard>
  )
}
const CircleStatus = styled.div`
  height: 100px;
  width: 100px;
  border: ${({ active }) => active ? `4px solid ${SFVColor}65` : `4px solid ${PColor}`};
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