/* eslint-disable consistent-return */
import styled, { css, keyframes } from 'styled-components'
import { BGColor, SECColor, SEGColor } from '../../public/colors'
import { MODAL_SIZES } from './constanst'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const fadeInTop = keyframes`
    from {
      top: -10%;
      left: 50%;
      transform: translateY(-100%);
    }
  
    to {
      top: 15%;
      left: 50%;
      transform: translateY(-0%);
    }

`
export const Pulse = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

`

const fadeOutTop = keyframes`
    from {
        opacity: 1;
        top: 15%;
        left: 50%;
        transform: translateY(-15%);
    }
    to {
      opacity: 0;
      top: 10%;
      left: 50%;
      transform: translateY(-100%);
    }
  

`
export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .1rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    /* position: fixed;
    top: 0;
    left: 0;
    width: 98.9%;
    left: 0;
    z-index: 99; */
    background-color: ${BGColor};
`

export const Container = styled.div`
    display: ${({ show, state }) => {
    if (show && state) return 'flex'
    else if (show && !state) return 'flex'
    else if (!show && !state) return 'none'
  }};
    position: fixed;
    background: ${({ bgColor }) => { return bgColor || 'rgba(0,0,0,.4)' }};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: ${({ zIndex }) => { return zIndex || '100' }};
    opacity: 1;
    ${({ show, state }) => {
    if (show && state) {
      css`animation: ${fadeIn} .1s linear;`
    } else if (show && !state) css`animation: ${fadeIn} .1s linear;`
  }}
`

export const Modal = styled.div`
    background: #fff;
    width: ${({ size }) => {
    if (size === MODAL_SIZES.small) return '30%'
    else if (size === MODAL_SIZES.medium) return '60%'
    else if (size === MODAL_SIZES.large) return '100%'
    return size
  }};
    ${props => {
    return props.backdropA && css`
        animation: ${Pulse} .2s forwards;
    `}}
    border-radius: ${({ borderRadius }) => { return borderRadius }};
    border: 1px solid rgba(0,0,0,.2);
    z-index: 999;
    
    ${({ state }) => { return state ? css`animation: ${fadeInTop} .2s forwards;` : css`animation: ${fadeOutTop} .2s forwards;` }}
    /* height: 100vh; */
    height: ${({ height }) => { return height || 'auto' }};

`


export const ModalTitle = styled.h4`
    margin: 0;
    color: ${SEGColor};
    font-size: 17px;
    width: auto;
    font-weight: 500;
    font-family: PFont-Light;
`
export const BtnClose = styled.button`
    ${({ fixed }) => {
    return fixed && css`
        position: absolute;
        right: 6px;
        top: 6px;
    `}}
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    z-index: 999999;
    color: #898989;
    text-shadow: 0 1px 0 #fff;
    outline: none;
    cursor: pointer;
`

export const ModalBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
    
    display: ${({ display }) => { return display || 'block' }};
    height: ${({ height }) => { return height || 'auto' }};
    min-height: ${({ height }) => { return height || 'auto' }};
    /* padding: ${({ padding }) => { return padding || '0' }}; */
    background-color: ${BGColor};
    /* padding-top: 30px; */

`

export const ModalFooter = styled.div`
     position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    right: 0;
    margin: auto;
    background-color: ${BGColor};
    justify-content: space-between;
    display: flex;
    border-top: 1px solid ${`${SECColor}69`};
`

export const BtnConfirm = styled.button`
    flex-direction: row;
    padding: ${({ padding }) => { return padding || '5px' }};
    cursor: pointer;
    border: ${({ border }) => { return border ? `${`1px solid ${SEGColor}`}` : 'none' }};
    border-radius: 30px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => { return height || 'auto' }};
    background-color: ${({ bgColor }) => { return bgColor || 'transparent' }};
    &:disabled {
        cursor: no-drop;
    }
`

export const BtnCancel = styled.button`
    flex-direction: row;
    padding: ${({ padding }) => { return padding || '5px' }};
    cursor: pointer;
    border: ${({ border }) => { return border ? `${`1px solid ${SEGColor}`}` : 'none' }};
    border-radius: 30px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => { return height || 'auto' }};
    background-color: ${({ bgColor }) => { return bgColor || 'transparent' }};
    &:disabled {
        cursor: no-drop;
    }
`
