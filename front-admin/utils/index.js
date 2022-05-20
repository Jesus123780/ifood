/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable valid-jsdoc */

// import nodemailer from 'nodemailer'
import moment from 'moment'
import { useEffect } from 'react'
import jwt, { decode } from 'jsonwebtoken'

moment.locale('es')

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  // Get part after // and before : (in case port number in URL)
  // domain: process.env.ADMIN_URL.split('//')[1].split(':')[0],
  domain: 'localhost:3001/',
  httpOnly: true,
  path: '/',
  sameSite: true,
  // secure: !!process.env.ADMIN_URL.includes('https')
  secure: false
}
export const isNull = dato => {
  if (!dato || dato === '') {
    return true
  } return false
}

export const isNumeric = dato => {
  // const value = dato.replace(/,/g, '');
  if (isNaN(dato) && dato !== '' && dato !== undefined && dato !== null) {
    return true
  } return false
}
export const isPassword = dato => {
  const validar = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  if (validar.test(dato) === true) {
    return false
  } return true
}

export const onlyLetters = dato => {
  const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
  if (validar.test(dato) === false && dato !== '' && dato !== undefined && dato !== null) {
    return true
  } return false
}

export const rangeLength = (dato, min, max) => {
  if (dato !== undefined && dato !== '' && dato !== null) {
    if ((dato.length < min) || (dato.length > max)) {
      return true
    } return false
  } return false
}

export const Match = (dato1, dato2) => {
  if (dato1 !== dato2) {
    return true
  } return false
}

export const isEmail = email => {
  const validar = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (validar.test(email) === false && email !== '' && email !== undefined && email !== null) {
    return true
  } return false
}

export const passwordConfirm = (value, valueConfirm) => { return !(value === valueConfirm) }
// export const numberFormat = value => value ? (parseInt(value) ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(parseFloat(`${value}`.replace(/\./g, ''))) : '') : (value === 0 ? 0 : '')

// var options = { style: 'currency', currency: 'GBP' };
// export const numberFormat = value => value && parseFloat(value) && new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value)
// export const numberFormat = value => value ? (parseInt(value) ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(parseFloat(`${value}`.replace(/\./g, ''))) : '') : (value === 0 ? 0 : '')
export const numberFormat = value => { return value ? (parseInt(value) ? new Intl.NumberFormat('de-DE').format(parseFloat(`${value}`.replace(/\./g, ''))) : '') : (value === 0 ? 0 : '') }

// valida los inputs
export const dateFormat = value => { return moment(value).format('DD-MM-YYYY') }
export const validations = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
  let { value } = e.target
  const { nextSibling } = e.target
  // verifica si es formato de numero */
  if (typeFormat) { value = value.replace(/\./g, '') }
  // verifica que campos seran y si se encuentra la condicion o no
  if (typeNull) {
    if (isNull(value)) {
      e.target.style.border = '1px solid  red'
      nextSibling.innerHTML = 'Campo requerido.'
      return true
    }
  }
  if (typeNumeric) {
    if (isNumeric(value)) {
      e.target.style.border = '1px solid  red'
      nextSibling.innerHTML = 'Solo puede contener números.'
      return true
    }
  }
  if (typeRange) {
    if (rangeLength(value, minRange, maxRange)) {
      e.target.style.border = '1px solid  red'
      nextSibling.innerHTML = `El rango de caracteres es de ${minRange} a ${maxRange}.`
      return true
    }
  }
  if (typeLetters) {
    if (onlyLetters(value)) {
      e.target.style.border = '1px solid  red'
      nextSibling.innerHTML = 'Solo puede contener letras.'
      return true
    }
  }
  if (typeEmail) {
    if (isEmail(value)) {
      e.target.style.border = '1px solid  red'
      nextSibling.innerHTML = 'No es un formato de email valido.'
      return true
    }
  }
  e.target.style.border = '1px solid  red'
  nextSibling.innerHTML = ''
  return false
}

// valida el formulario
export const validationForm = (inputs, error) => {
  let errorForm = false
  /** verifica los campos del formulario */
  for (let i = 0; i < inputs.length; i++) {
    /** verifica los input y select si se encuentra vacio o si no, si hay un error del onchange */
    if ((!!inputs[i].value === false || inputs[i].value === 'false') && inputs[i].type !== 'submit' && inputs[i].type !== 'file' && inputs[i].type !== 'button') {
      //  verifica si es un input, select obligatorio */
      if (inputs[i].dataset.ignore === 'false') {
        inputs[i].style.border = '1px solid  red'
        inputs[i].nextSibling.innerHTML = 'Campo requerido.'
        errorForm = true
      } else if (inputs[i].dataset.ignore === undefined) {
        if (inputs[i].type === 'tel') {
          inputs[i].style.border = '1px solid  red'
          inputs[i].nextSibling.style.border = '1px solid  red'
          inputs[i].parentNode.nextSibling.innerHTML = 'Campo requerido.'
        } else {
          inputs[i].parentNode.style.border = '1px solid  red'
          inputs[i].parentNode.nextSibling.innerHTML = 'Campo requerido.'
        }
        errorForm = true
      }
    } else
    if (error[inputs[i].name]) { errorForm = true }
  }
  return errorForm
}

