import React from 'react'
import PropTypes from 'prop-types'
import { Container, DropdownItem } from './styled'
import { IconArrowBottom } from '../../public/icons'

export const DropdownMenu = ({ options= [], show, position }) => {

    if (!show) return <></>
    return <Container position={position}>
        {/* eslint-disable-next-line*/}
        {options?.map((x, i) => <DropdownItem key={'context_menu_option_' + i} onClick={x?.action || (() => true)}>
            {x?.icon && <IconArrowBottom icon={x.icon} style={{ marginRight: '10px' }}/>}
            {x?.optionName}
        </DropdownItem>)}
    </Container>
}

DropdownMenu.propTypes = {
    options: PropTypes.array,
    show: PropTypes.bool,
    position: PropTypes.object,
    onClickOutside: PropTypes.func
}