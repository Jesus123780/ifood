import { IconDeleteKeyboard } from '@/public/icons'
import React from 'react'

const Option = ({ values, isBackspace, onClick }) => {return (
  <button
    className={isBackspace ? 'delete' : 'Option_button'}
    onClick={() => {return onClick(isBackspace ? null : values)}}
  >
    {isBackspace ? <IconDeleteKeyboard size={24} /> : <p>{`${values[0]}`}</p>}
  </button>
)}

export default Option
