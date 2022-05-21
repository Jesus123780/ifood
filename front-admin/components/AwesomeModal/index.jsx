import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import { Container, Modal, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter } from './styled'
import { MODAL_SIZES, BUTTONS_TEXT } from './constanst'
import { IconCancel } from '../../public/icons'
import { RippleButton } from '../Ripple'

export const AwesomeModal = ({
  title,
  size = MODAL_SIZES.medium,
  show,
  disabled,
  display,
  zIndex,
  cancel,
  confirm,
  padding,
  backdrop = true,
  useScroll = false,
  keyboard = true,
  footer = true,
  btnCancel = true,
  openLateral,
  btnConfirm = true,
  children,
  hideOnConfirm = true,
  timeOut = 200,
  height,
  bgColor,
  submit = false,
  header = true,
  closeIcon = false,
  borderRadius = '.3rem',
  onHide = () => { return undefined },
  onCancel = () => { return undefined },
  onConfirm = () => { return undefined }
}) => {
  const [state, setState] = useState(show)
  const [backdropA, setAnimationBackdrop] = useState(false)
  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (backdrop !== 'static') {
      if (keyboard && show) window.addEventListener('keyup', e => { return e.code === 'Escape' && hide() })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => { return keyboard && window.removeEventListener('keyup', () => { }) }
    }
  }, [keyboard, hide, show, backdrop])
  useEffect(() => {
    setState(show)
  }, [show])
  const onBackdropHide = e => {
    e.preventDefault()
    if (backdrop === 'static') {
      setAnimationBackdrop(!backdropA)
    } else {
      hide()
    }
  }
  useEffect(() => {
    if (show && useScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show, useScroll])
  const clickCancel = () => {
    hide()
    onCancel()
  }
  const clickConfirm = () => {
    if (hideOnConfirm) hide()
    onConfirm()
  }
  return (
    <Container
      bgColor={bgColor}
      onMouseDown={onBackdropHide}
      openLateral={openLateral}
      show={show}
      showLateral={show}
      state={state}
      zIndex={zIndex}
    >
      <Modal
        backdropA={backdropA}
        borderRadius={borderRadius}
        height={height}
        onMouseDown={e => { return e.stopPropagation() }}
        show={show}
        showLateral={show}
        size={size}
        state={state}
      >
        {header && <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <BtnClose onClick={hide}><IconCancel size='20px' /></BtnClose>
          {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
        </ModalHeader>}
        <ModalBody
          display={display}
          height={height}
          padding={padding}
        >
          {children}
          {!footer && <ModalFooter>
            {btnCancel ? <RippleButton
              border
              disabled={disabled}
              onClick={clickCancel}
              type='button'
            >{cancel || BUTTONS_TEXT.cancel}</RippleButton> : <div>as </div>}
            {btnConfirm && <RippleButton
              border
              onClick={clickConfirm}
              type={submit ? 'submit' : 'button'}
            >{confirm || BUTTONS_TEXT.confirm}</RippleButton>}
          </ModalFooter>}
        </ModalBody>
      </Modal>
    </Container>
  )
}

AwesomeModal.propTypes = {
  backdrop: PropTypes.bool,
  bgColor: PropTypes.any,
  borderRadius: PropTypes.string,
  btnCancel: PropTypes.bool,
  btnConfirm: PropTypes.bool,
  cancel: PropTypes.any,
  children: PropTypes.any,
  closeIcon: PropTypes.bool,
  confirm: PropTypes.any,
  disabled: PropTypes.any,
  display: PropTypes.any,
  footer: PropTypes.bool,
  header: PropTypes.bool,
  height: PropTypes.any,
  hideOnConfirm: PropTypes.bool,
  keyboard: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onHide: PropTypes.func,
  openLateral: PropTypes.any,
  padding: PropTypes.any,
  show: PropTypes.any,
  size: PropTypes.any,
  submit: PropTypes.bool,
  timeOut: PropTypes.number,
  title: PropTypes.any,
  useScroll: PropTypes.bool,
  zIndex: PropTypes.any
}
