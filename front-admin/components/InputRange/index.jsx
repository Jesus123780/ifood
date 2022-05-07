import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const Range = ({ min = 0, max = 100, value = 0, label }) => {
  const [currentValue, setCurrentValue] = useState(value)
  const inputWidth = 600
  const width = inputWidth - 15
  const percent = (currentValue - min) / (max - min)
  const offset = -3

  return (
    <div className='range'>
      <div className='range__ballon' style={{ left: width * percent + offset || 0 }}>
        <span className='range__ballon__value'>{currentValue}</span>
        <span className='range__ballon__label'>{label}</span>
      </div>

      <input
        max={max}
        min={min}
        onChange={evt => {return setCurrentValue(evt.target.value)}}
        type='range'
        value={currentValue}
      />
    </div>
  )
}
Range.propTypes = {
  label: PropTypes.any,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number
}
