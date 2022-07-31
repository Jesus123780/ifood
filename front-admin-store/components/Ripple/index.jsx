import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

export const RippleButton = props => {
  const { label, onClick, style, family, standard, active, type, widthButton } = props
  const button = useRef(null)

  useEffect(() => {
    let mounted = true
    const b = button.current
    b.addEventListener('click', e => {
      const rect = button.current.getBoundingClientRect()
      const ripple = document.createElement('div')
      const width = Math.max(rect.width, rect.height) * 2
      ripple.style.width = `${ width }px`
      ripple.style.height = `${ width }px`
      ripple.style.left = `${ e.clientX - rect.left - width / 2 }px`
      ripple.style.top = `${ e.clientY - rect.top - width / 2 }px`
      ripple.className = 'ripple'
      button.current.appendChild(ripple)

      setTimeout(() => {return mounted && button?.current?.removeChild(ripple)}, 1000)
    })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Button
      active={active}
      bgColor={ props.bgColor}
      className='ripple-button'
      color={ props.color }
      family={family}
      margin={ props.margin }
      onClick={onClick}
      padding={ props.padding }
      radius={props.radius}
      ref={button}
      standard={standard}
      style={style}
      type={type}
      widthButton={widthButton}
      {...props}
    >
      <span id='ripple-button-label'>{label}</span>
      {props.children}
    </Button>
  )
}

RippleButton.propTypes = {
  active: PropTypes.any,
  bgColor: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.any,
  family: PropTypes.any,
  label: PropTypes.any,
  margin: PropTypes.any,
  onClick: PropTypes.any,
  padding: PropTypes.any,
  radius: PropTypes.any,
  standard: PropTypes.any,
  style: PropTypes.any,
  type: PropTypes.any,
  widthButton: PropTypes.any
}
const Button = styled.button`

&:disabled {
  background-color: ${`${PColor}87`};
  cursor: no-drop;
}
 padding: ${ ({ padding })=> {return padding ? padding: '1em'} };
 background-color: ${ ({ bgColor })=> {return bgColor ? bgColor: 'red'} };
 color: ${ ({ color })=> {return color ? color: BGColor} };
 font-family: ${ ({ family })=> {return family ? family: 'PFont-Light'} };
 width: ${ ({ widthButton })=> {return widthButton ? widthButton: '100%'} };
 ${ ({ margin }) => {return margin && css`margin: ${ margin };`} }
 ${ ({ border }) => {return border && css`border: ${ border };`}}
 ${ ({ radius }) => {return radius && css`border-radius: ${ radius };`}}
 ${ ({ height }) => {return height && css`height: ${ height };`}}
`