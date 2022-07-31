import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { SFVColor } from '../../public/colors'
import { IconNoShow, IconShowEye } from '../../public/icons'
import { isCC, isEmail, isNull, isPassword, onlyLetters, passwordConfirm, rangeLength, valNit } from '../../utils'
import { useKeyPress } from '../hooks/useKeypress'
import { BoxInput, InputV, LabelInput, List, Listbox, ShowPass, TextAreaInput, Tooltip } from './styled'

const InputHooks = ({
  reference,
  title = '',
  disabled,
  onBlur = () => { return },
  fontSize = '14px',
  paddingInput = '',
  setDataValue = () => { return },
  width = '100%',
  dataForm,
  minWidth = '',
  display = '',
  maxWidth = '',
  TypeTextarea = '',
  padding = '',
  radius = '',
  margin,
  Cc,
  labelColor,
  placeholder,
  type,
  value,
  onChange,
  name,
  required,
  numeric,
  nit,
  border,
  checked,
  letters,
  height,
  autoComplete,
  range,
  email,
  pass,
  onFocus,
  passConfirm,
  error
}) => {
  // STATE
  const [errors, setError] = useState(error)
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
          domain => { return emailUsername + '@' + domain }
        )
      } else {
        suggestionList = otherLevelEmailDomainList.filter(domain => { return domain.startsWith(emailDomain) }).map(domain => { return emailUsername + '@' + domain })
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
        // eslint-disable-next-line no-empty
        if (errorMessage) {
        }
      }
    }
  }
  const arrowUpPressed = useKeyPress('ArrowUp')
  const backSpace = useKeyPress('backSpace')
  const arrowDownPressed = useKeyPress('ArrowDown')
  const initialState = { selectedIndex: 0 }
  function reducer(state, action) {
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
      case 'Backspace':
        return {
          selectedIndex: 0
        }
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
  const handleSuggestionOnClick = () => {
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
  // eslint-disable-next-line consistent-return
  const validations = e => {
    autoCompleteEmail(e.target.value)
    // Valida que el campo no sea nulo
    if (required) {
      if (isNull(e.target.value)) return errorFunc(e, true, 'El campo no debe estar vacío')
      errorFunc(e, false, '')
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(e.target.value)) return errorFunc(e, true, 'El campo debe ser numérico')
      errorFunc(e, false, '')
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value)) return errorFunc(e, true, 'El campo debe contener solo letras')
      errorFunc(e, false, '')
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max)) return errorFunc(e, true, `El rango de carácteres es de ${range.min} a ${range.max}`)
      errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value)) return errorFunc(e, true, 'El formato de email no es válido')
      errorFunc(e, false, '')
    }
    if (pass) {
      if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') } errorFunc(e, false, '')
    }
    if (nit) {
      if (valNit(e.target.value)) { return errorFunc(e, true, 'El nit no es correcto') } errorFunc(e, false, '')
    }
    if (Cc) {
      if (isCC(e.target.value)) { return errorFunc(e, true, 'El numero de documento no es correcto') } errorFunc(e, false, '')
    }
    // Valida que las contraseñas coincidan
    if (passConfirm?.validate) {
      if (passwordConfirm(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') } errorFunc(e, false, '')
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
        // eslint-disable-next-line no-useless-escape
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
    // setTimeout(() => setShowSuggestions(false))
  }
  const handleFocus = () => {
    // setTimeout(() => setShowSuggestions(true))
  }

  return (
    <BoxInput
      maxWidth={maxWidth}
      minWidth={minWidth}
      padding={padding}
      width={width}
    >
      {pass && <ShowPass onClick={() => { return setIsPasswordShown(!isPasswordShown) }} type='button'>
        {isPasswordShown ? <IconNoShow size='20px' /> : <IconShowEye size='20px' />}
      </ShowPass>}
      {!TypeTextarea
        ? <div>
          <InputV
            autoComplete={type === 'password' ? 'current-password' : email ? 'off' : !autoComplete ? 'off' : autoComplete}
            border={border}
            checked={checked}
            disabled={disabled}
            display={display}
            error={errors}
            focus={onFocus}
            margin={margin}
            name={name}
            onBlur={onBlur || handleBlur}
            onChange={(e) => { return validations(e) }}
            onFocus={handleFocus}
            paddingInput={paddingInput}
            placeholder={placeholder}
            radius={radius}
            ref={email ? refInput : reference}
            size={fontSize}
            type={isPasswordShown ? 'text' : type}
            value={value}
          />
          {(email && !!showSuggestions) && (
            <div>
              <Listbox role='listbox' >
                {suggestionList.map((suggestion, index) => {
                  return (
                    <List
                      aria-pressed={index === state.selectedIndex}
                      key={index}
                      onClick={() => {
                        dispatch({ type: 'select', payload: index })
                        handleSuggestionOnClick()
                        setDataValue({ ...dataForm, [name]: suggestion })
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          dispatch({ type: 'select', payload: index })
                          e.target.blur()
                        }
                      }}
                      style={{ cursor: 'pointer', backgroundColor: index === state.selectedIndex ? `${SFVColor}2e` : 'transparent' }}
                      tabIndex={0}
                    >
                      {suggestion}
                    </List>
                  )
                })}
              </Listbox>
            </div>
          )}
        </div>
        : <TextAreaInput
          border={border}
          disabled={disabled}
          error={errors}
          height={height}
          maxWidth={maxWidth}
          minWidth={minWidth}
          name={name}
          onBlur={onBlur}
          onChange={validations}
          padding={padding}
          paddingInput={paddingInput}
          placeholder={placeholder}
          radius={radius}
          ref={reference}
          size={fontSize}
          value={value || ''}
          width={width}
        />}
      {<LabelInput
        error={error}
        labelColor={labelColor}
        type={type}
        value={value}
      >{title}</LabelInput>}
      {errors && <Tooltip>{message}</Tooltip>}
    </BoxInput>
  )
}

InputHooks.propTypes = {
  TypeTextarea: PropTypes.any,
  autoComplete: PropTypes.any,
  border: PropTypes.any,
  checked: PropTypes.any,
  dataForm: PropTypes.any,
  disabled: PropTypes.any,
  display: PropTypes.any,
  email: PropTypes.shape({
    split: PropTypes.func
  }),
  error: PropTypes.any,
  fontSize: PropTypes.any,
  labelColor: PropTypes.any,
  letters: PropTypes.any,
  margin: PropTypes.any,
  maxWidth: PropTypes.any,
  minWidth: PropTypes.any,
  name: PropTypes.any,
  numeric: PropTypes.any,
  onBlur: PropTypes.any,
  onChange: PropTypes.func,
  onFocus: PropTypes.any,
  padding: PropTypes.any,
  paddingInput: PropTypes.any,
  pass: PropTypes.any,
  passConfirm: PropTypes.shape({
    passValue: PropTypes.any,
    validate: PropTypes.any
  }),
  placeholder: PropTypes.any,
  radius: PropTypes.any,
  range: PropTypes.shape({
    max: PropTypes.any,
    min: PropTypes.any
  }),
  reference: PropTypes.any,
  required: PropTypes.any,
  setDataValue: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.any
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

export default InputHooks
