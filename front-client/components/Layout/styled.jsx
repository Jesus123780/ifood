import styled, { css } from 'styled-components'
import { BGColor, PColor, PLColor } from '../../public/colors'
import Link from 'next/link'

export const FooterComponent = styled.footer`
    position: fixed;
    bottom: 0;
    height: 60px;
    display: flex;
    left: 0;
    margin: auto;
    right: 0;
    width: 100%;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 24%);
    z-index: 9999;
    justify-content: space-between;
    display: none;
    grid-area: foot;
    background-color: ${BGColor};
    @media (max-width: 960px){
        display: flex;
    }
`
export const Button = styled.button`
    background-color: transparent;  
    cursor: pointer;
`
export const ContentFooter = styled.footer`
    display: flex;
    max-width: 1000px !important;
    margin: auto;
    flex-wrap: wrap;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    @media (min-width: 992px) {
    }
`
export const Text = styled.span` 
    font-size: 13px;
    text-align: center;
    margin: 5px 0px;
    font-family: PFont-Light;
    word-break: break-word;
`
export const Anchor = styled.a`
    &.active {
        border-top: 2px solid #61d2b4;
        & > svg {
            fill: red !important;
        }
    }
  padding: 0px 10px;
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e3e3e;
  font-weight: 300;
  font-size: 0.75rem;
  line-height: 0.875rem;
`














// HEADER
export const AdicionalComponent = styled.div`
position: relative;
    @media only screen and (min-width: 960px){
    }
`
export const Time = styled.time`
    font-family: PFont-Regular;
    color: ${PColor};
    text-align: center;
    @media only screen and (min-width: 960px){
    }
`
export const Timer = styled.div`
    width: 300px;
    min-width: 300px;
    position: relative;
    @media only screen and (min-width: 960px){
    }
`
export const UseSize = styled.div`
    position: absolute;
    right: 0;
    bottom: -45px;
    width: 60px;
    max-width: 60px;
    background-color: ${({ theme }) => theme.InvColor};
    border-radius: 50%;
    height: 60px;
    align-items: center;
    display: grid;
    box-shadow: 0px 0px 6px 0px #16101026;
    justify-content: center;
    align-content: center;
    @media only screen and (max-width: 960px){
        display: none;
    }
`

// options
export const ButtonOption = styled.button`
    margin: 0 0 0 30px;
    position: relative;
    cursor: pointer;
    z-index: 999;
    background-color:  transparent;
    ${props => props.space && css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    & > span {
        font-family: PFont-Light;
        font-size: 12px;
        background-color: #ea1d2c;
        color: #FFFFFF;
        border-radius: 50%;
        padding: 1px;
        place-content: center;
        display: flex;
        align-items: center;
        color: ${({ theme }) => `${theme.PColor}`};
    }
    ` }
    @media only screen and (min-width: 960px){
    }
    .count_product {
    background-color: ${PColor};
    color: ${BGColor};
    border-radius: 50%;
    padding: 1px;
    height: 20px;
    font-size: 12px;
    width: 20px;
    align-items: center;
    display: flex;
    place-content: center;
    position: absolute;
    right: 0;
    bottom: 20px;

    }
`
export const FloatingBox = styled.div`
    position: absolute;
    grid-gap: 0 10px;
    display: grid;
    transition: all 200ms ease-in-out;
    background-color: ${BGColor};
    padding: 10px;
    z-index: 99999;
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
              ` }
    @media only screen and (min-width: 960px){
    }
`
export const FloatingBoxTwo = styled(FloatingBox)`
    margin: 0 0 0 30px;
    left: -220px;
    max-width: 250px;
    min-width: 250px;
    width: 250px;
    top: 90px;
    overflow: hidden;
    box-shadow: -1px 2px 8px 2px #dcdcdc;

    @media only screen and (min-width: 960px){
    }
  
`
export const Container = styled.div`
    background-color: ${BGColor};
    /* border-top: 1px solid ${PColor}; */
    padding: 30px;
    width: 100%;
    height: auto;
    display: grid;
    max-width: 1200px;
    margin: auto;
    grid-auto-columns: min-content;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    border-top: 1px solid #dcdcdc;
    padding: 40px 0 10px;
`

export const Enlace = styled(Link)`
    color: ${PLColor};
    font-weight: 300;
    line-height: 29px;
    list-style: initial;
    font-family:  PFont-Light;
    margin: 7px 0px;
    font-size: 14px;
    display: block;
`
export const Copyright = styled.li`
    grid-area: company-copy;
    width: 100%;
    font-size: 0.6875rem;
    line-height: 1.35;
    font-weight: 300;
    color: #717171;
    margin: 0;
    list-style: none;
`
export const CopyrightInformation = styled.li`
    grid-area: company-info;
    width: 100%;
    font-size: 0.6875rem;
    line-height: 1.35;
    font-weight: 300;
    color: #717171;
    margin: 0;
    list-style: none;
`
export const ContainerLogo = styled.div`
    flex-basis: 64px;
    margin-right: 20px;
    margin-left: 20px;
    min-width: 50px;
    grid-area: logo-link;
`
export const Content = styled(Link)`
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 10px;
    ${props => props.grid && css`
        display: grid;
        align-items: center;
        grid-gap: 0 20px;
        grid-template-columns: 50px 1fr;
        grid-template-areas:
        'logo-link company-copy'
        'logo-link company-info';

    ` }
`

// Social
export const ContainerSocial = styled.div`
    background-color: ${BGColor};
    /* border-top: 1px solid ${PColor}; */
    padding: 30px;
    width: 100%;
    height: auto;
    display: grid;
    max-width: 1200px;
    margin: auto;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-bottom: 0;
    border-top: 1px solid #dcdcdc;
    padding: 40px 0 10px;
`
export const ContentSocial = styled.div`
    flex-basis: 50%;
    @media only screen and (min-width: 768px){
        flex-basis: 25%;
    }
`
export const Title = styled.h1`
   font-weight: 500;
    font-size: 1rem;
    line-height: 1.22;
    margin-top: 0;
    margin-bottom: 30px;
    color: #3e3e3e;
`
export const Overline = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    ${props => props.show ? css`display: block` : css`display: none;`};
    @media only screen and (min-width: 960px){
    }
  
`


