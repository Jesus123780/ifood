import { BColor, BGColor, BGVColor, PColor } from 'public/colors'
import styled, { css } from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
`
export const CardPedido = styled.div`
    box-shadow: 1px 1px 11px 0px #cccccc29;
    border-radius: 5px;
    border: 1px solid #838388;
    padding: 0.5em;
    margin: 0.5em  0;
    background-color: ${BGColor};
    display: flex;
    justify-content: space-between;
    .button-show-more {
        background-color: transparent;
        color: ${PColor};

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
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    overflow-y: auto;
    position: relative;
`
export const CardProductsModal = styled(CardProductsContent)`
  border: none;
  padding: 0px;
  grid-template-columns: 1fr 50%;
  margin: 10px 0;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`
export const HeadSticky = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 5px 0;
    width: 100%;
`

export const Text = styled.span`
    font-size: ${({ size }) => {return size || '12px'}};
    text-align:  ${({ align }) => {return align || 'start'}};
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    ${({ padding }) => {return padding && css`padding: ${padding};`}}
    margin: ${({ margin }) => {return margin || '0'}};
    color: ${({ color }) => {return color || BColor}};
    /* justify-content: ${({ justify }) => {return justify || 'flex-start'}}; */
    display: flex;
    font-family: ${({ font }) => {return font || 'PFont-Regular'}};
    word-break: break-word;
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  
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
export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    & form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

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