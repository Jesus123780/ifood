import styled, { css, keyframes } from "styled-components";
import { BColor, BGColor, BGVColor, EColor, PColor, SECBGColor } from "../../public/colors";
import Link from 'next/link'
export const Container = styled.div`
  /* max-width: 1366px; */
  /* margin: 30px auto 20px; */
  /* overflow: hidden; */
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
const hollow = `%3Csvg width='24' height='22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.88 1.168a5.87 5.87 0 013.622.269 5.435 5.435 0 012.634 2.314h0L12 5.234l.864-1.482a5.414 5.414 0 012.635-2.306 5.907 5.907 0 013.634-.267c1.112.273 2.133.874 2.845 1.795C22.618 3.8 23 4.882 23 6.192c0 3.891-4.231 7.784-9.305 12.741-.554.542-1.12 1.095-1.695 1.66a590.654 590.654 0 00-1.7-1.664C5.23 13.973 1 10.082 1 6.192c0-1.31.384-2.394 1.027-3.223.714-.923 1.737-1.527 2.852-1.8z' fill-rule='nonzero' stroke='%23232323' stroke-width='2' fill='none'/%3E%3C/svg%3E`;
const filled = `%3Csvg width='24' height='22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 3.248C8.852-2.154 0-.577 0 6.192 0 10.853 5.571 15.619 12 22c6.43-6.381 12-11.147 12-15.808C24-.6 15.125-2.114 12 3.248z' fill='red' fill-rule='nonzero'/%3E%3C/svg%3E`;
const pop = keyframes`
  from { opacity: 1; transform: scale(1) }
  to { opacity: 0; transform: scale(2) }
`;

export const ButtonLike = styled.button`
  appearance: none;
  border: none;
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  background: url("data:image/svg+xml,${hollow}") no-repeat center bottom;
  background-size: 100%;
  cursor: pointer;
  opacity: ${(props) => (props.isLiked ? 1 : 0.5)};
  transition: opacity .25s ease;

  :hover {
    opacity: 1;
  }
  :focus {
    outline: none;
  }
  
  ::before {
    content: "";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px; 
    background: url("data:image/svg+xml,${filled}") no-repeat center bottom;
    background-size: 100%;
    top: 0;
    left: 0;
    opacity: ${(props) => (props.isLiked ? 1 : 0)};
  }

  ${(props) =>
    props.isLiked &&
    css`
    ::after {
      content: "";
      position: absolute;
      display: block;
      width: 32px;
      height: 32px; 
      background: url("data:image/svg+xml,${filled}") no-repeat center bottom;
      background-size: 100%;
      top: 0;
      left: 0;
      animation: ${pop} .5s ease;
      animation-direction: forward;
    }
  `}
  
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
    background-color: rgb(0 0 0 / 26%);
    background-blend-mode: overlay;
    max-width: 1366px;
    margin: 50px auto 20px;
    background-image: ${({ bannerImage }) => bannerImage && (bannerImage)};
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
export const CardItemRating = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items: center; 
  width: 30%;
  .option {
    background-color: #cccccc67;
    border-radius: 5px; 
    display: flex;
    place-content: space-around;
    align-items: center; 
  }
`
export const CtnItemFilter = styled.div`
    padding: 10px;
    place-content: center;
    flex-direction: column;
    display: flex;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 60%;
    height: 100px;
    align-items: center;
    min-height: 100px;
    width: 100px;
    min-width: 100px;

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
  /* border: 4px solid ; */
  padding: 0px;
  grid-template-columns: 1fr 50%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
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
  font-size: ${({ size })=> size || '2.25rem'};
  line-height: 44px;
  margin-bottom: 0;
  width: fit-content;
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