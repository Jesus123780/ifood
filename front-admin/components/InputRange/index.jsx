import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ContainerRange, Input } from './styled'

export const Range = ({ min = 0, max = 100, value = 0, label, onChange, width }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const inputWidth = 600
  const widthInput = inputWidth - 15
  const percent = (currentValue - min) / (max - min)
  const offset = -3
  const onChangeInput = (event) => {
    setCurrentValue(event.target.value)
    onChange(event)
  }
  return (
    <ContainerRange>
      <div className='range__ballon' style={{ left: widthInput * percent + offset || 0 }}>
        <span className='range__ballon__label'>{label}</span>
        <span className='range__ballon__value'>{`$ ${currentValue}`}</span>
      </div>
      <Input
        max={max}
        min={min}
        onChange={evt => { return onChange ? onChangeInput(evt) : setCurrentValue(evt.target.value) }}
        type='range'
        value={currentValue}
        width={width}
      />
    </ContainerRange>
  )
}
Range.propTypes = {
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number
}
