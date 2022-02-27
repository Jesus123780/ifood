import styled, { css } from "styled-components";
import { BColor, BGColor, BGVColor, EColor, PColor } from "../../public/colors";
import Link from 'next/link'
export const Container = styled.div`
  /* max-width: 1366px; */
  /* margin: 30px auto 20px; */
  overflow: hidden;
`
export const ContentSearch = styled.div`
  max-width: 1366px;
  margin: 5px auto;
  font-size: 1.5rem;
  line-height: 1em;
  flex-grow: 1;
  font-family: PFont-Light;
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
export const ContentCategoryProducts = styled.div`
    margin: 30px 0;

`
export const HeadCategory = styled.div`
  height: auto;
  background-color: ${BGColor};
  width: 100%;
  margin: 35px 0;
  box-shadow: inset 0 -1px 0 #dcdcdc;
  & span {
    line-height: 1.15;
    position: relative;
    font-weight: 500;
    margin: 0;
    color: #3f3e3e;
    width: 100%;
    font-size: 1.5rem;
    letter-spacing: -1px;
    padding: 40px 0 20px;
  }
  & > button {
    background-color: ${BGColor};
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
    max-width: 1366px;
    margin: 30px auto 20px;
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
export const CardProductsContent = styled.div`
    width: 100%;  
    border: 1px solid #ccc;
    height: min-content;
    padding: 10px;
    border-radius: 4px;
    grid-template-columns: 5fr 140px;
    grid-column-gap: 20px;
    cursor: pointer;
    display: grid;
    padding: 16px;
    .Name {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: PFont-Light;
    }
    .store_info {
      color: ${`${BGVColor}`};
    }
    .store_image{
      background-color: ${BGColor};
      box-shadow: 1px 1px 10px #00000012;
    }
    `
export const CardProductsModal = styled(CardProductsContent)`
  border: none;
  padding: 0px;
  grid-template-columns: 1fr 50%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    overflow-y: auto;
    height: 600px;
    position: relative;
`
export const HeadSticky = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 5px 0;
    width: 100%;
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  
  `
export const ActionButton = styled.div`
  /* position: absolute; */
  /* bottom: 15px; */
  display: grid;
  place-content: center;
  grid-template-columns: 60% 40%;


`
export const DisRestaurant = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(63,62,62,.1);
  border-radius: 4px;
  width: 100%;
  margin: auto;
  padding: 10px;
  height: auto;
  padding: 11px 20px;
  .dish-observation-form__label {
    line-height: 1.15;
    font-weight: 500;
    font-size: 1rem;
    color: #717171;
  }
  .dish-restaurant__header {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dish-restaurant__divisor {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    box-sizing: border-box;
    border-top: 2px dashed #f2f2f2;
    margin: 8px 0;
  }
`
export const Text = styled.span`
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || BColor};
    /* justify-content: ${({ justify }) => justify || 'flex-start'}; */
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
`
export const CardsComponent = styled.div`
    background-color: ${BGColor};
    padding: 10px;
    margin: 15px 0;
    border-bottom: 1px solid #ccc;
    grid-template-columns: 5fr 10%;
    gap: 20px;
    cursor: move;
    display: grid;
    .title_card{
        word-break: break-word;
        font-family: PFont-Light;
        color: ${BColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
    }
    .price {
        word-break: break-word;
        font-family: PFont-Light;
        color: ${PColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 600;
    }
`
export const GarnishChoicesHeader = styled.div`
    padding: 12px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    .garnish-choices__title { 
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        color: #3f3e3e;
    }
    .garnish-choices__title-desc {
        font-weight: 100;
        font-size: .875rem;
        line-height: 17px;
        display: block;
        color: #717171;
    }
     .marmita-minitag{
        -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans,Helvetica,sans-serif;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    font-size: .5625rem;
    line-height: 1;
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
     }
     .garnish-choices {
            justify-content: space-around;
            display: flex;
            

     }
`