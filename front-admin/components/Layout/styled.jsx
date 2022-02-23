import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

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
    color: ${ PColor };
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
    background-color: ${ ({ theme }) => theme.InvColor };
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
    ${ props => props.space &&css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        & > span {
            font-family: PFont-Light;
            font-size: 14px;
            color: ${ ({ theme }) => `${ theme.PColor }` };
        }
    ` }
    @media only screen and (min-width: 960px){
    }
`
export const FloatingBox = styled.div`
    position: absolute;
    grid-gap: 0 10px;
    display: grid;
    transition: all 200ms ease-in-out;
    background-color: ${ BGColor };
    padding: 10px;
    z-index: 99999;
  ${ ({ show }) => show
        ? css`
                  visibility: visible;
                  transform: translateY(0);
                  `
        : css`
                
                visibility: hidden;
                  transform: translateY(-50px);
              ` }
    @media only screen and (min-width: 960px){
    }
`
export const FloatingBoxTwo = styled(FloatingBox)`
    margin: 0 0 0 30px;
    /* left: -220px; */
    max-width: 250px;
    min-width: 250px;
    width: 250px;
    top: 28px;
    overflow: hidden;
    box-shadow: -1px 2px 8px 2px #dcdcdc;
    @media only screen and (min-width: 960px){
    }
  
`
export const Overline = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    ${ props => props.show ? css`display: block` : css`display: none;` };
    @media only screen and (min-width: 960px){
    }
  
`