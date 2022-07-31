import styled, { css } from "styled-components";
import { FadeDown } from "../../components/animations";
import { BColor, BGColor, EColor, PColor, SECBGColor } from "../../public/colors";
import Link from 'next/link'

export const Body = styled.div`
    line-height: 1.15;
    margin: 0;
    font-family: SulSans,Helvetica,sans-serif;
    overflow-x: hidden;
    font-size: 16px;
    height: 100%;
    height: 100vh;
    scroll-behavior: auto;
`
export const Acquisition = styled.div`
    display: grid;
    grid-gap: 33px;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    max-width: 1366px!important;
    margin: auto;
    padding: 0 30px;
    margin-top: 28px;
    position: relative;
    padding-bottom: 32px;
`
export const BoxLi = styled.div`
display: grid;
.landing-acquisition__card-img {
    font-size: 16px;
    list-style: none;
    transition: transform .2s ease, -webkit-transform .2s ease,-moz-transform .2s ease;
    cursor: pointer;
    width: 100%;
    height: 172px;
    background-color: #ffe8e8;
    object-fit: contain;
    border-radius: 4px;
}
.landing-acquisition__card-img:hover {
    transform: scale(1.02);
}
.landing-acquisition__card-title {
    list-style: none;
    cursor: pointer;
    margin-top: 22px;
    color: #3e3e3e;
    line-height: 1.5625rem;
    font-size: 1.125rem;
}
.landing-acquisition__card-subtitle {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    margin-top: 5px;
    color: #a6a6a5;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.25rem;
}
`
export const Section = styled.section`
    width: 100%;
    max-width: 1366px!important;
    
    padding: 0 30px;
    margin: 100px auto;
`
export const ContentHeader = styled.div`
    background-color: #f5f3f4;
    height: 60vh;
`
export const Header = styled.header`

    line-height: 1.15;
    font-size: 16px;
    box-sizing: border-box;
    display: grid;
    justify-items: center;
    /* background-color: #f5f3f4; */
    position: relative;
    nav {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5,auto);
        grid-template-rows: 50px;
        grid-column-gap: 44px;
        padding: 16px 0 0;
        position: relative;
        top: unset;
        justify-content: right;
        left: unset;
        padding: 0 30px;
        margin: 10px 5px;
    }
    
`
export const ContainerBtn = styled.div`
    position: relative;
`
export const Anchor = styled.a`
    text-decoration: none;
    border: none;
    border-radius: 4px;
    transition: .1s;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: ${({ BgColor }) => BgColor ? '#fff' : 'transparent'};
    color: ${({ color }) => color ? BColor : PColor} ;
    font-size: 1rem;
    line-height: 1.25em;
    padding: 0;
    font-weight: 400;
    margin: 0;
    width: 150px;
    justify-content: center;
    height: 50px;
    display: grid;
   
    &&:hover{
        ${props => props.hover ? css`
            color: ${PColor};
            
            ` : css`
            color: ${BGColor};
            background-color:${PColor};
            
        `}
    }
    
`
export const BtnNav = styled(Link)`

    `
export const Box = styled.div`
    width: 300px;
    height: 150px;
    position: absolute;
    line-height: 1.15;
    font-family: SulSans,Helvetica,sans-serif;
    font-size: 16px;
    background-color: ${BGColor};
    border: 1px solid ${SECBGColor};
    box-shadow: 0 4px 8px rgba(0,0,0,.1);
    border-radius: 4px;
    padding: 20px;
    max-width: 433px;
    margin: 0;
    display: flex;
    bottom: -180px;
    left: -80px;
    right: 0;
    animation: ${FadeDown} 1.2s ease-in;
    grid-template-columns: 54px auto 15px;
    padding: 20px;
    grid-column-gap: 20px;
    margin: 0;
    display: ${({ close }) => close ? 'none' : 'grid'} ;
    grid-column: 3;
    justify-self: end;
    .landing-sign-up-voucher__texts__description{
        font-family: SulSans,Helvetica,sans-serif;
        box-sizing: border-box;
        font-size: 1rem;
        line-height: 1rem;
        color: #717171;
        font-weight: 400;
        padding-bottom: 13px;
        margin: 0;
    }
    .btn-btn-primary{
        font-size: 100%;
        line-height: 1.15;
        text-transform: none;
        text-decoration: none;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        transition: .1s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        background: transparent;
        color: #ea1d2c;
        padding: 0;
        margin: 0;
        height: 20px;
    }
    .landing-sign-up-voucher__texts__title {
        font-family: SulSans,Helvetica,sans-serif;
        box-sizing: border-box;
        font-size: 1.1em;
        font-weight: 900;
        line-height: 1.25rem;
        color: ${BColor};
        font-weight: 500;
        padding-bottom: 4px;
    }
    .btn-btn-sec {
        background-color: transparent;
        height: min-content;
    }
    `
export const BoxJr = styled.div`

        
    `
export const Text = styled.h2`
    font-size: 1rem;
    font-family: SulSans,Helvetica,sans-serif;
    
    `
export const ScrollbarContainer = styled.div`
    height: 100%;
    margin-top: 50px;
    width: 100%;
    border-radius: 5px;

    overflow: hidden;
    display: inline-flex;
    .BtnTarget {
        line-height: 1.15;
        font-size: 16px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: .1s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        color: #717171;
        height: 30px;
        background: none;
        border: 1px solid #dcdcdc;
        padding: 6px;
        margin: 10px;
    }
    .BtnTarget:hover{
        border: 1px solid ${EColor};
        color: ${BGColor};
        background-color: ${PColor};
    }
`
export const ButtonSearch = styled.button`
    font-size: 100%;
    line-height: 1.15;
    padding: 0 20px;
    border: none;
    border-radius: 4px;
    transition: .1s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #ea1d2c;
    color: #fff;
    height: 100%;
    margin: 0 30px;
    font-weight: 500;
    width: 168px;
`
export const ContentInputSearch = styled.div`
    display: flex;
    background: #fff;
    padding: 14px 0 14px 14px;
    width: 100%;
    margin: 0;
    font-weight: 300;
    -webkit-box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
    box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
    input {
        outline: none;
        border: none;
        padding: 0 20px; 
    }
`
export const HeaderContent = styled.div`
    justify-content:center;
    place-content: center;
    text-align: center;
    display: grid;
    .grid-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
    }
    .flex-center {
        display: flex;
        justify-content: center;
    }
    & > svg {
        display: flex;
        place-content: center;
    }
    h1 {
    font-family:  PFont-Bold;
    color: #3e3e3e;
    font-weight: 500;
    margin: 15px 10px;
        padding: 15px 10px;
    text-align: center;
    letter-spacing: normal;
    line-height: 2.5rem;
    font-size: 2.5rem;
    }
    strong {
        color: ${PColor};
    }
    h3 {
        font-family: PFont-Light;
        color: #3e3e3e;
        text-align: center;
        font-weight: 400;
        margin: 15px 10px;
        padding: 15px 10px;
        line-height: 1.5625rem;
        font-size: 1.25rem;
    }
    .ContentSearch {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    

`
export const ContentImgs= styled.div`
    display: flex;

    .contentimg {
        background-image: url("/images/company-finance.jpg");
        /* background-image: url(${({  })}); */
        background-size: cover;
        background-repeat: no-repeat;
        width: 33%;
        border-radius:  3px;
        height: 200px;
        margin: 30px;
        padding: 10px;

    } 
    .contentimg:hover {
    background-position: scale(1);
    transition: transform .2s ease-in-out;
    }
    .contentimg:nth-child(2){
        background-image: url("/images/company-finance.jpg");
    }
`