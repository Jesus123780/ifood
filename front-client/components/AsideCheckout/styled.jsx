import styled, { css } from "styled-components";
import { BGColor, PLVColor } from "../../public/colors";
import { SideIn, SlideInLeft } from "../animations";


export const LateralModal = styled.div`
    width: 380px;
    height: calc(100vh - 80px);
    position: fixed;
    padding: 30px;
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
    padding: 20px 0;
    .footer {
        display: flex;
        justify-content: flex-start;
        height: auto;
        align-items: flex-end;
        position: absolute;
        bottom: 20px;
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
    flex-direction: column;
    .restaurant-cart-header {
        color: #717171;
        font-weight: 300;
        font-size: .875rem;
        width: 100%;
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
    box-sizing: border-box;
    font-weight: 400;
    margin-top: 0;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
`