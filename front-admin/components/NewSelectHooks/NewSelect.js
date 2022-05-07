import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BGColor, PColor, PVColor, SFColor, SFVColor } from '../../public/colors'
import { IconArrowBottom, IconCancel as IconWarning } from '../../public/icons'

// eslint-disable-next-line
export default function NewSelect ({ options, disabled, id, idD, name, onChange, optionName, value, width, search, title, padding, margin, minWidth, error, required, accessor, fullName }) {
  /** Hooks */
  const [select, setSelect] = useState(false)
  const [selectRef, setSelectRef] = useState(0)
  const [valueInput, setValueInput] = useState()
  const [selectBody, setSelectBody] = useState(0)
  const [newOption, setNewOption] = useState(false)
  const bodyHeight = 100
  const inputSearch = useRef(null)
  const [refSelect, setRefSelect] = useState(false)

  // Renderiza el valor
  const renderVal = data => {
    if (!data) return ''
    if (Array.isArray(optionName)) {
      let valueRender = ''
      //eslint-disable-next-line
            optionName.forEach(x => valueRender = `${ valueRender } ${ (accessor && data[accessor]) ? data[accessor][x] : data[x] }`)
      return valueRender
    } return data[optionName]
  }
  /** Use Effect */
  useEffect(() => {
    setNewOption(options)
  }, [options])

  /** Use Effect */
  useEffect(() => {
    if (search) { select && inputSearch.current.focus() }
  }, [select, search])

  // guarda la referencia de la caja */
  const changeRef = v => {
    setSelectRef(v.offsetTop + selectBody)
    setRefSelect(v)
  }

  // Valor selecionado
  const changeValue = v => {
    setSelect(false)
    onChange({ target: { name, value: v[id] } }, !v[id], refSelect)
  }

  // Busqueda
  const changeSearch = v => {
    setValueInput(v.target.value)
    const fil = options.filter(x => {return renderVal(x)?.toUpperCase()?.indexOf(v.target?.value?.toUpperCase()) > -1})
    setNewOption(fil)
  }

  // Función al hacer click sobre el select
  const handleClick = e => {
    e.preventDefault()
    setSelect(!select)
    setTimeout(() => {return setNewOption(options)}, 500)
  }

  const handleBlur = () => {
    setTimeout(() => {return setSelect(false)}, 400)
    setTimeout(() => {return setNewOption(options)}, 300)
  }
  // eslint-disable-next-line
    const val = options?.find(x => x[id] === value)

  return (
    <BoxSelect
      id={idD}
      margin={margin}
      padding={padding}
      ref={v => {return !!v && changeRef(v)}}
      width={width}
    >
      <FixedBox active={select} onClick={() => {return setSelect(false)}} />
      <CustomButtonS
        color={val ? SFColor : '#757575'}
        disabled={disabled}
        error={error}
        height={!val ? '50px' : ''}
        minWidth={minWidth}
        onClick={handleClick}
        type='button'
      >
        <SpanText>{renderVal(val)}</SpanText>
        <IconSel>
          <IconArrowBottom color={error ? BGColor : SFVColor} size='13px' />
        </IconSel>
      </CustomButtonS>
      <LabelInput error={error} value={value}>{title}</LabelInput>
      {error && <Tooltip>Este campo no debe estar vacío</Tooltip>}
      {/** Caja de items */}
      {select &&
                <BoxOptions
                  bottom={selectRef > bodyHeight}
                  fullName={fullName}
                  onBlur={handleBlur}
                  ref={v => {return setSelectBody(!!v && v.offsetHeight)}}
                  top={selectRef < bodyHeight}
                >
                  {search && <InputText
                    onChange={changeSearch}
                    placeholder='Buscar aquí...'
                    ref={inputSearch}
                    value={valueInput || ''}
                  />}
                  <div style={{ width: '100%' }} >
                    {newOption?.length ?
                      newOption.map(x => {return <CustomButtonS
                        key={x[id]}
                        onClick={() => {return changeValue(x)}}
                        option
                        title={renderVal(x)}
                        type='button'
                      >{renderVal(x)}</CustomButtonS>})
                      : <TextNotResult>No hay resultados...</TextNotResult>
                    }
                  </div>
                </BoxOptions>}
      <IconWarning
        color={PColor}
        size={20}
        style={{ position: 'absolute', right: 5, bottom: '10px', opacity: 0, top: '30%', pointerEvents: 'none' }}
      />
      <input
        data-required={required}
        id={id}
        name={name}
        type='hidden'
        value={value || ''}
      />
    </BoxSelect>
  )
}

