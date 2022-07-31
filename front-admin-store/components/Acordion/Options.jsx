import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setHeight(active ? (height + heightMenu) : refButton.current.clientHeight - refMenu.current.clientHeight)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <MenuLeft
      active={active}
      height={height}
      onClick={e => {return handleClick(e)}}
      ref={refButton}
      type='button'
    >
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
  active: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  icon: PropTypes.node,
  index: PropTypes.number,
  label: PropTypes.string,
  path: PropTypes.string
}

export default Options