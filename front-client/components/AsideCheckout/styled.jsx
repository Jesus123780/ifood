import styled, { css } from "styled-components";
import { BGColor } from "../../public/colors";
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
    margin: 10px auto;
    box-shadow: 0px 4px 10px #6960604d;    
    border-radius: 2px;
    padding: 20px;
`
export const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`