// /** valida el formulario */
// export const validationFormTwo = (inputs, error) => {
//     let errorForm = false
//     /** verifica los campos del formulario */
//     for (let i = 0; i < inputs.length; i++) {
//         /** verifica los input y select si se encuentra vacio o si no, si hay un error del onchange */
//         if ((!!inputs[i].value === false || inputs[i].value === 'false') && inputs[i].type !== 'submit' && inputs[i].type !== 'file' && inputs[i].type !== 'button') {
//             /** verifica si es un input, select obligatorio */
//             if (inputs[i].dataset.ignore === 'false')
//                 errorForm = true
//             else if (inputs[i].dataset.ignore === undefined)
//                 errorForm = true
//         } else
//             if (error[inputs[i].name])
//                 errorForm = true
//     }
//     return errorForm
// }

// valida el input del telefono
export const validationPhone = (v, e, typeNull, typeNumeric) => {
  if (e !== true) {
    const { nextSibling, parentNode } = e.target
    // verifica que campos serán y si se encuentra la condición o no */
    if (typeNull) {
      if (isNull(v)) {
        e.target.style.border = '1px solid  red'
        nextSibling.style.border = '1px solid  red'
        parentNode.nextSibling.innerHTML = 'Campo requerido.'
        return true
      }
    }
    if (typeNumeric) {
      if (isNull(v)) {
        e.target.style.border = '1px solid  red'
        nextSibling.style.border = '1px solid  red'
        parentNode.nextSibling.innerHTML = 'Solo puede contener letras.'
        return true
      }
    }
    if (rangeLength(v, 5, 15)) {
      e.target.style.border = '1px solid  red'
      nextSibling.style.border = '1px solid  red'
      parentNode.nextSibling.innerHTML = 'El rango de caracteres es de 5 a 15.'
      return true
    }

    e.target.style.border = '1px solid red'
    nextSibling.style.border = '1px solid red'
    parentNode.nextSibling.innerHTML = ''
    return false
  }
  return false
}

// verifica los select
export const validationsSelect = v => {
  // le quita las clases a los select por ser seleccionado */
  v.style.border = '1px solid red'
  v.nextSibling.innerHTML = ''
  return false
}

export const validationImg = file => { return (/\.(jpg|png|gif|jpeg)$/i).test(file.name) }

export const CalcularDigitoVerificacion = value => {
  let x = 0; let y = 0; let i = 0; let myNit

  // Se limpia el Nit
  myNit = value.replace(/\s/g, '') // Espacios
  myNit = value.replace(/,/g, '') // Comas
  myNit = value.replace(/\./g, '') // Puntos
  myNit = value.replace(/-/g, '') // Guiones

  // Se valida el nit
  if (isNaN(myNit)) {
    return ''
  }

  // Procedimiento
  const vpri = new Array(16)
  const z = myNit.length

  vpri[1] = 3
  vpri[2] = 7
  vpri[3] = 13
  vpri[4] = 17
  vpri[5] = 19
  vpri[6] = 23
  vpri[7] = 29
  vpri[8] = 37
  vpri[9] = 41
  vpri[10] = 43
  vpri[11] = 47
  vpri[12] = 53
  vpri[13] = 59
  vpri[14] = 67
  vpri[15] = 71

  for (i; i < z; i++) {
    y = myNit.substr(i, 1)

    x += (y * vpri[z - i])
  }

  y = x % 11

  return (y > 1) ? 11 - y : y
}

export const extFile = filename => {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined
}

export const validationsTF = (input, label, tooltip, icon, text, res) => {
  if (res) {
    input.style.backgroundColor = '#FBCACA'
    input.style.borderColor = '#15558d'
    input.style.color = '#15558d'
    label.style.color = '#15558d'
    tooltip.style.opacity = 1
    tooltip.innerHTML = text
    icon.style.opacity = 1
  } else {
    input.style.backgroundColor = 'transparent'
    input.style.borderColor = '#15558d'
    input.style.color = '#15558d'
    label.style.color = '#15558d'
    tooltip.style.opacity = 0
    tooltip.innerHTML = ''
    icon.style.opacity = 0
  }
  return res
}

