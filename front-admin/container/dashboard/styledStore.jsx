import styled, { css, keyframes } from 'styled-components'
import { StyleSheet } from '@react-pdf/renderer'
import { BColor, BGColor, EColor, ESFColor, PColor, SECColor, PVColor, TBGSColor } from '../../public/colors'
import { fadeIn, fadeOut } from '../../components/AlertBox/styled'

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
    top: ${({ top }) => top || '20px'};
    transition-delay: ${({ delay }) => delay || 'auto'};
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
    ${props => props.grid && css`
        top: ${({ top }) => top || '80px'};
        `
  }
`

export const MerchantBanner = styled.header`
    padding: 35px 30px 0;
    max-width: 1366px;
    margin: auto;
    transition: 0.2s;
    /* height: 150px; */
    overflow: hidden;
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
`
export const ButtonAction = styled.button`
    visibility: visible;
    box-sizing: border-box;
    font-family: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
    background: #fff;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    font-size: 14px;
    line-height: 18px;
    color: #3f3e3e;
    min-width: 139px;
    flex: 1 1;
    padding: 0;
    height: 62px;
    cursor: pointer;
    box-shadow: none;
`
export const WrapperOptions = styled.div`
    display: flex;
    padding: 20px 30px 0;
    justify-content: space-between;
    align-items: center;
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

        border: 1px solid rgba(0,0,0,.1);

        border-radius: 100%;
        && svg {
          fill: ${BGColor}
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
    color: #f7f7f7;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
    border-radius: 4px;
    height: 250px;
    position: relative;
    justify-content: unset;
    padding-left: 30px;
    background-color: rgba(0,0,0,.7);
    background-blend-mode: overlay;
    background-image: ${({ bannerImage }) => bannerImage && (bannerImage)};
    .merchant-banner__status-description {
      line-height: 1.15;
      font-size: 16px;
      color: #f7f7f7;
      box-sizing: border-box;
    }
    .merchant-banner__status-title {
    color: #f7f7f7;
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
        border: 1px solid #f7f7f7;
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