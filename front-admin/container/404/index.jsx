import { PColor } from 'public/colors'
import React from 'react'
import styled from 'styled-components'

const NotFount = () => {
  return (
    <Container>
      <Span>404</Span>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    place-content: center;
    place-items: center;
    height: 100%;

`
const Span = styled.span`
    font-size: 290px;
    stroke-width: 10px;
    color: ${PColor};
`
NotFount.propTypes = {}

export default NotFount