const BoxSelect = styled.div`
    flex-direction: column;
    min-width: ${ ({ minWidth }) => {return minWidth || 'auto'} };
    width: ${ ({ width }) => {return width || '100%'} };
    padding: ${ ({ padding }) => {return padding || '10px 5px'} };
    border-radius: ${ ({ radius }) => {return radius || '8px'} };
    ${ ({ padding }) => {return !!padding && css`padding: ${ padding };`} }
    position: relative;
`
// Caja para ocultar al hacer click fuera del foco del select
const FixedBox = styled.div`
    display: ${ props => {return props.active ? 'block' : 'none'} };
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    z-index: ${ ({ active }) => {return active ? '9' : '-1'} };
    background-color: transparent;
`
/** mensaje de alerta */
const Tooltip = styled.div`
    position: absolute;
    display: block;
    right: 5px;
    bottom: 100%;
    background-color: ${ PColor };
    padding: 0 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 11px;
    color: #ffffff;
    &::after, &::before {
        top: 100%;
        left: 90%;
        border: solid transparent;
        content: "";
        position: absolute;
        pointer-events: none;
    }
    &::after {
        border-top-color: ${ PColor };
        border-width: 4px;
    }
    &::before {
        border-top-color: ${ PColor };
        border-width: 5px;
        margin-left: -1px;
    }
`
const LabelInput = styled.label`
    position: absolute;
    text-align: left;
    font-size: ${ ({ value }) => {return value ? '17px' : '16px'} };
    top: ${ ({ value }) => {return value ? '-5px' : '18px'} };
    left: 40px;
    color: ${ ({ value, error }) => {return value ? SFColor : (error ? BGColor : SFVColor)} };
    transition: .3s;
    pointer-events: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 80%;
    font-family: PFont-Light;
    background-color: ${ ({ value }) => {return value ? BGColor : 'transparent'} };
    padding-left: ${ ({ value }) => {return value ? '10px' : '0px'} };
    
    `
// Select
const CustomButtonS = styled.button`
    position: relative;
    display: block;
    background-color: ${ ({ bgColor, disabled, error }) => {return disabled ? 'rgba(239, 239, 239, 0.3)' : (error ? '#FBCACA' : (bgColor || '#fff'))} };
    outline: 0;
    border: ${ ({ option }) => {return option ? 'none' : `1px solid ${ SFVColor }`} };
    border-radius: 5px;
    padding: 17px ;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
    font-family: PFont-Light;
    font-size: ${ ({ size }) => {return size || '14px'} };
    color: ${ ({ color }) => {return color || SFColor} };
    width: ${ ({ width }) => {return width || '100%'} };
    ${ ({ height }) => {return !!height && css`height: ${ height };`} }
    &:hover {
        background-color: ${ BGColor };
        cursor: ${ ({ disabled }) => {return disabled ? 'no-drop' : 'pointer'} };
        ${ ({ hover }) => {return hover && css`color: ${ PVColor };`} }
    }
    &:hover ~ ${ Tooltip } { display: block;  }
    &:focus { border: 1px solid ${ PColor }; }
`
const IconSel = styled.div`
    position: absolute;
    right: -5px;
    top: 30%;
    pointer-events: none;
`
const BoxOptions = styled.div`
    position: absolute;
    left: 0px;
    bottom: ${ ({ bottom }) => {return bottom ? '100%' : '0'} };
    top: ${ ({ top }) => {return top ? '80%' : '65px'} };
    width: 100%;
    min-width: ${ props => {return props.fullName ? 'min-content' : 'auto'} };
    background-color: ${ BGColor };
    z-index: 100;

`
const SpanText = styled.label`
    font-size: 14px;
    color: ${ SFColor };
    padding-left: 15px;
`
const TextNotResult = styled.span`
    font-size: 10px;
    color: ${ SFVColor };
    padding: 0 10px; 
`
// Input Text (buscador)
export const InputText = styled.input`
    width: 100%;
    margin: 0;
    padding: 1px 8px;
    border: none;
    border-bottom: 1px solid #cccccc42;
    outline: none;
`
NewSelect.propTypes = {
  options: PropTypes.array,
  disabled: PropTypes.bool,
  id: (PropTypes.string || PropTypes.number).isRequired,
  idD: (PropTypes.string || PropTypes.number),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string || PropTypes.number,
  width: PropTypes.string,
  search: PropTypes.bool,
  title: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  minWidth: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  accessor: PropTypes.string,
  fullName: PropTypes.bool
}