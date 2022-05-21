import styled, { css } from 'styled-components'
import { BColor, BGColor, PColor, PLColor } from '../../../public/colors'

export const Button = styled.button` 
    position: absolute;
    z-index: 9999;
`
export const FormProducts = styled.form`
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(400px,1fr));
    grid-gap: 20px;

`
export const Card = styled.div` 
    position: relative;
    width: ${props => {return props.state ? '100%' : '70%'}};
    background-color: ${({ theme }) => {return theme.InvColor}};

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
export const WrapperProducts = styled.div`
    display: flex;
`
export const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    display: grid;
    font-family: PFont-Light;
    place-content: center;
    .btn {
        background-color: transparent;
    }
    & span {
        color: ${({ color }) => {return color || PLColor}};
    }
`
export const ContainerCardProduct = styled.div` 
    max-width: 1366px !important;
    margin: auto;
    margin: 50px 0px;
    place-content: center;
    display: grid;
    gap: 5px;
    grid-template-columns: 24% repeat(auto-fill, 24%) 24%;
    @media only screen and (max-width: 960px){
        grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    }
    @media only screen and (max-width: 760px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    ${props => {return props.grid && css`
    width: 100%;
    grid-template-columns: 100% repeat(auto-fill, 100%) 100%; 
      @media only screen and (max-width: 760px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    `} }

`
export const ContentProducts = styled.div` 
    max-width: 1366px !important;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
    @media only screen and (max-width: 960px){
    }
   
`
export const Grid = styled.div`
    display: grid;
    width: ${({ width }) => {return width ? width : '100%'}};
    height: ${({ height }) => {return height ? height : 'auto'}};
    grid-template-columns: repeat(${({ gridColumns }) => {return gridColumns ? gridColumns : 1}}, 1fr);
    grid-template-rows: repeat(${({ gridRows }) => {return gridRows ? gridRows : 1}}, 1fr);
    grid-column-gap: ${({ gridColGap }) => {return gridColGap ? gridColGap : '5px'}};
    grid-row-gap: ${({ gridRowsGap }) => {return gridRowsGap ? gridRowsGap : '5px'}};
    padding: 10px;

    @media (max-width: 600px) {
        grid-template-columns: repeat(${({ gridColsMd }) => {return gridColsMd ? gridColsMd : 1}}, 1fr);
        padding: 6px;
    }
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    color: ${BColor};
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
    z-index: 999; 
    top: ${({ top }) => {return top ? top : '20px'}};
    transition-delay: ${({ delay }) => {return delay ? delay : 'auto'}};
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
    ${props => {return props.grid && css`
        top: ${({ top }) => {return top ? top : '80px'}};
        `}
}
`
export const DragulaContainer = styled.div`
    min-height: 100%;
    border: 1px solid rgba(0,0,0,.1);
    margin: 20px 0;
`
export const CardProduct = styled.div` 
    flex: 0 1 auto;
    display: flex;
    position: relative;
    width: ${({ width }) => {return width ? width : '100%'}};
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
    ${props => {return props.grid && css`
    flex-direction: row;

`} }
`
export const CardInput = styled.div`
    margin-bottom: 10px;
    display:flex;
    align-items: center;
`
export const CardCheckBox = styled.input`
    height: 20px;
    width: 20px;
    &#cat {
        opacity: 1;
    }
`
export const CardRadioLabel = styled.label`
    margin-left: 8px;
    color: ${({ theme }) => {return theme.SFSColor}};
`
export const Footer = styled.div`
    /* position: fixed;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    bottom: 0;
    z-index: 99900;
    display: flex;
    justify-content: space-between;
    background-color: ${BGColor}; */
    @media (max-width: 960px){
        /* bottom: 0px; */
        
    }
`
export const ContentImg = styled.div` 
    width: 100%;
    height: 70%;
    min-height: 70%;
    max-height: 70%;
    object-fit: cover;
    cursor: pointer;
    position: relative;
    border-radius: 8px 8px 0px 0px;
    /* background-color: #ededed; */
    border-bottom: 1px solid #eaeaea;
    ${props => {return props.grid && css`
    border-bottom: none;
    /* width: max-content; */



`} }
`
export const Img = styled.img` 
    width: 100%;
    object-fit: scale-down;
    height: 100%;
    display: block;
`
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    position: relative;
   /*  ${props => {return props.direction && css`
    padding: 0;
    flex-direction: row;
    display: flex;

    `} } */
`
export const Title = styled.h2` 
    font-size: 14px;
    font-family: PFont-Light;
    line-height: 1.18;
    word-break: break-word;
`
export const ContentIconFav = styled.button` 
    position: absolute;
    cursor: pointer;
    z-index: 9999;
    top: -30px;
    /* 20px */
    box-shadow: 0px 0px 6px 0px #16101028;
    right: ${({ right }) => {return right ? right : '20px'}};
    width: 50px;;
    height: 50px;
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    ${props => {return props.grid && css`
        top: 20px;

`} }

`
export const Text = styled.h3` 
    font-size: ${({ size }) => {return size ? size : '15px'}};
    color: ${({ color }) => {return color || BColor}};
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
    .BurgerMenu__container {
    display: flex;
    align-items: center;
    flex-direction: column;    
    span {
      background-color: ${PColor};
      width: 30px;
      height: 2px;
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
export const ReadMore = styled.button`
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => {return theme.BGAColor}};
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

export const LateralModal = styled.div`
    width: 400px;
    height: 100vh;
    background-color: ${`${BGColor}`};
    position: fixed;
    top: 0;
    color: ${BGColor};
    right: 0;
    padding: 30px;
    z-index: 9999;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    transition: 300ms ease;
    ${({ open }) => {return open && css`
    right: -100%;

    `}}


`
export const CardOne = styled(Card)` 
    ${props => {return props.state ? css`width: 0%` : css`width: 30%;`}}
    transition:  .6s ease;
`
