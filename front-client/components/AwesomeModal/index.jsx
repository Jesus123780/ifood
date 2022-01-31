import React, { useState, useEffect, useCallback } from 'react'
import { Container, Wrapper, Modal, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter, BtnCancel, BtnConfirm } from './styled'
import { MODAL_SIZES, BUTTONS_TEXT } from './constanst'
import PropTypes from 'prop-types'
import { IconCancel } from '../../public/icons'
import { BGColor } from '../../public/colors'

export const AwesomeModal = ({
    title,
    size = MODAL_SIZES.medium,
    show,
    disabled,
    display,
    showLateral,
    zIndex,
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
    submit = false,
    header = true,
    closeIcon = false,
    borderRadius = '.3rem',
    onHide = () => undefined,
    onCancel = () => undefined,
    onConfirm = () => undefined
}) => {
    const [state, setState] = useState(show)
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
    console.log(backdrop)
    const onBackdropHide = e => {
        e.preventDefault()
        if (backdrop === 'static') return 0
        hide()
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
        <Container show={show} showLateral={show} zIndex={zIndex} state={state} openLateral={openLateral} onMouseDown={onBackdropHide}>
            <Wrapper onMouseDown={onBackdropHide}>
                <Modal height={height} borderRadius={borderRadius} show={show} showLateral={show} state={state} size={size} onMouseDown={e => e.stopPropagation()} >
                    {header && <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <BtnClose onClick={hide}><IconCancel size='20px' /></BtnClose>
                    </ModalHeader>}
                    {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
                    <ModalBody display={display} padding={padding} height={height}>
                        {children}
                    </ModalBody>
                    {footer && <ModalFooter>
                        {btnCancel && <BtnCancel bgColor={BGColor} disabled={disabled} border type='button' onClick={clickCancel}>{BUTTONS_TEXT.cancel}</BtnCancel>}
                        {btnConfirm && <BtnConfirm type={submit ? 'submit' : 'button'} border onClick={clickConfirm}>{BUTTONS_TEXT.confirm}</BtnConfirm>}
                    </ModalFooter>}
                </Modal>
            </Wrapper>
        </Container>
    )
}

AwesomeModal.propTypes = {
    title: PropTypes.node,
    display: PropTypes.string,
    size: PropTypes.string,
    padding: PropTypes.string,
    zIndex: PropTypes.string,
    show: PropTypes.bool,
    openLateral: PropTypes.bool,
    disabled: PropTypes.bool,
    backdrop: PropTypes.bool,
    keyboard: PropTypes.bool,
    footer: PropTypes.bool,
    btnCancel: PropTypes.bool,
    btnConfirm: PropTypes.bool,
    useScroll: PropTypes.bool,
    children: PropTypes.object,
    hiddeOnConfirm: PropTypes.bool,
    showLateral: PropTypes.bool,
    timeOut: PropTypes.number,
    height: PropTypes.string,
    header: PropTypes.bool,
    submit: PropTypes.bool,
    onHidde: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    hideOnConfirm: PropTypes.func || PropTypes.bool,
    closeIcon: PropTypes.bool,
    borderRadius: PropTypes.string,
    onHide: PropTypes.func
}
