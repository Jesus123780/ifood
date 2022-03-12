// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../../apollo/session"
import { newRegisterUser } from "../lib/resolvers/users/user"
import DeviceDetector from 'node-device-detector'
import UserDeviceModel from "../lib/models/users/userDevice"
import { LoginEmail } from "../lib/templates/LoginEmail"
import { sendEmail } from "../lib/utils"
import { getTokenState } from "utils"
import { deCode } from "../lib/utils/util"
// aDateConf: moment().valueOf()
/**
 * @description Función que guarda el device
 * @param {string} input Args
 * @returns {{ user: string, userProfile: object, error: boolean }} devolución del token y los datos
 */
export const getDevice = async ({ input }) => {
    const { deviceid, email, userId, locationFormat,  os, os: { name, short_name, version, family, platform } } = input || {}
    let error = false
    let data = {}
    let res = {}
    if (!input) return null
    try {
        res = await UserDeviceModel.create({
            dState: 1,
            id: deCode(userId),
            deviceId: deviceid,
            deviceName: name,
            short_name: short_name,
            family: family,
            platform: platform,
            locationFormat: locationFormat,
            type: family,
            version: version
        })
        const isExist = await UserDeviceModel.findOne({
            attributes: ['deviceId'],
            where: { deviceId: deviceid }
        })
        if (!isExist) {
            sendEmail({
                from: 'juvi69elpapu@gmail.com',
                // to: email,
                to: 'juvi69elpapu@gmail.com',
                text: 'Nuevo dispositivo detectado',
                subject: 'Nuevo dispositivo detectado.',
                html: LoginEmail({
                    code: deviceId + name,
                    or_JWT_Token: short_name
                })
            }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err'))
            // send email
        }
        data = isExist
        return { res, error, data }
    } catch (error) {
        error = { message: error }
    }
    return { error, data }
}

export default withSession(async (req, res) => {
    const { name, username, lastName, email, password, useragent, deviceid, locationFormat } = req.body
    console.log(name, username, lastName, email, password, useragent, deviceid, locationFormat)
    try {
        const { token, message, success, roles, storeUserId, userId } = await newRegisterUser(null, { name, username, lastName, email, password })
        const detector = new DeviceDetector;
        const resultOs = detector.parseOs(useragent);
        const resultClient = detector.parseClient(useragent);
        const resultDeviceType = detector.parseDeviceType(useragent, resultOs, resultClient, {});
        const result = Object.assign({ os: resultOs }, { client: resultClient }, { device: resultDeviceType }, { useragent: useragent, deviceid: deviceid, email: email, userId: userId, locationFormat });
        const { error, data } = await getDevice({ input: result })
        // console.log(error, data)
        // console.log(os);
        if (success) {
            console.log(token, 0)
            const user = { isLoggedIn: true, roles, token, storeUserId }
            req.session.set('user', user)
            await req.session.save()
            return res.json({ success, message: message, storeUserId, token })
        } else { res.json({ success: 0, message: message, storeUserId, token }) }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
})

//--- Tokens

/**
 * @description Función que genera el token
 * @param {string} token Token JWT para el inicio de sesión y el id del usuario
 * @returns {{ user: string, userProfile: object, error: boolean }} devolución del token y los datos
 */
export const getUserFromToken = async token => {
    let user = null,
    userProfile = null
    let error = false
    // if (!token) return null
    const tokenState = getTokenState(token)
    try {
        if (tokenState?.needRefresh === true || !tokenState?.valid || !tokenState) {
            return error = true
        }
    } catch {
        user = null
        userProfile = null
        error = true
        throw new Error('La session ha expirado')
    }
    return { user, userProfile, error }
}