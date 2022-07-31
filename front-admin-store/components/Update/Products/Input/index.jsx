import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { BoxInput, Input, LabelInput, TextAreaInput } from './styled'
import { isEmail, isNull, isPassword, onlyLetters, passwordConfirm, rangeLength } from '../../../../utils'

export const InputHook = props => {
  const { name, value, onChange, label, error,
    required,
    numeric,
    letters,
    range,
    email,
    pass,
    placeholder,
    TypeTextarea,
    type,
    passConfirm
  } = props
  const [errors, setError] = useState(error)
  const [message, setMessage] = useState('El campo no debe estar vacío')
  // Función para activar el error
  const errorFunc = (e, v, m) => {
    setError(v)
    setMessage(m)
    onChange(e, v)
  }
  useEffect(() => {
    setError(error)
  }, [error])
  /**
     * @description Función que para validar los campos de texto por el método onChange
     * @version 0.0.1
     * @param {object} e evento del método change
     * @return {boolean} devuelve true o false si la validación es correcta o incorrecta
     *
     */
  // eslint-disable-next-line consistent-return
  const validations = e => {
    // Valida que el campo no sea nulo
    if (required) {
      if (isNull(e.target.value)) { return errorFunc(e, true, 'El campo no debe estar vacío') }
      errorFunc(e, false, '')
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(e.target.value)) { return errorFunc(e, true, 'El campo debe ser numérico') }
      errorFunc(e, false, '')
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value)) { return errorFunc(e, true, 'El campo debe contener solo letras') }
      errorFunc(e, false, '')
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max)) {
        return errorFunc(
          e,
          true,
          `El rango de carácteres es de ${range.min} a ${range.max}`
        )
      }
      errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value)) { return errorFunc(e, true, 'Formato de correo inválido') }
      errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de contraseña correcto
    if (pass) {
      if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') }
      errorFunc(e, false, '')
    }
    // Valida que las contraseñas coincidan
    if (passConfirm?.validate) {
      if (passwordConfirm(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') }
      errorFunc(e, false, '')
    }
  }
  return (
    <>
      <BoxInput>
        {!TypeTextarea ? <Input
          name={name}
          onChange={validations}
          placeholder={placeholder}
          type={type}
          value={value}
        /> :
          <TextAreaInput
            name={name}
            onChange={validations}
            placeholder={placeholder}
            type={type}
            value={value}
          />}
        <LabelInput >{label}</LabelInput>
        {errors && <label>{message}</label>}
      </BoxInput>
    </>
  )
}
InputHook.propTypes = {
  TypeTextarea: PropTypes.any,
  email: PropTypes.any,
  error: PropTypes.any,
  label: PropTypes.any,
  letters: PropTypes.any,
  name: PropTypes.any,
  numeric: PropTypes.any,
  onChange: PropTypes.func,
  pass: PropTypes.any,
  passConfirm: PropTypes.shape({
    passValue: PropTypes.any,
    validate: PropTypes.any
  }),
  placeholder: PropTypes.any,
  range: PropTypes.shape({
    max: PropTypes.any,
    min: PropTypes.any
  }),
  required: PropTypes.any,
  type: PropTypes.any,
  value: PropTypes.any
}
