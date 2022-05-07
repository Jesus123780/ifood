import { APColor, BGColor, PColor, PLColor } from 'public/colors'
import styled, { css } from 'styled-components'
import { animationTop, FadeOutLeftBig } from '../../components/animations'

export const Input = styled.input`
    outline: none;
    padding: 12px;
    width: 100%;
    margin-bottom: 20px;
`
export const ContentCalcules = styled.div`
    position: fixed;
    right: 0;
    bottom: -1px;
    display: flex;
    justify-content: space-between;
    background-color: ${PColor};
    /* width: 40%; */
    padding: 20px;
`
export const ScrollbarProduct = styled.div`
    overflow: hidden auto;
    height: 100%;
    margin: ${({ margin }) => {return margin || '100px 0'}};
    border-top: 2px dashed rgba(166,166,166,.2);
    border-bottom: 2px dashed rgba(166,166,166,.2);
    h2 {
    text-rendering: optimizeLegibility;
    font-family: PFont-Light;
    display: inline;
    color: #3e3e3e;
    margin: 0 0 2px;
    font-weight: 400;
    font-size: 1.9em;
    line-height: 44px;
    text-align: center;
    display: flex;
    justify-content: center;
    }
`
export const OptionButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .free {
        color: ${PColor};
        width: 100px;
        border-radius: 10px;
        background-color: ${BGColor};
        border: 1px solid ${`${PLColor}87`};
    }
    button {
    margin: 10px;
    border: 1px solid ${PLColor};
    padding: 10px;
    border-radius: 20px;
    flex-grow: 1;
    font-size: 15px;
    background-color: transparent;
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    width: max-content;
    position: relative;
    span {
        background-color: ${PColor};
        color:  ${BGColor};
        height: 25px;
        width: 25px;
        padding: 2px;
        font-size: 12px;    
        display: flex;
        place-items: center;
        place-content: center;
        position: absolute;
        top: -10px;
        right: 0;
        border-radius: 50%;
    }
    }
`
export const Button = styled.button`
    background-color: transparent;
    outline: none;
`

export const FlipTop = styled.div`
    position: relative;
    width: max-content;
    &&:hover > ${Button} {
        animation: ${animationTop} .1s linear;
    } 
`
export const Box = styled.div`
    width: ${({ width }) => {return width || '60%'}};
    place-content: center;
    place-items: center;
    ${({ display }) => {return display && css` display: ${display};`}}
    position: relative;
`
export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const ContainerGrid = styled.div`
    display: grid;    
    margin: 0;
    padding-bottom: 20px;
    /* max-width: 1366px!important; */
    margin: auto;
    padding: 0 30px;
    height: 100vh;
@media only screen and (min-width: 768px) and (min-width: 960px)
{
    grid-template-columns: repeat(auto-fill,minmax(275px,1fr));
    grid-gap: 30px;
}
@media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill,minmax(252px,1fr));
    grid-gap: 20px;
}


`
export const CateItem = styled.div`
    cursor: pointer;
    box-shadow: 1px 1px 3px #00000052;
    margin: auto;
    border: 2px solid transparent;
    border-radius: 5px;
    width: 100%;
    height: 150px;

`
export const SliderCategoryProducts = styled.div`
    display: flex;
`
export const Text = styled.span`
    font-weight: ${ ({ fontWeight }) => {return fontWeight ? fontWeight : '700'}};
`
export const Item = styled.div`
    display: flex;
    place-content: space-between;
    padding: 10px 0;
    /* word-break: break-all; */
    place-items: center;
    border-top: 1px solid #00000069;
`
export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
export const Ticket = styled.div`
        width: 155px;
        max-width: 155px;
        /* overflow: hidden; */
        position: relative;
        display: flex;
        place-items: center;
        place-content: center;
        margin: auto;
        font-family: PFont-Light;
        min-width: 155px;
        margin-bottom: 300px;
 
   td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    border-bottom: 20px;
    align-content: center;
}

.ticket {
    width: 155px;
    max-width: 155px;
}

img{ 
        width: 155px;
        max-width: 155px;
        object-fit: cover;
        min-width: 155px;
        width: 100%;
    }
`