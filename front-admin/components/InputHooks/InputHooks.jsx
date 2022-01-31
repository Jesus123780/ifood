/* eslint-disable react/prop-types */
/* eslint no-console: "error" */
/* eslint no-console: ["error", { allow: ["warn"] }] */
import React, { useEffect, useReducer, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { BoxInput, InputV, LabelInput, ShowPass, Tooltip, TextAreaInput, Listbox, List } from './styled'
import { IconNoShow, IconShowEye } from '../../public/icons'
import { SFVColor } from '../../public/colors'
import { useKeyPress } from '../hooks/useKeypress'
import {  isEmail, isNull, isPassword, onlyLetters, passwordConfirm, rangeLength } from '../../utils'

const InputHooks = ({
  reference,
  title,
  disabled,
  onBlur,
  fontSize,
  paddingInput,
  width,
  minWidth,
  display,
  maxWidth,
  TypeTextarea,
  padding,
  radius,
  margin,
  labelColor,
  placeholder,
  type,
  value,
  onChange,
  name,
  required,
  numeric,
  border,
  checked,
  letters,
  range,
  email,
  pass,
  onFocus,
  passConfirm,
  error
}) => {
  // STATE
  const [errors, setError] = useState(error)
  // const [valueInput, setValue] = useState(value)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [message, setMessage] = useState('El campo no debe estar vacío')
  // HM
  const errorFunc = (e, v, m) => {
    setError(v)
    v && setMessage(m)
    onChange(e, v)
  }
  useEffect(() => {
    setError(error)
  }, [error])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionList, setSuggestionList] = useState([])
  // Validation email
  const topLevelEmailDomainList = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'yahoo.com',
    'icloud.com'
  ]
  const otherLevelEmailDomainList = [
    'gmail.com',
    'gmail.co.uk',
    'outlook.com',
    'outlook.co.uk',
    'yahoo.com',
    'yahoo.ca',
    'hotmail.com',
    'live.com',
    'icloud.com'
  ]
  const provideEmailSuggestion = (email) => {
    const emailParts = email.split('@')
    const emailUsername = emailParts[0]
    const emailDomain = emailParts[1]
    let suggestionList = []
    if (emailDomain !== undefined) {
      if (emailDomain === '') {
        suggestionList = topLevelEmailDomainList?.map(
          domain => emailUsername + '@' + domain
        )
      } else {
        suggestionList = otherLevelEmailDomainList.filter(domain => domain.startsWith(emailDomain)).map(domain => emailUsername + '@' + domain)
      }
    }
    return suggestionList
  }

  const autoCompleteEmail = (email) => {
    setShowSuggestions(false)
    // errorMessage: '',
    if (email) {
      const suggestionList = provideEmailSuggestion(email)
      if (suggestionList.length > 1) {
        setShowSuggestions(true)
        setSuggestionList(suggestionList)
      } else {
        const errorMessage = simpleVerifyEmail(email)
        if (errorMessage) {
        }
      }
    }
  }
  const arrowUpPressed = useKeyPress('ArrowUp')
  const backSpace = useKeyPress('backSpace')
  const arrowDownPressed = useKeyPress('ArrowDown')
  const initialState = { selectedIndex: 0 }
  function reducer (state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0 ? state.selectedIndex - 1 : topLevelEmailDomainList.length - 1
        }
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== topLevelEmailDomainList.length - 1 ? state.selectedIndex + 1 : 0
        }
      // case 'Backspace':
      //   return {
      //     selectedIndex:
      //   }
      case 'select':
        return { selectedIndex: action.payload }
      default: return null
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' })
    }
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' })
    }
    if (backSpace) {
      dispatch({ type: 'Backspace' })
    }
  }, [arrowUpPressed, arrowDownPressed, backSpace])
  const refInput = useRef()
  const handleSuggestionOnClick = (suggestion) => {
    // setEmail(suggestion)
    setShowSuggestions(!showSuggestions)
    // setValue(suggestion)
    setTimeout(() => {
      refInput.current.focus()
    })
  }
  /**
     * @description Which function to validate the text fields by the onChange method
     * @version 0.0.1
     * @param {object} e change method event
     * @return {boolean} returns true or false if validation is successful or unsuccessful
     *
     */
  const validations = e => {
    // autoCompleteEmail
    autoCompleteEmail(e.target.value)
    // setValue(e.target.value)
    // Valida que el campo no sea nulo
    if (required) {
      if (isNull(e.target.value)) { return errorFunc(e, true, '') } else errorFunc(e, false, '')
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(e.target.value)) { return errorFunc(e, true, 'El campo debe ser numérico') } else errorFunc(e, false, '')
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value)) { return errorFunc(e, true, 'El campo debe contener solo letras') } else errorFunc(e, false, '')
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max)) {
        return errorFunc(
          e,
          true,
          `El rango de carácteres es de ${range.min} a ${range.max}`
        )
      } else errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value)) { return errorFunc(e, true, 'Email Address must be valid') } else errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de contraseña correcto
    if (pass) {
      if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') } else errorFunc(e, false, '')
    }
    // Valida que las contraseñas coincidan
    if (passConfirm?.validate) {
      if (passwordConfirm(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') } else errorFunc(e, false, '')
    }
  }
  const simpleVerifyEmail = (email) => {
    const emailParts = email.split('@')
    const emailDomain = emailParts[1]
    let errorMessage = ''
    if (emailDomain !== undefined) {
      if (emailDomain === '') {
        errorMessage = 'please provide email address domain'
        setMessage(errorMessage)
      } else {
        const validDomainRegExp = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-+]?){0,62})\w)+)\.(\w{2,6})$/
        if (!emailDomain.match(validDomainRegExp)) {
          errorMessage = 'please verify email address domain'
          setMessage(errorMessage)
        }
      }
    }
    return errorMessage
  }
  const handleBlur = () => {
    // setTimeout(() => setShowSuggestions(!showSuggestions))
  }
  return (
    <BoxInput width={width} maxWidth={maxWidth} padding={padding} minWidth={minWidth}>
      {pass && <ShowPass type='button' onClick={() => setIsPasswordShown(!isPasswordShown)}>
        {isPasswordShown ? <IconNoShow size='20px' /> : <IconShowEye size='20px' />}
      </ShowPass>}
      {!TypeTextarea
        ? <div>
          <InputV
            value={value || ''}
            ref={email ? refInput : reference}
            onChange={validations}
            name={name}
            margin={margin}
            display={display}
            disabled={disabled}
            checked={checked}
            onBlur={onBlur || handleBlur}
            // autoComplete="off"
            size={fontSize}
            radius={radius}
            border={border}
            error={errors}
            focus={onFocus}
            placeholder={placeholder}
            type={isPasswordShown ? 'text' : type}
            autoComplete={type === 'password' ? 'current-password' : email ? 'off' : 'true'}
            paddingInput={paddingInput}
          />
          {(email && !!showSuggestions) && (
            <div>
              <Listbox role="listbox" >
                {suggestionList.map((suggestion, index) => (
                  <List onClick={() => { dispatch({ type: 'select', payload: index }); handleSuggestionOnClick(suggestion) }} style={{ cursor: 'pointer', backgroundColor: index === state.selectedIndex ? `${SFVColor}2e` : 'transparent' }} aria-pressed={index === state.selectedIndex} tabIndex={0} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      dispatch({ type: 'select', payload: index })
                      e.target.blur()
                    }
                  }} key={index} >
                    {suggestion}
                  </List>
                ))}
              </Listbox>
            </div>
          )}
        </div>
        : <TextAreaInput
          ref={reference}
          value={value || ''}
          onChange={validations}
          name={name}
          disabled={disabled}
          width={width} maxWidth={maxWidth} minWidth={minWidth}
          onBlur={onBlur}
          border={border}
          size={fontSize}
          padding={padding}
          radius={radius}
          error={errors}
          placeholder={placeholder}
          paddingInput={paddingInput}
        />}

      {<LabelInput value={value} type={type} labelColor={labelColor} error={error}>{title}</LabelInput>}
      {errors && <Tooltip>{message}</Tooltip>}
    </BoxInput>
  )
}