// valida el formulario
export const validationFormTwo = (inputs, error) => {
  let errorForm = false
  /** verifica los campos del formulario */
  for (let i = 0; i < inputs.length; i++) {
    const { value, type, nextSibling, parentNode, dataset } = inputs[i]
    /** verifica los input y select si se encuentra vacio o si no, si hay un error del onchange */
    if ((!value || value === 'false' || (type === 'tel' && value.length <= 8)) && type !== 'submit' && type !== 'file' && type !== 'button') {
      /** verifica si es un input, select obligatorio */
      if (type === 'tel') {
        inputs[i].style.backgroundColor = '#FBCACA'
        inputs[i].style.borderColor = '#15558d'
        nextSibling.style.backgroundColor = '#FBCACA'
        nextSibling.style.borderColor = '#15558d'
        parentNode.parentNode.firstChild.nextSibling.style.color = '#15558d'
        parentNode.parentNode.firstChild.nextSibling.nextSibling.style.opacity = 1
        parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML = 'Campo Requerido.'
        parentNode.parentNode.lastChild.style.opacity = 1
      } else if (dataset.ignore === 'false') errorForm = validationsTF(inputs[i], nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido.', true)
      else if (dataset.ignore === undefined) errorForm = validationsTF(parentNode, parentNode.firstChild.nextSibling, parentNode.firstChild.nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido.', true)
    } else error[inputs[i].name] && (errorForm = true)
  }
  return errorForm
}

// verifica los select
export const validationsSelectTwo = v => {
  const s = document.getElementById(v.target.name)
  if (s) { return validationsTF(s.parentNode, s.parentNode.firstChild.nextSibling, s.parentNode.firstChild.nextSibling.nextSibling, s.nextSibling, false, false) }
}

// valida los inputs
export const validationsTwo = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
  let { value } = e.target
  const { nextSibling, parentNode } = e.target
  /** verifica si es formato de numero */
  if (typeFormat) { value = value.replace(/\./g, '') }
  /** verifica que campos seran y si se encuentra la condicion o no */
  if (typeNull) {
    if (isNull(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido', true) }
  }
  if (typeNumeric) {
    if (isNumeric(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Solo puede contener números', true) }
  }
  if (typeRange) {
    if (rangeLength(value, minRange, maxRange)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, `El rango de caracteres es de ${minRange} a ${maxRange}.`, true) }
  }
  if (typeLetters) {
    if (onlyLetters(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Solo puede contener letras', true) }
  }
  if (typeEmail) {
    if (isEmail(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'No es un formato de email valido', true) }
  }
  return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, false, false)
}

/**
 *
 * @param {Object} data objeto a filtrar
 * @param {Array} filters array a comparar o claves del objeto a excluir
 * @return {Object} devuelve un objeto con los datos filtrados
 */
export const filterKeyObjectOLD = (data, filters) => {
  let values = {}
  for (const elem in data) {
    let coincidence = false
    for (let i = 0; i < filters.length; i++) if (elem === filters[i]) coincidence = true

    if (!coincidence) values = { ...values, [elem]: data[elem] }
  }

  return values
}
/**
 * @description Funcion que valida los formularios, funciona para trabajar los errores con estados
 * @version 0.1.1
 * @param {array} elements elementos del formulario
 * @return {array} devuelve un array de bolleanos con el nombre identificador para cada estado en react.
 */
export const validationSubmitHooks = elements => {
  let errorForm = {}
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name) {
      if (elements[i].type === 'text' || elements[i].type === 'password' || elements[i].type === 'email' || elements[i].type === 'number' || elements[i].type === 'hidden') {
        if (elements[i].dataset.required === 'true') {
          if (!elements[i].value) errorForm = { ...errorForm, [elements[i].name]: !elements[i].value }
          else errorForm = { ...errorForm, [elements[i].name]: !elements[i].value }
        } else {
          errorForm = { ...errorForm, [elements[i].name]: false }
        }
      }
    }
  }
  return errorForm
}
/**
 *
 * @param {Object} data objeto a filtrar
 * @param {Array} filters array a comparar o claves del objeto a excluir
 * @param {boolean} dataFilter booleano para devolver los datos filtrados o no
 * @return {Object} devuelve un objeto con los datos filtrados
 */
export const filterKeyObject = (data, filters, dataFilter) => {
  let values = {}; let valuesFilter = {}
  for (const elem in data) {
    let coincidence = false
    for (let i = 0; i < filters.length; i++) {
      if (elem === filters[i]) coincidence = true
      else valuesFilter = filters[i]
    }

    if (!coincidence) values = { ...values, [elem]: data[elem] }
    else valuesFilter = { ...valuesFilter, [elem]: data[elem] }
  }
  if (!dataFilter) return values
  if (dataFilter) return { values, valuesFilter }
}

/**
 * busca en el localstore la información y la parsea si es necesario
 * @version 0.0.1
 * @param {*} jsonValue clave de busqueda
 * @param {boolean} isParse si se quiere parsear o no
 * @return {boolean} devuelve el valor parseado o false si pudo guardar en localStorage
 */
export const getDataLS = jsonValue => {
  try {
    return (jsonValue ? JSON.parse(jsonValue) : null)
  } catch (e) {
    return jsonValue
  }
}
export function parse(str) {
  if (Array.isArray(str)) {
    alert()
    for (const current in str) {
      // eslint-disable-next-line
      console.log(current)
    }
  }
}

/**
 * actualizar cache de apollo
 * @param {object} params parametros para actualizar el cachet de apollo
 * @returns {null} no hay retorno
 */
export const updateCache = async ({ cache, query, nameFun, dataNew }) => {
  return cache.modify({
    fields: {
      [nameFun](dataOld = {}) {
        return cache.writeQuery({ query, data: { ...dataOld, data: { ...(dataOld?.data || {}), ...(dataNew?.data || {}) } } })
      }
    }
  })
}

/**
 * actualizar cache de apollo
 * @param {{ cache: object, query: object, nameFun: string, dataNew: object, type: number, id: string }} params Parámetros para actualizar el cachet de apollo
 * @returns {null} no hay retorno
 */
export const updateCacheMod = async ({ cache, query, nameFun, dataNew, type, id }) => {
  return cache.modify({
    fields: {
      [nameFun](dataOld = []) {
        if (type === 1) return cache.writeQuery({ query, data: [...(dataOld || []), { ...(dataNew || {}) }] })
        if (type === 2) return cache.writeQuery({ query, data: { ...(dataOld || {}), ...(dataNew || {}) } })
        if (type === 3) return cache.writeQuery({ query, data: dataOld.filter(x => { return x === id }) })
      }
    }
  })
}
/**
 * obtiene el token del usuario lo guarda en el localStorage
 * @returns {null} no hay retorno
 */
const TOKEN = 'sma.sv1'
export function setToken(token) {
  if (token === null) return false
  else if (token !== null) return JSON.parse
}
/**
 * obtiene el token del usuario
 * @returns {null} no hay retorno
 */
export function getToken({ restaurant }) {
  if (window.localStorage) {
    return window.localStorage.getItem(restaurant || TOKEN)
  }
}
// obtiene el token del usuario y lo descodifica
export function decodeToken(token) {
  return decode(token)
}
const now = Date.now().valueOf() / 1000
export function getTokenState(token) {
  if (!token) {
    return { valid: false, needRefresh: true }
  }
  const decoded = decode(token)
  if (!decoded) {
    return { valid: false, needRefresh: true }
  } else if (decoded.exp && jwt.decode(token)?.exp < now) {
    return { valid: true, needRefresh: true }
  }
  return { valid: true, needRefresh: false }

}
// Obtiene el token y lo elimina
export function removeToken() {
  return localStorage.removeItem(TOKEN)
}
export const validateEmail = email => {
  const re = /^(([^<> ()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/**
 * Transforma una cadena de caracteres a todos mayuscula
 * @version 0.0.1
 * @param {string} value valor en numeros
 * @return {string} nuevo formato en teléfono
 */
export const upperCase = value => { return `${value || ''}`.toUpperCase() }

/**
 * Transforma un numero en formato de teléfono
 * @version 0.0.1
 * @param {string} value valor en numeros
 * @return {string} nuevo formato en teléfono
 */
//  export const phoneFormat = value => !!value && parsePhoneNumber(`${ value }`, 'US')?.formatNational()
/**
 * Calcula el dígito de verificación
 * @version 0.0.1
 * @param {string} value valor en números
 * @return {numeric} el dígito de verificación
 */
export const calculateCheckDigit = value => {
  // variables necesarias
  let nit = `${value}`
  const vpri = [undefined, 3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71]

  // Se limpia el Nit
  nit = nit.replace(/\s/g, '') // Espacios
  nit = nit.replace(/,/g, '') // Comas
  nit = nit.replace(/\./g, '') // Puntos
  nit = nit.replace(/-/g, '') // Guiones

  // Se valida el nit
  if (isNaN(nit)) return ''

  // Procedimiento
  let x = 0
  let y = 0
  let i = 0
  const z = nit.length

  for (i; i < z; i++) {
    y = nit.substr(i, 1)

    x += (y * vpri[z - i])
  }

  y = x % 11

  return (y > 1) ? 11 - y : y
}
/**
 * valida los inputs
 * @version 0.0.1
 * @param {boolean} data valor
 * @param {boolean} typeNull null
 * @param {boolean} typeLetters letras
 * @param {boolean} typeNumeric numerico
 * @param {boolean} typeRange rango
 * @param {boolean} minRange minimo de rango
 * @param {boolean} maxRange máximo de rango
 * @param {boolean} typeEmail correo electronico
 * @param {boolean} typeFormat formato numerico
 * @param {boolean} typeMatch comparación
 * @param {boolean} valueMatch segundo valor para comparar
 * @return {boolean} true o false
 */
export const validationsOld = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
  let { value } = e.target
  const { nextSibling, parentNode } = e.target

  /** verifica si es formato de número */
  if (typeFormat) value = value.replace(/\./g, '')
  /** verifica que campos seran y si se encuentra la condicion o no */
  if (typeNull) {
    if (isNull(value)) return validationsTF(parentNode, nextSibling, 'Campo requerido.', true)
  }
  if (typeNumeric) {
    if (isNumeric(value)) return validationsTF(parentNode, nextSibling, 'Solo puede contener números.', true)
  }
  if (typeRange) {
    if (rangeLength(value, minRange, maxRange)) return validationsTF(parentNode, nextSibling, `El rango de caracteres es de ${minRange} a ${maxRange}.`, true)
  }
  if (typeLetters) {
    if (onlyLetters(value)) return validationsTF(parentNode, nextSibling, 'Solo puede contener letras.', true)
  }
  if (typeEmail) {
    if (isEmail(value)) return validationsTF(parentNode, nextSibling, 'No es un formato de email valido.', true)
  }
  return validationsTF(parentNode, nextSibling, false, false)
}
/**
 * Busca el tipo de base 64
 * @version 0.0.1
 * @param {string} filename nombre del archivo con la extension
 * @return {string} nombre del tipo de base 64
 */
/**
 * Se conecta a Aws3
 * @version 0.0.1
 * @return {boolean} la conexión
    */
// export const AWS3 = () => new AWS.S3({
//     accessKeyId: 'AKIAYOOQNH4RCILB644J',
//     secretAccessKey: '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'
// })
// Nombre del BUKE
export const Bucket = 'NAME'
//
/**
 * Busca la extension del archivo
 * @version 0.0.1
 * @param {string} Key Key del bucket
 * @param {string} name nombre del documento
 * @return {string} nombre de la extension
 */
// export const getFileS3 = async (Key, name) => {
//     const S3 = AWS3()
//     const result = await S3.getObject({ Bucket, Key }).promise().catch(() => undefined)
//     return result && `data:${extFileType(name)};base64,${result.Body.toString('base64')}`
// }

/**
 * guarda un documento en S3
 * @param {String} Key variable de búsqueda
 * @param {Array} Body Array de buffer del documento
 * @return {String} respuesta del servidor
 */
// export const putFileS3 = async (Key, Body) => {
//     const S3 = AWS3()
//     const res = await S3.putObject({ Bucket, Key, Body }).promise().catch(() => undefined)
//     return res
// }
/**
 * Unidad en letra
 * @version 0.0.1
 * @param {number} value numero
 * @return {string} numero el letra
 */
const Unidades = value => {
  switch (value) {
    case 1: return 'UN'
    case 2: return 'DOS'
    case 3: return 'TRES'
    case 4: return 'CUATRO'
    case 5: return 'CINCO'
    case 6: return 'SEIS'
    case 7: return 'SIETE'
    case 8: return 'OCHO'
    case 9: return 'NUEVE'
    default: return ''
  }
}

/**
 * Decena en letra
 * @version 0.0.1
 * @param {string} strSin numero en letra
 * @param {string} numUnit numero en letras
 * @return {string} concatena al cantidad
 */
const DecenasY = (strSin, numUnit) => {
  if (numUnit > 0) return `${strSin} Y ${Unidades(numUnit)}`
  return strSin
}

/**
 * Decena en letra
 * @version 0.0.1
 * @param {number} value numero
 * @return {string} cantidad en letra
 */
const Decenas = value => {
  const ten = Math.floor(value / 10)
  const Unit = value - (ten * 10)

  switch (ten) {
    case 1:
      switch (Unit) {
        case 0: return 'DIEZ'
        case 1: return 'ONCE'
        case 2: return 'DOCE'
        case 3: return 'TRECE'
        case 4: return 'CATORCE'
        case 5: return 'QUINCE'
        default: return `DIECI${Unidades(Unit)}`
      }
    case 2:
      switch (Unit) {
        case 0: return 'VEINTE'
        default: return `VEITI${Unidades(Unit)}`
      }
    case 3: return DecenasY('TREINTA', Unit)
    case 4: return DecenasY('CUARENTA', Unit)
    case 5: return DecenasY('CINCUENTA', Unit)
    case 6: return DecenasY('SESENTA', Unit)
    case 7: return DecenasY('SETENTA', Unit)
    case 8: return DecenasY('OCHENTA', Unit)
    case 9: return DecenasY('NOVENTA', Unit)
    case 0: return Unidades(Unit)
    default: return ''
  }
}
/**
 * Centenas en letra
 * @version 0.0.1
 * @param {number} value numero
 * @return {string} cantidad en letra
 */
const Centenas = value => {
  const hundreds = Math.floor(value / 100)
  const tens = value - (hundreds * 100)

  switch (hundreds) {
    case 1:
      if (tens > 0) return `CIENTO${Decenas(tens)}`
      return 'CIEN'
    case 2: return `DOSCIENTOS${Decenas(tens)}`
    case 3: return `TRESCIENTOS${Decenas(tens)}`
    case 4: return `CUATROCIENTOS${Decenas(tens)}`
    case 5: return `QUINIENTOS${Decenas(tens)}`
    case 6: return `SEISCIENTOS${Decenas(tens)}`
    case 7: return `SETECIENTOS${Decenas(tens)}`
    case 8: return `OCHOCIENTOS${Decenas(tens)}`
    case 9: return `NOVECIENTOS${Decenas(tens)}`
    default: return Decenas(tens)
  }
}

/**
 * Seccion en letra
 * @version 0.0.1
 * @param {number} value numero del valor
 * @param {number} divider numero de division
 * @param {string} strSingular numero en letras
 * @param {string} strPlural numero en letras
 * @return {string} cantidad en letra
 */
const Seccion = (value, divider, strSingular, strPlural) => {
  const hundreds = Math.floor(value / divider)
  const rest = value - (hundreds * divider)
  let letters = ''

  if (hundreds > 0) {
    if (hundreds > 1) letters = `${Centenas(hundreds)} ${strPlural}`
    else letters = strSingular
  }

  if (rest > 0) letters += ''

  return letters
}
/**
 * Miles en letra
 * @version 0.0.1
 * @param {number} value numero del valor
 * @return {string} cantidad en letra
 */
const Miles = value => {
  const divider = 1000
  const hundreds = Math.floor(value / divider)
  const rest = value - (hundreds * divider)
  const strThousands = Seccion(value, divider, 'UN MIL', 'MIL')
  const strhundreds = Centenas(rest)

  if (strThousands === '') return strhundreds

  return `${strThousands} ${strhundreds}`
}

/**
 * Millones en letra
 * @version 0.0.1
 * @param {number} value numero del valor
 * @return {string} cantidad en letra
 */
const Millones = value => {
  const divider = 1000000
  const hundreds = Math.floor(value / divider)
  const rest = value - (hundreds * divider)
  const strMillions = Seccion(value, divider, 'UN MILLON DE', 'MILLONES DE')
  const strThousands = Miles(rest)

  if (strMillions === '') return strThousands

  return `${strMillions} ${strThousands}`
}
/**
 * Formato de transformar numero a Letras
 * @version 0.0.1
 * @param {number} value numero del valor
 * @param {number} format activar formato de pesos
 * @return {string} cantidad en letra
 */
export const NumeroALetras = (value, format = false) => {
  const data = {
    number: value,
    integers: Math.floor(value),
    letterPennies: '',
    letterCoinPlural: format ? '' : 'PESOS COLOMBIANOS',
    letterCoinSingular: format ? '' : 'PESO COLOMBIANO',
    letterCoinPenniesPlural: 'CENTAVOS',
    letterCoinPennieSingular: 'CENTAVO',
    pennies: ((Math.round(value * 100)) - (Math.floor(value) * 100))
  }

  if (data.pennies > 0) {
    data.letterPennies = `CON ${(function () {
      if (data.pennies === 1) return `${Millones(data.pennies)} ${data.letterCoinPennieSingular}`
      return `${Millones(data.pennies)} ${data.letterCoinPenniesPlural}`
    })()
    }`
  }

  if (data.integers === 0) return `CERO ${data.letterCoinPlural} ${data.letterPennies}`
  if (data.integers === 1) return `${Millones(data.integers)} ${data.letterCoinSingular} ${data.letterPennies}`
  return `${Millones(data.integers)} ${data.letterCoinPlural} ${data.letterPennies}`
}

/**
 * Busca un valor aleatorio de 10 caracteres
 * @version 0.0.1
 * @return {string} Valor aleatorio
 */
export const valRand = () => {
  /** variables necesarias */
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  /** creación de codigo */
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
// Te devuelve un valor en formato reducido en millones
export const numberFormatM = param => {
  let money = 0; let num = 0; let value = 0; let val = param
  if (val >= 1000000000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`${num}000`)
    money += value
    val -= parseFloat(`${num}000000000`)
  }

  if (val >= 100000000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`${num}00`)
    money += value
    val -= parseFloat(`${num}00000000`)
  }

  if (val >= 10000000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`${num}0`)
    money += value
    val -= parseFloat(`${num}0000000`)
  }

  if (val >= 1000000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`${num}`)
    money += value
    val -= parseFloat(`${num}000000`)
  }
  if (val >= 100000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.${num}`)
    money += value
    val -= parseFloat(`${num}00000`)
  }
  if (val >= 10000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.0${num}`)
    money += value
    val -= parseFloat(`${num}0000`)
  }
  if (val >= 1000) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.00${num}`)
    money += value
    val -= parseFloat(`${num}000`)
  }
  if (val >= 100) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.000${num}`)
    money += value
    val -= parseFloat(`${num}00`)
  }
  if (val >= 10) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.0000${num}`)
    money += value
    val -= parseFloat(`${num}0`)
  }
  if (val >= 1) {
    num = `${val}`.charAt(0)
    value = parseFloat(`0.00000${num}`)
    money += value
    val -= parseFloat(`${num}`)
  }

  return money.toFixed(2)
}

/* Método para eliminar el primer carácter */
// const str = '*plátano_'
// const newStr = str.slice(1, -1)
// eslint-disable-next-line
/* Método para eliminar el primer carácter */
// const string = '*plátano_'
// const newString = string.substring(1, str.length - 1)
// // eslint-disable-next-line

// export const transporter = () => null.createTransport({
//   host: 'mail.winby.co',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'no-reply@winby.co',
//     pass: 'UzmtvXF466Ff'
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// })
export const mongoObjectId = function () {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}

export default function useKeypress(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => { return window.removeEventListener('keyup', onKeyup) }
  }, [])
}
export const CalculateIva = (quantity, rate, iPercentage, state) => {
  const rateNumber = parseInt(rate)
  const PercentageNumber = parseInt(iPercentage)
  const quantityNumber = parseInt(quantity)
  let TotalIva
  const SubTotal = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0
  if (state === 'INCLUSIVE') {
    TotalIva = SubTotal ? SubTotal / (100 + PercentageNumber) * PercentageNumber : 0
    return TotalIva
  } else if (state === 'EXCLUSIVE') {
    const PercentageNumber = parseInt(iPercentage)
    TotalIva = SubTotal ? (SubTotal * PercentageNumber) / 100 : 0
    return TotalIva
  }
  TotalIva = 0
  return TotalIva

}
/**
 *
 * @param {value quantity} quantity
 * @param {*} rate
 * @returns {null} no hay retorno
 * @returns {calc} calculo amounTotal
 */
export const CalculateAmount = (quantity, rate) => {
  const quantityNumber = parseFloat(quantity)
  const rateNumber = parseFloat(rate)
  const amountTotal = quantityNumber && rateNumber ? quantityNumber * rateNumber : '00'
  return amountTotal
}
/**
 *
 * @param {*}
 * @returns {null} no hay retorno
 * @returns {date} date day
 */
const today = new Date()
export const dateNow = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

// export const handleDelete = async (_id, action = () => undefined) => {
//   useEffect(() => {
//     function onKeyup() {
//       if (_id) action()
//     }
//     onKeyup()
//   }, [_id])
// }

export const hiddenEmail = email => {
  const domain = email.replace(/.*@/, '')
  const username = email.replace(/@.*/, '')
  const sliceDomain = domain.slice(domain.indexOf('.'), domain.length)
  const sliceUsername = username.slice(0, 3)
  const lastChar = username.charAt(username.length - 1)
  const usernameLengthToHide =
    username.length - (sliceUsername.length + lastChar.length)
  const hideUsername = '*'.repeat(usernameLengthToHide)
  const domainLengthToHide = domain.length - sliceDomain.length
  const hideDomain = '*'.repeat(domainLengthToHide)
  const result = `${sliceUsername}${hideUsername}${lastChar}@${hideDomain}${sliceDomain}`
  return result
}
export const roundToTwo = (num) => {
  return (Math.round(num + 'e+2') + 'e-2')
}
export function RandomCode(length) {
  let result = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength))
  }
  return result
}

export const NewDateFormat = (date) => {
  try {
    if (!date) return
    // const dateString = new Date(dateString)
    const dateString = date => { return new Date(date).toString() !== 'Invalid Date' }
    const newDate = dateString instanceof Date && !isNaN(dateString)
    // return new Date(date).toISOString().slice(0, 10).replace(/-/g,"");
    return newDate
  } catch (error) {
    new Error(error.message)
  }
}

export const convertBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}
/**
 * OBTIENE EL TAMAÑO DE EL ARCHIVO
 */
export const getFileSizeByUnit = (file, unit = 'B') => {
  const originFileSize = file && file.size
  if (!originFileSize) {
    return 0
  }
  const unitStr = unit.toUpperCase()
  const unitFormula = {
    B: size => { return size },
    KB: size => { return size / 1024 },
    MB: size => { return size / (1024 * 1024) },
    GB: size => { return size / (1024 * 1024 * 1024) },
    TB: size => { return size / (1024 * 1024 * 1024 * 1024) }
  }
  return [unitFormula[unitStr] ? unitFormula[unitStr](originFileSize) : 0, { unit }]
}

// const ratings = {
//     hotel_a : 1,
//     hotel_a : 1,
//     hotel_a : 1,
//     hotel_b : 4,
//     hotel_c : 5,
//     hotel_d : 5,
//     hotel_e : 5
//   };

//   // total number of stars
//   const starTotal = 5;

//   for(const rating in ratings) {  
//     const starPercentage = (ratings[rating] / starTotal) * 100;
//     const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
//     console.log(starPercentageRounded)
//     // document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
//   }
// push colors
// window.setInterval(() => {
//     console.log({
//       color: "#" + Math.floor(Math.random() * 16777215).toString(16)
//     });
//   }, 2000)

// Event
// .findAndCountAll({
//     include: [
//       {
//         model: Tag,
//         as: 'tags',
//         where: { id: {in: [1,2,3,4]} },
//       }
//     ],
//     order: order,
//     limit: pageSize,
//     offset: pageSize * (page - 1),
// })
// .success(function(result) {

//     ...
// });

export const cleanRut = (rut) => {
  return typeof rut === 'string'
    ? rut.replace(/^(0+|[^0-9kK]+)/g, '').toUpperCase()
    : ''
}

export const formatRut = (rut) => {
  rut = cleanRut(rut)
  if (rut.length === 0) {
    return ''
  }
  let result = rut.slice(-4, -1) + '-' + rut.slice(rut.length - 1)
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }
  return result
}
formatRut('https://www.facebook.com/messages/t/100017146501277')

export const toKebabCase = (string) => {
  return string
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export const getCardType = (cardNum) => {
  let payCardType = ''
  let regexMap = [
    { regEx: /^4[0-9]{5}/gi, cardType: 'VISA' },
    { regEx: /^5[1-5][0-9]{4}/gi, cardType: 'MASTERCARD' },
    { regEx: /^3[47][0-9]{3}/gi, cardType: 'AMEX' },
    { regEx: /^6[0-9]{5}/gi, cardType: 'DISCOVER' },
    { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: 'MAESTRO' }
  ]

  for (let j = 0; j < regexMap.length; j++) {
    if (cardNum.match(regexMap[j].regEx)) {
      payCardType = regexMap[j].cardType
      break
    }
  }
  if (
    cardNum.indexOf('50') === 0 ||
      cardNum.indexOf('60') === 0 ||
      cardNum.indexOf('65') === 0
  ) {
    let g = '508500-508999|606985-607984|608001-608500|652150-653149'
    let i = g.split('|')
    for (let d = 0; d < i.length; d++) {
      let c = parseInt(i[d].split('-')[0], 10)
      let f = parseInt(i[d].split('-')[1], 10)
      if (
        cardNum.substr(0, 6) >= c &&
              cardNum.substr(0, 6) <= f &&
              cardNum.length >= 6
      ) {
        payCardType = 'RUPAY'
        break
      }
    }
  }
  return payCardType
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function months(config) {
  let cfg = config || {}
  let count = cfg.count || 12
  let section = cfg.section
  let values = []
  let i; let value

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % MONTHS.length || 12]
    values.push(value.substring(0, section))
  }

  return values
}

export function numbers(config) {
  let cfg = config || {}
  let min = 1
  let max = 2
  let from = 4
  let count = 5
  let decimals = 6
  let continuity = 9
  let dfactor = Math.pow(10, decimals) || 0
  let data = []
  let i; let value

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + this.rand(min, max)
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor)
    } else {
      data.push(null)
    }
  }

  return data
}