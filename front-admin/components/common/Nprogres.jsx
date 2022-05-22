import { EColor, PColor } from 'public/colors'
import styled, { css } from 'styled-components'

export const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${PColor};
    height: 5px;
    width: ${props => {return (100 / props.final) * props.progress}}%;
    border-radius: 8px;
    transition: .2s;
    ${props => {return (props.final) <= props.progress && css`background-color: ${EColor};`}}
`