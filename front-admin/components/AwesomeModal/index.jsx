import React, { useState, useEffect, useCallback } from 'react'
import { Container, Wrapper, Modal, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter } from './styled'
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
    onHide = () => undefined,
    onCancel = () => undefined,
    onConfirm = () => undefined
}) => {
    const [state, setState] = useState(show)
    const [backdropA, setAnimationBackdrop] = useState(false)
    const hide = useCallback(() => {
        setState(false)
        onCancel()
        setTimeout(onHide, timeOut)
    }, [onCancel, onHide, timeOut])
    useEffect(() => {
        if (backdrop !== 'static') {
            if (keyboard && show) window.addEventListener('keyup', e => e.code === 'Escape' && hide())
            return () => keyboard && window.removeEventListener('keyup', () => { })
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
        <Container show={show} bgColor={bgColor} showLateral={show} zIndex={zIndex} state={state} openLateral={openLateral} onMouseDown={onBackdropHide}>
            <Wrapper backdropA={backdropA} onMouseDown={onBackdropHide}>
                <Modal backdropA={backdropA} height={height} borderRadius={borderRadius} show={show} showLateral={show} state={state} size={size} onMouseDown={e => e.stopPropagation()} >
                    {header && <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <BtnClose onClick={hide}><IconCancel size='20px' /></BtnClose>
                    </ModalHeader>}
                    {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
                    <ModalBody display={display} padding={padding} height={height}>
                        {children}
                        {footer && <ModalFooter>
                            {btnCancel ? <RippleButton disabled={disabled} border type='button' onClick={clickCancel}>{cancel || BUTTONS_TEXT.cancel}</RippleButton> : <div>as </div>}
                            {btnConfirm && <RippleButton type={submit ? 'submit' : 'button'} border onClick={clickConfirm}>{confirm || BUTTONS_TEXT.confirm}</RippleButton>}
                        </ModalFooter>}
                    </ModalBody>
                </Modal>
            </Wrapper>
        </Container>
    )
}