/**
 * import React, { useCallback, useEffect, useState } from "react";

interface CheckboxProps {
  name: string;
  checkAll: boolean;
  defaultChecked?: boolean;
  onCheck: (name: string) => void;
}

export const Checkbox = ({
  name,
  checkAll,
  defaultChecked,
  onCheck
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleCheck = useCallback(
    (name: string) => {
      setChecked(!checked);
      onCheck(name);
    },
    [checked, onCheck]
  );

  useEffect(() => {
    if (checkAll) {
      setChecked(true);
    }

    if (!checkAll && defaultChecked) {
      setChecked(true);
    }

    if (!defaultChecked && checkAll) {
      setChecked(true);
    }

    if (!defaultChecked && !checkAll) {
      setChecked(false);
    }
  }, [checkAll, defaultChecked]);

  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={() => handleCheck(name)}
    />
  );
};
 */

InputHooks.propTypes = {
  onBlur: PropTypes.func,
  error: PropTypes.func || PropTypes.bool,
  onChange: PropTypes.func,
  minLenght: PropTypes.number,
  maxLenght: PropTypes.number,
  email: PropTypes.bool,
  numeric: PropTypes.bool,
  letters: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.bool,
  required: PropTypes.bool,
  pass: PropTypes.bool,
  TypeTextarea: PropTypes.bool,
  passConfirm: PropTypes.object,
  dataIgnore: PropTypes.bool,
  type: PropTypes.string,
  maxWidth: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  placeholder: PropTypes.string,
  radius: PropTypes.string,
  range: PropTypes.object,
  fontSize: PropTypes.string,
  defaultValue: PropTypes.string,
  reference: PropTypes.object,
  minWidth: PropTypes.string || PropTypes.number,
  border: PropTypes.string || PropTypes.number,
  padding: PropTypes.string || PropTypes.number,
  labelColor: PropTypes.string || PropTypes.number,
  bgColor: PropTypes.string || PropTypes.number,
  value: PropTypes.string || PropTypes.number,
  paddingInput: PropTypes.string || PropTypes.number
}

export default InputHooks
