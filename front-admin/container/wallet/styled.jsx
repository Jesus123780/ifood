import { PColor, BGColor } from "public/colors"
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${BGColor};
    flex-wrap: wrap;
    /* max-width: 1366px; */
    margin: 0 auto;
    form{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
    }
`
export const Card = styled.div`
    width: ${({ width })=> width ? width : '70%'};
`
export const Item = styled.div``
export const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`