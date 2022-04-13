import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { MODAL_SIZES } from './constanst'
import { Context } from 'context/Context'
import { BtnClose, ModalHeader, ModalTitle } from './styled'
import { IconCancel } from 'public/icons'

const ScaleModal = ({ show, children, size, title, height }) => {
  const [state, setState] = useState(show)
  const { setSalesOpen } = useContext(Context)


  const onBackdropHide = () => {
    setSalesOpen(false)

  }
  return (
    <Container show={show || state} size={size}>
      <Modal height={height} show={show} size={size} onClick={(e) => e.preventDefault()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <BtnClose onClick={() => onBackdropHide()}><IconCancel size='20px' /></BtnClose>
        </ModalHeader>
        {children}
      </Modal>
    </Container>
  )
}

ScaleModal.propTypes = {
  show: PropTypes.bool
}

export default ScaleModal

const zoomIn = keyframes`
  0% {
    transform:scale(0);
  }
  100% {
    transform:scale(1);
  }
    
`

const zoomOut = keyframes`
   0% {
    transform:scale(1);
  }
  100% {
    transform:scale(0);
  }
`
const Modal = styled.div`
 background: #fff;
    width: ${({ size }) => {
    if (size === MODAL_SIZES.small) return '30%'
    else if (size === MODAL_SIZES.medium) return '60%'
    else if (size === MODAL_SIZES.large) return '100%'
    else return size
  }};
    min-width: 340px;
    height: ${({ height }) => height || 'auto'};
    border-radius: ${({ borderRadius }) => borderRadius};
    border: 1px solid rgba(0,0,0,.2);
    z-index: 999;
    overflow: hidden;
    transform:scale(0);
    position: relative;
    border-radius: 5px;
     ${({ show }) => show ? css`
     animation: ${zoomIn} .5s .1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
     ` :
    css`
    animation:  ${zoomOut}  .2s .1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    `} 
`
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    place-items: center;
    margin: auto;
    place-content: center;
    transition: .6s;
    display: flex;
    ${({ show }) => show ? css`
        z-index: 1000;
        opacity: 1;
        ` :
    css`
    z-index: -1000;
    opacity: 0;

    `} 
`