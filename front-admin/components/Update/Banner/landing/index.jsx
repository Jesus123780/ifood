import React from 'react'
import styled, { css } from 'styled-components'
import { useOnScreen } from '../../../hooks/useIntersection'

// eslint-disable-next-line react/display-name
export default React.memo(
  // eslint-disable-next-line react/prop-types
  ({ type }) => {
    const [ref, isVisible] = useOnScreen()
    return (
      <Container isVisible={isVisible} ref={ref}>
        <div >
          <h1 style={{ fontSize: '30px' }}>{type} {isVisible ? 'visible' : 'not visible'}</h1>
        </div>
      </Container>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.type === nextProps.type
  }
)
const Container = styled.div`
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${ props => {return props.isVisible ? css`background-color: #009aff; ` : css`background-color: blue; `} }
`