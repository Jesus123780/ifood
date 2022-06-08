import { BColor, BGColor, PColor } from 'public/colors'
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    /* max-width: 1366px; */
    margin: 0 auto;
`
export const CardPedido = styled.div`
    box-shadow: 1px 1px 11px 0px #cccccc29;
    border-radius: 5px;
    border: 1px solid #838388;
    padding: 0.5em;
    margin: 0.5em  0;
    background-color: ${BGColor};
    display: flex;
    justify-content: space-between;
    .button-show-more {
        background-color: transparent;
        color: ${PColor};

    }
`
export const Text = styled.span`
    color: ${BColor};
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    font-size: ${({ size }) => {return size || '1.125rem'}};
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
`