import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const Skeleton = ({ height, width, numberObject }) => {
  return (
    <React.Fragment>
      {Array.from(Array(1).keys(numberObject || 1)).map(value => {
        return (
          <Container
            height={height}
            key={value + 1}
            width={width}
          >
            <div className='card-loader'></div>
          </Container>
        )
      })}
    </React.Fragment>
  )
}

Skeleton.propTypes = {
  height: PropTypes.any,
  numberObject: PropTypes.number,
  width: PropTypes.any
}
const Container = styled.div`
    z-index: 999;
.card-loader {
  background-color: #fff;
  padding: 8px;
  position: relative;
  border-radius: 2px;
  margin-bottom: 0;
  height: ${({ height }) => { height ? height : '150px' }};
  overflow: hidden;
  &:after {
    content: '';
    background-color: #636363;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
  }
  &:before {
    content: '';
    height: 150px;
    display: block;
    background-color: #ededed;
    border-radius: 6px;
    box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
  }


  
}
 

// Loader animation
@keyframes loader-animate{
 0%{
    transform: translate3d(-100%, 0, 0);
  }
 100%{
    transform: translate3d(100%, 0, 0);
  }
}
`