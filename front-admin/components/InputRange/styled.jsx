import { PColor } from 'public/colors'
import styled from 'styled-components'

export const ContainerRange = styled.div`
    position: relative;
    font-size: 12px;
    text-align: center;
    .range__ballon {
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
    }

`
export const Input = styled.input`

width: ${({ width }) => {return width && width}}
`