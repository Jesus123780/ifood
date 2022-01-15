/* eslint-disable no-console */
// import nodemailer from 'nodemailer'

import moment from 'moment'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { google } from 'googleapis'

function isString(arg) {
    return typeof (arg) === 'string'
}
export const dateFormat = value => moment(value).format('DD-MM-YYYY')

function isValidBucketName(bucket) {
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
const REFRESH_TOKEN = '1//04v_moewIv3KnCgYIARAAGAQSNwF-L9IrFlTtYGx_d7aJbfxaJPeYLR1n9G-EE8OpiqSRHiC7h4Fmp1ttaOJZc1s2wbB456N4DJ4'
const AuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
AuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })

export const sendEmail = async ({ html, from, to, subject, text }) => {
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

export const transporter = () => nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL_POST,
        pass: process.env.USER_PASS_POST
    }
})

// Generate an ID
export const generateCode = async () => {
    const pass = Math.round(Math.random() * (999935 - 103000) + 10000)
    return pass
}

// Generate a token
export const generateToken = async dataUser => {
    const AccessToken = await jwt.sign(dataUser, process.env.AUTHO_USER_KEY, { expiresIn: parseInt(process.env.JWT_EXPIRY) })
    return AccessToken
}
export const createToken = function () {
    const payload = {
        iat: moment().unix(), // Guardamos la fecha en formato unix
        exp: moment().add(30, 'days').unix// Damos 30 dias de duracion del token en formato unix para poder compara posteriormente
    }
    return jwt.encode(payload, process.env.AUTHO_USER_KEY)
}

export function strToDate(dtStr) {
    let dateObject = {}
    if (!dtStr) return null
    let dateParts = dtStr.split("/");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    dateParts[2] = dateParts[2].split(" ")[0];
    // month is 0-based, that's why we need dataParts[1] - 1
    return dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1]);
}