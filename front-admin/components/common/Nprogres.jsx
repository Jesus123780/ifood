import { EColor, PColor } from 'public/colors'
import styled, { css, keyframes } from 'styled-components'

export const width = keyframes`
 0% { width: 0%; }
 50% { width: 40%; }
  100% { width: 100%; }
`
export const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${PColor};
    height: 5px;
    /* width: ${props => {return (100 / props.final) * props.progress}}%; */
    transition: .2s;
    ${props => {return props.progress && css`
    animation: ${width} .5s .1s ease forwards;
    
    `}}

    ${props => {return (props.final) <= props.progress && css`background-color: ${EColor};`}}
`