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
    height: 200px;
    width: 90%;
    position: relative;
    margin: 10px auto;
    box-shadow: 0px 4px 10px #6960604d;    
    border-radius: 2px;
    padding: 20px;
    .footer {
        display: flex;
        justify-content: flex-start;
        height: auto;
        align-items: flex-end;
        position: absolute;
        bottom: 20px;
    }
`
export const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
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