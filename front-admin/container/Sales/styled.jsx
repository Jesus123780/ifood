import { BGColor, PColor } from 'public/colors'
import styled from 'styled-components'
import { animationTop } from '../../components/animations'

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
    padding: 8.6px;
    display: flex;
    width: 40.7%;
    border-radius: 4px;
    justify-content: space-between;
    background-color: ${PColor};
`
export const ScrollbarProduct = styled.div`
    overflow: hidden auto;
    height: 100%;
    border-left: 1px solid #e9ecef;
    margin: ${({ margin }) => {return margin || '100px 0'}};
    h2 {
    text-rendering: optimizeLegibility;
    font-family: PFont-Light;
    display: inline;
    color: #3e3e3e;
    margin: 0 0 2px;
    font-weight: 400;
    font-size: 1.9em;
    text-align: center;
    display: flex;
    justify-content: center;
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
export const Warper = styled.div`
    flex-wrap: wrap;
    display: flex;
`
export const CtnSwiper = styled.div`
    height: min-content;    
    background-color: ${BGColor};
    box-shadow: inset 0 -1px 0 #dcdcdc;

`
export const Box = styled.div`
    width: ${({ width }) => {return width || '60%'}};
    place-content: center;
    place-items: center;
    display: ${({ display }) => {return display}};
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
    grid-template-columns: repeat(auto-fill,minmax(175px,1fr));
    grid-gap: 30px;
}
@media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill,minmax(172px,1fr));
    grid-gap: 20px;
}


`
export const CateItem = styled.div`
    line-height: 1.15;
    font-family: 'PFont-Regular';
    box-sizing: border-box;
    text-align: center;
    column-gap: 12px;
    align-items: center;
    position: relative;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding: 8px 12px;
    border-radius: 200px;
    transition: background-color .3s ease-in-out;
    background-color: #f7f7f7;
    text-rendering: optimizeLegibility;
    cursor: pointer;
    color: #717171;
    word-break: break-word;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    place-content: space-around;
    align-items: center;
    min-width: 100px;
    max-width: 250px;
    min-height: 50px;
    max-height: 50px;
    user-select: none;
    display: flex;
    place-content: space-between;
    .icon {
        min-width: 20%;
        max-width: 20%;
        min-height: 20%;
        max-height: 20%;
    }
   

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