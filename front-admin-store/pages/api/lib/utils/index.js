/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
// import nodemailer from 'nodemailer'

import moment from 'moment'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { google } from 'googleapis'
import { Base64 } from 'js-base64'


export const enCode = value => {
  const v = ((((value * 998161) * 793927) * 562841) * 288413) / 472793
  return Base64.encode(`${ v }`)
}

export const deCode = value => {
  const v = Base64.decode(value)
  return Math.round(((((v * 472793) / 288413) / 562841) / 793927) / 998161)
}

export const linkBelongsTo = (modelOne, modelTwo, target, foreign) => {
  return modelOne.belongsTo(modelTwo, {
    targetKey: target,
    foreignKey: foreign
  })
}

export const linkHasMany = (modelOne, modelTwo, target, foreign) => {
  return modelOne.hasMany(modelTwo, {
    targetKey: target,
    foreignKey: foreign
  })
}

function isString(arg) {
  return typeof (arg) === 'string'
}
export const dateFormat = value => {return moment(value).format('DD-MM-YYYY')}

export function isValidBucketName(bucket) {
  if (!isString(bucket)) return false

  // bucket length should be less than and no more than 63
  // characters long.
  if (bucket.length < 3 || bucket.length > 63) {
    return false
  }
  // bucket with successive periods is invalid.
  if (bucket.indexOf('..') > -1) {
    return false
  }
  // bucket cannot have ip address style.
  if (bucket.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)) {
    return false
  }
  // bucket should begin with alphabet/number and end with alphabet/number,
  // with alphabet/number/.- in the middle.
  if (bucket.match(/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/)) {
    return true
  }
  return false
}

// Email Transporter

const CLIENT_ID = '214924348774-fqrod1bismchnpo3muih10omufbokkn3.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04HoD5wSkPjmOCgYIARAAGAQSNwF-L9IriJthpZ8mJfBLw8-faNp0cdaoU0BWx6Rgka_iY-RJsP_LcWygqvS8mXbjNDr1tt9ex9c'
const AuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
AuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })

export const sendEmail = async ({ html, from, to, subject }) => {
  let htmlTemplates = await html
  let FromEmail = await from
  let toEmail = await to
  let subjectEmail = await subject
  let textEmail = await subject
  const ascessToken = await AuthClient.getAccessToken()
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        type: 'OAuth2',
        user: 'juvi69elpapu@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ascessToken
      },
      tls: {
        rejectUnauthorized: false
      }

    })
    const MailOptions = {
      from: FromEmail,
      to: toEmail,
      text: textEmail,
      subject: subjectEmail,
      html: htmlTemplates
    }
    const result = await transport.sendMail(MailOptions)
    return result
  } catch (error) {
    throw new Error(error, 'Error email')
  }
}

export const transporter = () => {return nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.USER_EMAIL_POST,
    pass: process.env.USER_PASS_POST
  }
})}

// Generate an ID
export const generateCode = async () => {
  const pass = Math.round(Math.random() * (999935 - 103000) + 10000)
  return pass
}

// Generate a token
export const generateToken = async dataUser => {
  // eslint-disable-next-line no-undef
  // parseInt(process.env.JWT_EXPIRY)
  const AccessToken = await jwt.sign(dataUser, process.env.AUTHO_USER_KEY, { expiresIn: process.env.JWT_EXPIRY })
  return AccessToken
}
export const createToken = (data) => {
  const payload = {
    data,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix // Damos 30 dias de duracion del token en formato unix para poder compara posteriormente
  }
  return jwt.encode(payload, process.env.AUTHO_USER_KEY)
}

export function strToDate(dtStr) {
  if (!dtStr) return null
  let dateParts = dtStr.split('/')
  let timeParts = dateParts[2].split(' ')[1].split(':')
  dateParts[2] = dateParts[2].split(' ')[0]
  // month is 0-based, that's why we need dataParts[1] - 1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1])
}


export function parseCookies(request) {
  const list = {}
  const cookieHeader = request.headers?.cookie
  if (!cookieHeader) return list

  cookieHeader.split(';').forEach(function (cookie) {
    let [name, ...rest] = cookie.split('=')
    name = name?.trim()
    if (!name) return
    const value = rest.join('=').trim()
    if (!value) return
    list[name] = decodeURIComponent(value)
  })

  return list
}