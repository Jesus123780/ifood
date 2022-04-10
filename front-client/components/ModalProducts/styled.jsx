import { BColor, BGColor, BGVColor, PColor } from "public/colors"
import styled, { css } from "styled-components"

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
  padding: 0px;
  grid-template-columns: 1fr 50%;
  background-color: ${BGColor};
  @media (max-width: 960px) {
    grid-template-columns: 100%;
    height: 100vh;   
    position: fixed; 
    overflow: hidden scroll;
    /* height: 100%; */
    /* width: 100%; */

  }
`
export const ContentInfo = styled.div` 
  width: 100%;
  flex-direction: column;
  padding: 24px 16px;
  overflow-y: auto;
  height: 600px;
  min-height: 600px;
  /* max-height: 600px;
  min-width: 600px;
  max-width: 600px; */
  position: relative;
  @media (max-width: 960px) {
    height: auto;
    padding: ${({ padding }) => padding || '30px'};
    display: flex;
    margin: 0px;
    margin: ${({ margin }) => margin || '0px'};
  }
`
export const HeadSticky = styled.div`
    position: sticky;
    top: -30px;
    background-color: #fff;
    padding: 25px 0;
    width: 100%;
    z-index: 9989;
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
    ${props => props.description && css`
    
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    margin-bottom: 10px;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    `}
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  .store_image{
        border-radius: 50%;
        background-color: ${BGColor};
        box-shadow: 1px 1px 10px #00000012;
        width: 85px;
        height: 85px;
        min-width: 85px;
        object-fit: contain;
        min-height: 85px;
        border: 1px solid #f2f2f2;
    }
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
export const ContainerShare = styled.div`
  position: absolute;
  height: 200px;
  display: none;
  width: 240px;
  box-shadow: 0 0 1.5rem rgb(18 38 63 / 9%);
  z-index: 99;
  background-color: ${BGColor};
  border-radius: 10px;
  padding: 6px;
  bottom: 17px;
  transition: all .5s ease;
  .icon-WhatsApp {
    background-color: #01e675;
    border-radius: 50%;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  .icon-face {
    background-color: #1196f5;
    border-radius: 50%;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  &::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  right: 10px;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: ${BGColor} transparent transparent transparent;
}
  button {
    color: ${BColor};
    padding: 10px;
    transition: .5 ease;
    width: 100%;
    cursor: pointer;
    background-color: ${BGColor};
  }
  button:hover {
    background-color: #ededed69;
  }
  `
export const ContentShare = styled.div`
    position: relative;
    cursor: pointer;
    color: red;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    margin: 0;

    display: flex;
    justify-content: flex-end;
    position: relative;
    &:hover  > ${ContainerShare} {
        display: block;
    }
`
export const ActionButton = styled.div`
  /* position: absolute; */
  display: grid;
  position: absolute;
  bottom: 30px;
  width: 50%;
  right: 0;
  place-content: center;
  grid-template-columns: 60% 40%;
`
export const BtnClose = styled.button`
    position: absolute;
    right: 19px;
    top: 20px;
    z-index: 9990;
    background-color: ${BGColor};
    @media (max-width: 960px) {
      display: none;
    }
`
export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${BGColor};
padding: 10px 20px;
  z-index: 999;
  @media (min-width: 960px) {
      display: none;
    }
`
export const BtnCloseMobile = styled.button`
    background-color: ${BGColor};
    /* left: 30px; */
 
`
export const Modal = styled.div`
    width: 700px;
    border-radius: 10px;
    z-index: 99999;
    display: flex;
    max-height: 584px;
    width: 694px;
    flex-direction: column;
    transition: 500ms ease;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    height: calc(100vh - 100px);
    top: 80px;
    /* transition: transform .3s ease; */
    ${({ showModal }) => showModal
    ? css`  
      transform: translateY(0%);
      `
    : css`
      transform: translateY(50%);
        /* display: none; */
              `}
    @media (max-width: 960px) {
      top: 0;
      /* 700px */
      width: 100%;
      height: 100vh;
      max-width: 960px;
    }

`
export const ContainerModal = styled.div`
    display: flex;
    /* filter: blur(2px); */
    backdrop-filter: blur(1px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    transition: 150ms ease-in-out;
    z-index: 9999908786;
    ${({ showModal }) => showModal
    ? css`  
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color:rgba(0, 0, 0, 0.322);
        
        `
    : css`
          z-index: -10000;
          visibility: hidden;
          opacity: 0;
              `}
    `