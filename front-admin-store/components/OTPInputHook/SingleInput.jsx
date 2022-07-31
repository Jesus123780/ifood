import PropTypes from 'prop-types'
import React, { memo, useRef, useLayoutEffect, useEffect } from 'react'
import styled from 'styled-components'
const usePrevious = (value) => {
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export const SingleOTPInputComponent = (props) => {
  const { focus, autoFocus, ...rest } = props
  const inputRef = useRef(null)
  const prevFocus = usePrevious(!!focus)
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return (
    <Content>
      <Input ref={inputRef} {...rest} />
    </Content>
  )
}

SingleOTPInputComponent.propTypes = {
  autoFocus: PropTypes.any,
  focus: PropTypes.any
}

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
` 
const Input = styled.input`
    width: 60px;
    height: 50px;
    height: 40px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    text-align: center;
`
const SingleOTPInput = memo(SingleOTPInputComponent)
export default SingleOTPInput
