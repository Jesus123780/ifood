import styled, { css } from "styled-components";
import { BGColor, PLVColor } from "../../public/colors";
import { SideIn, SlideInLeft } from "../animations";


export const ActionPay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding-bottom: 38px;
    width: 90%;
    background-color: ${BGColor};
    `
export const ContentTotal = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px; 
    flex-direction: row;

`
export const LateralModal = styled.div`
    width: 380px;
    height: calc(100vh - 80px);
    position: fixed;
    bottom: 0;
    z-index: 900;
    transition: all 350ms cubic-bezier(.32,1.25,.32,1);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    border: 1px solid #d4d7dc;
    border-top: none ;
    background-color: #fff;
    right: 0;
    animation-duration: .3s;
    animation-fill-mode: both;
    border-left: 1px solid #d4d7dc;
    z-index: 1000;
    ${({ show }) => show
        ? css`
                 animation-name: ${SideIn};
                 visibility: visible;
                 opacity: 1;
                 transform: translateY(0);
                 `
        : css`
            animation-name: ${SlideInLeft};
            /* transform: translateY(0); */
            /* visibility: hidden; */
              `}
    `
export const CardProduct = styled.div`
    /* height: 200px; */
    position: relative;
    border-radius: 2px;
    padding: 10px 0;
    .footer {
        display: flex;
        justify-content: flex-start;
        padding: 10px 0;
    }
    .item-line {
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        margin: 25px 0;
        padding: 25px 0;
    }
`
export const Content = styled.div`
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    overflow-y: auto;
    padding: 30px;
    padding-bottom: 250px;

    .restaurant-cart-header {
        color: #717171;
        font-weight: 300;
        font-size: 1.5em;
        width: 100%;
    }
`
export const GarnishChoicesHeader = styled.div`
    padding: 12px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: -30px;
    border-bottom: 1px solid #ccc;
    z-index: 99;
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
export const Text = styled.span`
    font-size: ${({ size }) => size || '1.125rem'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ line }) => line && css`text-decoration:line-through;`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || '#3e3e3e'};
    /* justify-content: ${({ justify }) => justify || 'flex-start'}; */
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
    list-style: none;
    cursor: pointer;
    font-weight: 400;
    margin-top: 0;
    line-height: 1.5rem;
    ${({ bold }) => bold && css`font-weight: ${bold};`}
    overflow: hidden;
    text-overflow: ellipsis;
`