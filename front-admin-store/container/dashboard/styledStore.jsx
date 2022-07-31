import styled, { css } from 'styled-components'
import { BGColor, SECBGColor, SECColor, SVColor, TFSColor } from '../../public/colors'

export const RestaurantColumn = styled.div`
  line-height: 1.15;
  font-size: 16px;
  flex-basis: 100%;
  width: 100%;
  padding-bottom: 30px;
  max-width: 100%;
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    background-color: ${BGColor};
    width: max-content;
    right: 35px;
    opacity: 0;
    text-align: center;
    display: grid;
    place-content: center;
    border-radius: 30px;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
    padding: 1px 30px;
    `
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -40px;
    transition: .4s ease;
    width: 35px;
    height: 35px;
    top: ${({ top }) => { return top || '20px' }};
    transition-delay: ${({ delay }) => { return delay || 'auto' }};
    max-height: 35px;
    max-width: 35px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => {
    return props.grid && css`
        top: ${({ top }) => { return top || '80px' }};
        `}
}
`

export const Section = styled.div`
    padding: 35px 30px 0;
    max-width: 1366px;
    margin: auto;
    transition: 0.2s;
    /* height: 150px; */
    // overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: .2s ease-in-out;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
    `
export const MerchantInfoTitle = styled.h1`
    color: ${SECColor};
    font-weight: 400;
    letter-spacing: -1px;
    font-size: 2.25rem;
    line-height: 44px;
    justify-content: start;
    align-items: center;
    display: flex;
    margin: 0 40px;
    button {
      background-color: transparent;
      cursor: pointer;
    }
    svg {
      cursor: pointer;
    }
`
export const ButtonAction = styled.button`
    margin: 10px;
    border: 1px solid ${TFSColor};
    padding: 10px ;
    border-radius: 20px;
    flex-grow: 1;
    font-size: 15px;
    background-color: transparent;
    color: ${TFSColor};
    text-align: center;
    transition: 0.3s;
    cursor: pointer;

`
export const ContentCategoryProducts = styled.div`
    margin: 30px 0;
`
export const WrapperOptions = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
export const ButtonOption = styled.div`
    position: absolute;
    z-index: 9999;
    visibility: hidden;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    display: grid;
    opacity: 0;
    background-color: ${BGColor};
    width: 180px;
    place-content: center;
    gap: 10px;
    height: auto;
    place-content: center;
    top: 70px;
    padding: 5px;
    transition: .5s ease ;
    border-radius: 5px;
    left: 0;
    button {
      padding: 10px;
      justify-content: center;
      place-content: space-between;
      cursor: pointer;
      border-radius: 5px;
      width: 100%;
      display: flex;
      background-color: ${BGColor};
    }

`
export const MerchantInfo = styled.div`
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 0 30px;
    top: 0;
    margin: 30px auto 20px;
      &&:hover {
        & ${ButtonOption} {
            visibility: visible;
            opacity: 1;
        }
    }
    && > span {
      position: relative;
      @media only screen and (min-width: 960px) {
        height: 70px;
        width: 70px;
        min-height: 70px;
        max-height: 70px;
        min-width: 70px;
        max-width: 70px;
        margin: 30px;
        place-content: center;
        display: grid;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: 100%;
        && svg {
          fill: ${BGColor};
        }
      }
    }
`
export const MerchantBannerWrapperInfo = styled.div`
    line-height: 1.15;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    color: ${SECBGColor};
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
    border-radius: 4px;
    height: 250px;
    position: relative;
    justify-content: unset;
    padding-left: 30px;
    background-color: rgb(0 0 0 / 6%);
    background-blend-mode: overlay;
    background-image: ${({ bannerImage }) => { return bannerImage ? (bannerImage) : '' }};
    .merchant-banner__status-description {
      line-height: 1.15;
      font-size: 16px;
      color: ${SECBGColor};
      box-sizing: border-box;
    }
    .merchant-banner__status-title {
    color: ${SECBGColor};
    font-weight: 400;
    line-height: 20px;
    margin: 0 0 4px;
    font-size: 25px;
    margin-bottom: 16px;
    text-align: left;
    }
    && > span {
      @media only screen and (min-width: 960px) {
        height: 70px;
        width: 70px;
        min-height: 70px;
        max-height: 70px;
        min-width: 70px;
        max-width: 70px;
        margin: 30px;
        place-content: center;
        display: grid;
        border: 1px solid ${SECBGColor};
        border-radius: 100%;
        && svg {
          fill: ${BGColor}
        }
      }
    }
`

// IMAGE

export const InputFile = styled.input`
    display: none;
`
export const ContentSearch = styled.div`
  max-width: 1366px;
  margin: 5px auto;
  font-size: 1.5rem;
  line-height: 1em;
  flex-grow: 1;
  display: flex;
  place-content: space-between;
  align-items: center;
  font-family: PFont-Light;
  background: ${BGColor};
  button {
    background-color: transparent;
  }
  input {
  margin: 5px auto;
  font-size: 1.5rem;
  line-height: 1em;
  flex-grow: 1;
  display: flex;
  place-content: space-between;
  align-items: center;
  font-family: PFont-Light;
  outline: none;
  border: none;
  border-bottom: 2px solid ${SVColor};
  }
  `
export const Title = styled.h1`
  text-rendering: optimizeLegibility;
  font-family: PFont-Light;
  box-sizing: border-box;
  display: inline;
  color: #3e3e3e;
  margin: 0 0 2px;
  margin-right: 10px;
  font-weight: 400;
  letter-spacing: -1px;
  font-size: ${({ size }) => { return size || '2.25rem' }};
  line-height: 44px;
  margin-bottom: 0;
  width: fit-content;
`
export const ContainerCarrusel = styled.div`
  display: grid;
  grid-gap: 28px;
  max-width: 1366px;
  margin: 30px auto 20px;
  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2,1fr);
    padding: 0;
  }
  @media only screen and (min-width: 743px) {
    grid-template-columns: repeat(2,minmax(320px,1fr));
    grid-gap: 30px;
    padding: 0 20px; 
  }

`