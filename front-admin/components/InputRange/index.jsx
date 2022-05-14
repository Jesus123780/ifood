import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const Range = ({ min = 0, max = 100, value = 0, label, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const inputWidth = 900
  const width = inputWidth - 15
  const percent = (currentValue - min) / (max - min)
  const offset = -3
  const onChangeInput = (event) => {
    setCurrentValue(event.target.value)
    onChange(event)
  }
  return (
    <div className='range'>
      <div className='range__ballon' style={{ left: width * percent + offset || 0 }}>
        <span className='range__ballon__label'>{label}</span>
        <span className='range__ballon__value'>{currentValue}</span>
      </div>

      <input
        max={max}
        min={min}
        onChange={evt => { return onChange ? onChangeInput(evt) : setCurrentValue(evt.target.value) }}
        type='range'
        value={currentValue}
      />
    </div>
  )
}
Range.propTypes = {
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number
}
