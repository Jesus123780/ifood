import styled, { css } from "styled-components";
import { BColor, BGColor, EColor, PColor } from "../../public/colors";
import Link from 'next/link'
export const Container = styled.div`
  max-width: 1366px;
  margin: 30px auto 20px;

`
export const ContainerCarrusel = styled.div`
  transform: translateX(0px);
  transition: none;
  display: grid;
  grid-template-columns: repeat(4, 416px);
  grid-gap: 28px;

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