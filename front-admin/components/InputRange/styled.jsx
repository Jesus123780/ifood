import { PColor } from 'public/colors'
import styled from 'styled-components'

export const Svg = styled.svg`
  width: 30px;
  height: 30px;
  position: absolute;
`
export const Progress = styled.div`
  border-radius: 50%;
  position: relative;
  background: hsl(0, 0%, 100%);
  &:before {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid hsla(218, 57%, 87%, 1);
    top: 30%;
    left: 50%;
  }
`
export const Circle = styled.circle.attrs(props => {
  return {
    strokeDasharray: `${props.dashValue}px 88px`
  }
})`
    r: 14;
    cx: 15;
    cy: 15;
    stroke: hsla(254, 85%, 55%, 1);
    stroke-width: 2px;
    fill: none;
    transform: rotate(-95deg);
    transform-origin: 50% 50%;
  `

export const ContainerRange = styled.div`
  position: relative;
    
    /* position: relative;
    font-size: 12px;
    text-align: center; */
    /* .range__ballon {
        position: relative;
        width: 50px;
        height: 50px;
        background: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        border: 2px solid ${PColor};
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        transform-origin: center center;
        max-width: 230px;
    }
    .range__ballon__label {
        color: ${PColor};
        font-size: 10px;

    } 
    .range__ballon__value {
        color:${PColor};
    } */

`
const height = '36px'
const thumbHeight = 31
const trackHeight = '10px'

// colors
const upperColor = '#edf5f9'
const lowerColor = PColor
const thumbColor = '#ddd'
const thumbHoverColor = '#ccc'
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`

const makeLongShadow = (color, size) => {
  let i = 18
  let shadow = `${i}px 0 0 ${size} ${color}`

  for (; i < 706; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`
  }

  return shadow
}
export const Input = styled.input`
  overflow: hidden;
  display: block;
  appearance: none;
  max-width: 700px;
  width: 100%;
  margin: 0;
  height: ${height};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    border-radius: 10px;
    background: ${lowerBackground};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${thumbHeight}px;
    width: ${thumbHeight}px;
    background: ${thumbColor};
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${makeLongShadow(upperColor, '-10px')};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;

    height: ${height};
    background: ${upperBackground};
  }

  &::-moz-range-progress {

    background: ${lowerBackground};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${thumbColor};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${height};
    border: 0;

    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${lowerBackground};


  }

  &::-ms-fill-upper {
    background: ${upperBackground};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${thumbHeight};

    width: ${thumbHeight};
    background: ${thumbColor};
    border-radius: 100%;
    border: 0;

    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-moz-range-thumb {
      background-color: ${thumbHoverColor};
    }
    &::-ms-thumb {
      background-color: ${thumbHoverColor};
    }
}
&::-webkit-slider-thumb {
    border-radius: 50% !important;
    border: 2px solid hsl(0, 0%, 100%);
  }
width: ${({ width }) => { return width ? width : '100%' }}

`

