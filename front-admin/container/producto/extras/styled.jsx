import styled, { css } from 'styled-components'
import { BGColor, EColor, PColor, PLColor, PVColor, BColor } from '../../../public/colors'

export const ContainerListOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: flex;
    padding: 40px 0;
    margin: 102px 0;
    .wrapper-list {
        width: 30%;
        margin: 0 10px;
    }
`
export const WrapperList = styled.div`
    width: 100%;
    cursor: move;
`
export const GarnishChoicesHeader = styled.div`
    padding: 12px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: 60px;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    margin-bottom: 80px;
    .garnish-choices__title { 
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        color: #3f3e3e;
    }
    .garnish-choices__title-desc {
        font-weight: 100;
        font-size: .875rem;
        line-height: 17px;
        display: block;
        color: #717171;
    }
     .marmita-minitag{
        -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans,Helvetica,sans-serif;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    font-size: .5625rem;
    line-height: 1;
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
     }
     .garnish-choices {
            justify-content: space-around;
            display: flex;
            

     }
`
export const CardsComponent = styled.div`
    background-color: ${BGColor};
    padding: 10px;
    margin: 15px 0;
    border-bottom: 1px solid #ccc;
    grid-template-columns: 5fr 10%;
    gap: 20px;
    cursor: move;
    display: grid;
    .title_card{
        word-break: break-word;
        font-family: PFont-Light;
        color: ${BColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
    }
    .price {
        word-break: break-word;
        font-family: PFont-Light;
        color: ${PColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 600;
    }
`
export const ContentModal = styled.form`
    height: ${({ height }) => {return height ? height : '600px'}};
`
export const ContentLinesItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: min-content;
    border-bottom: 1px solid #ccc;
    ${props => {return props.noBorder && `border-bottom: none`}}
`
export const ContentCheckbox = styled.div`
    transition: all .1s;
    color: inherit;
    cursor: pointer;
    outline: none;
    position: relative;
    margin-right: 2px;
`
export const Input = styled.input`
    width: 100%;
    ${props => {return props.margin && css`margin: ${props.margin};`}}
    ${props => {return props.card && css`
    padding: 15px;
    border: 2px solid ${PColor};
    `}}
    ${props => {return props.inputText && css`
        font-weight: 500;
        margin: 0.625rem 0 0;
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => {return color}};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}}
    ${props => {return props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => {return color}};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}}
    ${props => {return props.checkbox && css`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}}
    &:focus {
        border: 2px solid ${PVColor};
        outline: none;
    }
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`
export const Container = styled.div`
    padding: 20px;
    overflow: auto;
    @media only screen and (max-width: 768px) {
        display: none;
        padding: 0;
    }
`
export const Action = styled.div`
    font-size: 16px;
    background: ${BGColor};
    border-top: 2px solid #f5f0eb;
    justify-content: flex-end;
    padding: 20px;
    height: 80px;
    align-items: center;
    z-index: 9999;
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
`

