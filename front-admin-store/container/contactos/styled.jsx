import { PColor } from 'public/colors'
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    form{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
    }
`
export const Item = styled.div``
export const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`