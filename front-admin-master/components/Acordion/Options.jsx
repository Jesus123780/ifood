import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// import { useLocation } from 'react-router-dom'
import { MenuLeft, OptionMenu, Span, Row } from './Styled'
import { useRouter } from 'next/router'

const Options = ({ index, active, children, label, path, handleClick, icon }) => {

    const [height, setHeight] = useState(0)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()
    const location = useRouter()

    useEffect(() => {
        setHeight(refButton.current.clientHeight - refMenu.current.clientHeight)
        setHeightMenu(refMenu.current.clientHeight)
        !!location.pathname.includes(path) && handleClick(index)
    }, [])

    useEffect(() => {
        setHeight(active ? (height + heightMenu) : refButton.current.clientHeight - refMenu.current.clientHeight)
    }, [active])

    return (
        <MenuLeft type='button' onClick={e => handleClick(e)} active={active} ref={refButton} height={height}>
            <Row active={active}>
                {icon}
                <Span active={active}>{label}</Span>
            </Row>
            <OptionMenu active={active} ref={refMenu}>
                {children}
            </OptionMenu>
        </MenuLeft>
    )
}

Options.propTypes = {
    index: PropTypes.number,
    active: PropTypes.bool,
    children: PropTypes.node,
    label: PropTypes.string,
    path: PropTypes.string,
    handleClick: PropTypes.func,
    icon: PropTypes.any
}

export default Options