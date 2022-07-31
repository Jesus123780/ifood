import { APColor, BColor, BGColor, PColor, PVColor } from 'public/colors'
import styled, { css } from 'styled-components'

export const ContentImage = styled.div`
    display: flex;
    width: 100%;
    && > img {
        height: 300px; 
        min-height: 300px; 
        object-fit: cover;
        max-height: 300px; 
        width: 100%; 
    }
`
export const InputFile = styled.input`
    display: none;   
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 50px;
    color: ${BColor};
    opacity: 0;
    background-color: ${BGColor}; 
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
    border-radius: 10px;
    text-align: center;
    align-items: center;
    display: flex;
    place-content: center;
`
export const WrapperButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    place-items: center;
    .ProQuantity {
        padding: 10px;
    }
`
export const InputCounter = styled.input`
    text-align: center;
    position: absolute;
    border-radius: 0.375em;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
    font-size: 20px;
    min-height: 48px;
    width: 60px;
    min-width: 40px;
    outline: none;
    left: 0;
    right: 0;
    margin: auto;
    top: 10px;
    border: none;
    &&:focus {
      box-shadow: 0 0 0 1px ${PVColor};
    }
`
export const ItemProQuantity = styled.button`
  background-color: transparent;
  position: relative;
    display: flex;
    justify-content: space-between;
.counts--container {
  border-radius: 5px;

  .count {
    font-size: 20px;
    width: 70px;
    height: 50px;
    color: ${BColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    &.move-up {
      animation: move-up 250ms ease-out;
      animation-fill-mode: forwards;
    }

    &.start-animate-up {
      animation: move-up-start 250ms ease-out;
      animation-fill-mode: forwards;
    }

    @keyframes move-up-start {
      0% {
        top: 0px;
      }
      100% {
        top: -50px;
        opacity: 0;
      }
    }

    @keyframes move-up {
      0% {
        top: 50px;
        opacity: 0;
      }
      100% {
        opacity: 1;
        top: 0;
      }
    }
    &.move-down {
      animation: move-down 250ms ease-out;
      animation-fill-mode: forwards;
    }

    &.start-animate-down {
      animation: move-down-start 250ms ease-out;
      animation-fill-mode: forwards;
    }

    @keyframes move-down-start {
      0% {
        top: 0px;
      }
      100% {
        top: 50px;
        opacity: 0;
      }
    }

    @keyframes move-down {
      0% {
        top: -50px;
        opacity: 1;
      }
      100% {
        opacity: 1;
        top: 0;
      }
    }
  }
}

`
export const OverlineFree = styled.button`
    width: 90%;
    height: 100px;
    position: absolute;
    top: ${({ free }) => { return free ? '-30px' : '0px' }};
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    margin: 0 auto;
    left: 0;
    right: 0;
    transition: .2s ease;
    & > span {
      color: ${PColor};
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
    }
`
export const Button = styled.button`
  background-color: ${PColor};
  color: ${BGColor};
  padding: 10px;
  border-radius: 5px;

`
export const WrapperCard = styled.div`
    position: relative;
    &&:hover ${OverlineFree} {
      top: -30px;
    }
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    z-index: 999; 
    top: ${({ top }) => { return top ? top : '20px' }};
    transition-delay: ${({ delay }) => { return delay ? delay : 'auto' }};
    max-height: 50px;
    max-width: 50px;
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
        top: ${({ top }) => { return top ? top : '80px' }};
        `}
}
`
export const Card = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgba(0,0,0,.05);
    border-radius: 4px;
    padding: 0;
    /* max-width: 222px; */
    grid-template:
     "image" 157px 
     "info-price"  1fr
     "info"  1fr;
    grid-gap: 10px;
    height: 400px;
    align-items: flex-end;
    align-items: baseline;
    top: 0;
    box-shadow: ${({ free }) => { return free && `0 1px 4px ${PColor}` }};
    ${({ height }) => { return css`
    height: ${height}
    `} }};

    &:hover  ${ButtonCard} {
        right: 15px;
    }
  
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    .dish-card__info {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        margin: 0;
        display: grid;
        grid-area: info;
        grid-template-rows: 1fr;
        padding: 10px 20px;
        height: min-content;
        /* padding: 0 20px; */
    }
    .dish-card__container-image {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        height: 157px;
        grid-area: image;
    width: 100%;
    overflow: hidden;
    height: 100%;
    border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        position: relative;
    }
    .marmita-image--responsive {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box;
        border-style: none;
        pointer-events: none;
        align-self: flex-start;
        object-fit: cover;
        grid-area: image;
        width: 100%;
        border-radius: 4px 4px 0 0;
        height: 157px;
    }
    .dish-card__description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    line-height: 1.5rem;
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.165rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    width: 85%;
    }
    .description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    font-size: .875rem;
    line-height: 1.25rem;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    .price {
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: ${APColor};
    }
    .discount {
    color: #3e3e3e;
    text-decoration-line: line-through;
    }
    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }
    .info-price {
        display: flex;
        padding: 0 20px;
    } 
`

export const ContainerActions = styled.div`
    position: absolute;
    width: max-content;
    right: 25px;
    background-color: transparent;
    border-radius: 50%;
`