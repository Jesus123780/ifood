import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const animation = keyframes`
	0% {
		-webkit-transform: scale(0.1);
		opacity: 1;
	}
	50% {
		-webkit-transform: scale(1);
		opacity: 0.5;
	}
	100% {
		-webkit-transform: scale(1.5);
		opacity: 0.1;
	}
`
const commonStyle = {
  margin: 'auto',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}
const sizeContainer = {
  small: '24px',
  default: '30px',
  large: '42px'
}
const borderRadiusContainerSize = {
  small: '12px',
  default: '15px',
  large: '18px'
}

const Container = styled.div`
    height: ${ props => {return sizeContainer[props.size] || sizeContainer['default']} };
    width: ${ props => {return sizeContainer[props.size]|| sizeContainer['default']} };
    border-radius:${ props => {return borderRadiusContainerSize[props.size] || borderRadiusContainerSize['default']} };
    background:  ${ props => {return props.color || '#00adb5'} };
    animation: ${ animation }  ${ props => {return props.speed || 2} }s linear infinite;
    `
export const LoadingBabel = ({ style = commonStyle, speed, color, size = 'default' }) => {
  return (
    <Container {...{ style, speed, color, size }} />
  )
}

LoadingBabel.propTypes = {
  style: PropTypes.object,
  speed: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string
}