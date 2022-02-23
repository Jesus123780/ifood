import link from 'next/link'
import styled, { css } from 'styled-components'
import { BColor, BGColor, PColor, PLVColor, SFVColor } from '../../../public/colors'

export const Router = styled.div`
    background-color: ${`${SFVColor}69`};
    height: 100vw;
`
export const CtnAnchor = styled(link)`
    box-sizing: border-box;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    height: 42px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: Poppins;
    background-color: transparent;
    align-self: auto;
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid #edf2f932;
`
export const ContainerAside = styled.div`
    transition: 300ms ease;
    background-color: ${BGColor};
    height: min-content;
    margin-bottom: 20px;
    @media (max-width: 768px){ 
        z-index: 999;
        height: 100%;
        width: 80%;
        position: absolute;
        ${ ({ collapsed }) => collapsed
            ? css`
            transform: translate(0px, 0px);
            `
            : css`
            transform: translate(-800px, 0px);
              ` }
    }
`
export const LeftNav = styled.div`
    display: grid;
    grid-template-columns: 30% repeat(auto-fill, 30%);
    position: absolute;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: 999;
    border-radius: 5px;
    // overflow: hidden;
    width: 400px;
    place-content: center;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 80px;
    left: 50px;
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
    width: 100%;
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
    background-color: transparent; 
    &:hover {
        box-shadow: rgb(232 137 137) 0px 0px 0px 2px;
    }
    &:active{
        transform: scale(0.9);
        box-shadow: rgb(210 5 5) 0px 0px 0px 2px;

    }
`
export const Info = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    
    .program_state {
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        width: 90%;
        margin: 10px auto;
        display: flex;
        border: 1px solid ${PLVColor};
    }
    .title_store {
        color: #3e3e3e;
        font-weight: 500;
        font-size: 1.5rem;
        text-align: center;
        line-height: 0.875rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
    .sub_title_store {
        color: #3e3e3e;
        font-weight: 500;
        margin-left: 5px;
        font-size: .9rem;
        line-height: 0.875rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
`
export const ContentOption = styled.div`
    min-height: 150px;
`
export const SubMenuModules = styled.div`
    position: absolute;
    right: -170px;
    background: red;
    color: red;
    z-index: 99;
    top: 0;
    border: 12px solid;
`
export const Anchor = styled.a`
    padding: 0px;
    display: flex;
    font-family: PFont-Regular;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;    
    display: block;
    text-decoration: none;
    // overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2em;
    color: ${BColor};
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 13px;
    &:hover > ${SubMenuModules} {
        display: block;
    }
`

export const OptionButton = styled.a`
    position: absolute;
    bottom: 15px;
    left: 0;
`
export const ButtonActionLink = styled.button`
    background-color: transparent;
    width: 100%;
    text-align: start;
    & > svg {
        margin-right: 10px;
        margin-left: 5px;
    }
    margin-bottom: 5px;
    color: #3e3e3e;
    font-weight: 500;
    font-size: .789rem;
    line-height: 0.875rem;

`
export const AnchorRouter = styled.a`
    &.active {
        color: ${PColor};
        border-left: 2px solid ${PColor};
        & > svg {
            fill: ${PColor} !important;
        }
    }
    & > svg {
        margin-right: 10px;
        margin-left: 5px;
    }
    padding: 10px 3px;
    width: 100%;
    word-break: break-word;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #3e3e3e;
    font-weight: 500;
    font-size: .789rem;
    line-height: 0.875rem;
    border-left: 2px solid transparent;
    margin-bottom: 5px;
    position: relative;
    .count_pedidos {
        background-color: ${PColor};
        color: ${BGColor};
        border-radius: 50%;
        padding: 1px;
        height: 28px;
        font-size: 12px;
        width: 28px;
        align-items: center;
        display: flex;
        place-content: center;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    `

// export const Anchor = styled.a`
//     font-size: 12px;
// `
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px -1rem 0rem 0px rgb(18 38 63 / 3%);
    /* overflow-y: auto; */
    transition: 300ms ease;
    height: 100vw;
`
