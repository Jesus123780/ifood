import React, { useState, useEffect } from 'react'
import { BoxInput, Input, LabelInput } from './styled';
import { isEmail, isNull, isPassword, onlyLetters, passwordConfirm, rangeLength } from '../../../../utils'

export const InputHook = props => {
    const { name, value, onChange, label, error,
        required,
        numeric,
        letters,
        range,
        email,
        pass,
        type,
        passConfirm, } = props
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
    const validations = e => {
        // Valida que el campo no sea nulo
        if (required) {
            if (isNull(e.target.value)) { return errorFunc(e, true, 'El campo no debe estar vacío') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea tipo numérico
        if (numeric) {
            if (isNaN(e.target.value)) { return errorFunc(e, true, 'El campo debe ser numérico') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo sea solo letras
        if (letters) {
            if (onlyLetters(e.target.value)) { return errorFunc(e, true, 'El campo debe contener solo letras') }
            else errorFunc(e, false, '')
        }
        // Valida que el campo esté en el rango correcto
        if (range) {
            if (rangeLength(e.target.value, range.min, range.max)) {
                return errorFunc(
                    e,
                    true,
                    `El rango de carácteres es de ${ range.min } a ${ range.max }`
                )
            }
            else errorFunc(e, false, '')
        }
        // Valida si el campo tiene un formato de email correcto
        if (email) {
            if (isEmail(e.target.value)) { return errorFunc(e, true, 'Formato de correo inválido') }
            else errorFunc(e, false, '')
        }
        // Valida si el campo tiene un formato de contraseña correcto
        if (pass) {
            if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') }
            else errorFunc(e, false, '')
        }
        // Valida que las contraseñas coincidan
        if (passConfirm?.validate) {
            if (passwordConfirm(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') }
            else errorFunc(e, false, '')
        }
    }
    return (
        <>
            <BoxInput>
                <Input name={name}
                    value={value}
                    type={type}
                    onChange={validations}
                />
                <LabelInput >{label}</LabelInput>
                {errors && <label>{message}</label>}
            </BoxInput>
        </>
    )
}