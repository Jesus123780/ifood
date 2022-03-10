import styled, { css } from 'styled-components';
import { BGColor, PColor } from '../../../public/colors';

export const Button = styled.button` 
    position: absolute;
    z-index: 9999;
`
export const FormProducts = styled.form`
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
    }
`

export const Container = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.InvColor};
    transition:  6s ease;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0,0,0,.1);
`
export const Card = styled.div` 
    position: relative;
    width: ${props => props.state ? '100%' : '70%'};
    background-color: ${({ theme }) => theme.InvColor};

`
export const ContainerButton = styled.div` 
    display: flex;
    justify-content: space-between;
`

export const Content = styled.div` 
    margin: 10px 0px;
`
export const Label = styled.span` 
    outline: none;
    font-size: 17px;
    width: 100%;
    margin: 20px 5px;
    font-family: PFont-Light;
`
// Styled Product
export const ContainerCardProduct = styled.div` 
    display: flex;
    max-width: 1366px !important;
    margin: auto;
    margin: 50px 0px;
    display: grid;
    overflow: hidden;
    gap: 5px;
    grid-template-columns: 24% repeat(auto-fill, 24%) 24%;
    @media only screen and (max-width: 960px){
        grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    }
    @media only screen and (max-width: 760px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    ${props => props.grid && css`
    width: 100%;
    grid-template-columns: 100% repeat(auto-fill, 100%) 100%; 
      @media only screen and (max-width: 760px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    ` }

`
export const ContentProducts = styled.div` 
    max-width: 1366px !important;
    margin: auto;
    margin-top: 50px;
    @media only screen and (max-width: 960px){
    }
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    opacity: 0;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    top: ${({ top }) => top ? top : '20px'};
    transition-delay: ${({ delay }) => delay ? delay : 'auto'};
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => props.grid && css`
        top: ${({ top }) => top ? top : '80px'};
        `
    }
`
export const CardProduct = styled.div` 
    flex: 0 1 auto;
    display: flex;
    position: relative;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    margin: 10px;
    border-radius: 8px;
    background-color: #FFFFFF;
    border: 1px solid rgba(0,0,0,.1);
    height: 450px;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    ${props => props.grid && css`
    height: min-content;
    flex-direction: row;

` }
`
export const CardInput = styled.div`
    margin-bottom: 10px;
    display:flex;
    align-items: center;
`
export const CardCheckBox = styled.input`
    height: 20px;
    width: 20px;
    zoom: normal !important;
    transform: none !important;
    &#cat {
        opacity: 1;
    }
`
export const CardRadioLabel = styled.label`
    margin-left: 8px;
    color: ${({ theme }) => theme.SFSColor};
`
export const Footer = styled.div`
    position: fixed;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    background-color: ${BGColor};
`
export const ContentImg = styled.div` 
    width: 100%;
    height: 70%;
    min-height: 70%;
    max-height: 70%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 8px 8px 0px 0px;
    /* background-color: #ededed; */
    border-bottom: 1px solid #eaeaea;
    ${props => props.grid && css`
    border-bottom: none;
    width: max-content;

` }
`
export const Img = styled.img` 
    height: 100%;
    min-height: 150px;
    max-height: 150px;
    width: 100%;
    object-fit: contain;
    display: block;
`
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    position: relative;
    ${props => props.direction && css`
    padding: 0;
    flex-direction: row;
    display: flex;

    ` }
`
export const Title = styled.h2` 
    font-size: 14px;
    font-family: PFont-Light;
    line-height: 1.18;
    word-break: break-word;
`
export const ContentIconFav = styled.div` 
    position: absolute;
    cursor: pointer;
    top: -30px;
    box-shadow: 0px 0px 6px 0px #16101028;
    right: 20px;
    width: 50px;;
    height: 50px;
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    ${props => props.grid && css`
        top: 20px;

` }

`
export const Text = styled.h3` 
    font-size: ${({ size }) => size ? size : '15px'};
    width: 100%;
    margin: 5px 0px;
    font-weight: 400;
    font-family: PFont-Light;
    word-break: break-word;
`
export const ContainerFilter = styled.div` 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
export const ItemFilter = styled.button` 
    display: flex;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    height: 32px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 20px;
    padding: 7px 14px;
    color: #717171;
    font-size: 0.875rem;
    cursor: pointer;
    min-width: 5.375rem;
    font-family: PFont-Light;
`
export const ContainerBurger = styled.div`
   margin: 0 10px 0 auto;
    width: min-content; 
    .BurgerMenu__container {
    display: flex;
    margin: 0 10px 0 auto;
    width: min-content;
    align-items: center;
 
    flex-direction: column;    
    span {
      background-color: ${PColor};
      width: 30px;
      height: 1.5px;
      margin: 4px;
      border-radius: 1px;
      transition: all .3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px) translateX(9px);
    }
}`
export const ContainerActions = styled.div`
    display: flex;
    align-items: center;
    width: 30%;
    
`
export const OnlyMovil = styled.div`
    display: flex;
    margin: auto;
    width: min-content;
    @media only screen and (min-width: 768px){
        display: none;
    }
`
export const ReadMore = styled.button`
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.BGAColor};
    justify-content: center;
    align-self: center;
    display: flex;
    border: none;
    outline: none;
    user-select: none;
    margin: 30px 0px;
    background-color: #09e5ab;
    padding: 5px 5px;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    text-align: center;
    width: 200px;
`

export const CardOne = styled(Card)` 
    ${props => props.state ? css`width: 0%` : css`width: 30%;`}
    transition:  .6s ease;
`