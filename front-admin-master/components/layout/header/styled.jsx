import { BColor, BGColor, PColor } from "public/colors";
import styled, { css } from "styled-components";

export const ActionContent = styled.div`
        width: min-content;
    display: flex;
`
export const Button = styled.button`
 background-color: transparent;
    padding: 20px;
    cursor: pointer;
    align-items: center;
    display: flex;
`
export const ContainerHeader = styled.div`
    width: 100%;
    position: fixed;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 61px;
    box-shadow: rgb(230 235 241) 0px 1px 0px 0px;
    background: white;
    z-index: 1000;
`

export const CtnSwitch = styled.div`
    position: relative;
`
export const SwitchOption = styled.div`
    /* display: grid; */
    /* grid-template-columns: 100% repeat(auto-fill, 100%); */
    position: absolute;
    padding:10px;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: 999;
    border-radius: 5px;
    width: 200px;
    place-content: center;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 32px;
    left: -104px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }
    ${({ show }) => show
        ? css`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `
        : css`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `}
`
export const ButtonGlobalCreate = styled.button`
    border-radius: 20px;
    position: relative;
    min-width: 100px;
    /* width: 100%; */
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: 2px solid ${PColor};
    color: ${BColor};
    height: 30px;
    font-size: 12px;
    cursor: pointer;
    margin: 10px auto;
    transition: 0.2s;
    margin-left: 70px;
    background-color: transparent; 
    &:hover {
        box-shadow: rgb(232 137 137) 0px 0px 0px 2px;
    }
    &:active{
        transform: scale(0.9);
        box-shadow: rgb(210 5 5) 0px 0px 0px 2px;

    }
`