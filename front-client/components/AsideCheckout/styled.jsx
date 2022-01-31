import styled, { css } from "styled-components";
import { BGColor } from "../../public/colors";
import { SideIn, SlideInLeft } from "../animations";

export const    LateralModal = styled.div`
    width: 500px;
    height: calc(100vh - 80px);
    position: fixed;
    padding: 30px;
    bottom: 0;
    z-index: 900;
    backface-visibility: hidden;
    animation-delay: 0;
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
                
                  /* margin: 0; */
                  visibility: hidden;
                  /* opacity: 0; */
              `}
    `