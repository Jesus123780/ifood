import PropTypes from 'prop-types'
import { PColor } from 'public/colors'
import React, { useCallback, useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'

export const Checkbox = ({
  id,
  label,
  checked,
  onChange = () => { return },
  indeterminate = false,
  disabled = false,
  className = '',
  ...restProps
}) => {
  const inputEl = useRef(null)

  const syncIndeterminateState = useCallback(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.indeterminate = indeterminate
    }
  }, [inputEl, indeterminate])

  useEffect(() => {
    syncIndeterminateState()
  }, [indeterminate, syncIndeterminateState])

  const handleChange = event => {
    if (indeterminate) {
      syncIndeterminateState()
    }
    onChange(event, id)
  }
  const disabledStyles = { color: 'red', width: 'min-content' }

  return (
    <Span
      className={className || ''}
      id={id}
      {...restProps}
      style={disabled ? disabledStyles : {}}
    >
      <CheckboxAtom
        checked={checked}
        disabled={disabled}
        id={`checkbox-${id}`}
        onChange={handleChange}
        ref={inputEl}
        type='checkbox'
      />
      {<CheckboxLabel checked={checked === true} htmlFor={`checkbox-${id}`}>{label}</CheckboxLabel>}
    </Span>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.any,
  indeterminate: PropTypes.bool,
  label: PropTypes.any,
  onChange: PropTypes.func
}
const checkboxCheck = keyframes`
  0%: {
    width: 0;
    height: 0;
    border-color: #fff;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  33%: {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  100%: {
    width: 0.2em;
    height: 0.5em;
    border-color: #fff;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
`
const Span = styled.span`
      align-items: center;
    display: grid;

`
const CheckboxLabel = styled.label`
  position: relative;
  position: relative;
    display: flex;
    margin: 0.6em 0;
    align-items: center;
    color: #9e9e9e;
    transition: color 250ms cubic-bezier(0.4,0,0.23,1);
  &&::before {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    width:2em;
    height: 2em;
    background: transparent;
    box-shadow: 0 0 0 2px #9e9e9e inset;
    border-radius: 50%;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4,0,0.23,1);
}
${props => {
    return props.checked && css`
  &&::before {
    content: '';
    box-shadow: 0 0 0 0.5em ${PColor} inset;
    animation: ${checkboxCheck} 200ms cubic-bezier(0.4, 0, 0.23, 1);
  }
  `}}

`
const CheckboxAtom = styled.input`
  width: 0;
  height  : 0;
 
`

