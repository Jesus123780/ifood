import { newRegisterUser } from '../lib/resolvers/users/user'
import UserDeviceModel from '../lib/models/users/userDevice'
import { LoginEmail } from '../lib/templates/LoginEmail'
import { sendEmail } from '../lib/utils'
import { getTokenState } from 'utils'
import { deCode } from '../lib/utils/util'
import { withIronSessionApiRoute } from 'iron-session/next'
const MAX_AGE = 60 * 60 * 8
/**
 * @description Función que guarda el device
 * @param {string} input Args
 * @returns {{ user: string, userProfile: object, error: boolean }} devolución del token y los datos
 */
export const getDevice = async ({ input }) => {
  const { deviceid, userId, locationFormat, os: { name, short_name, version, family, platform } } = input || {}
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
      let deviceId = ''
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
      }).then(() => { return (res, 'the res') }).catch(err => { return (err, 'the err') })
      // send email
    }
    data = isExist
    return { res, error, data }
  } catch (e) {
    // eslint-disable-next-line
    error = { message: error }
  }
  return { error, data }
}

// eslint-disable-next-line consistent-return
export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:
    try {
      const { name, username, lastName, email, password, deviceid } = req.body
      // console.log(req.headers['user-agent'])
      // console.log(req.headers['user-agent'])
      const { token, message, success, roles, storeUserId } = await newRegisterUser(null, { name, username, lastName, email, password })
      if (success) {
        // const detector = new DeviceDetector
        // const resultOs = detector.parseOs(useragent)
        // const resultClient = detector.parseClient(useragent)
        // const resultDeviceType = detector.parseDeviceType(useragent, resultOs, resultClient, {})
        // const result = Object.assign({ os: resultOs }, { client: resultClient }, { device: resultDeviceType }, { useragent: useragent, deviceid: deviceid, email: email, userId: userId, locationFormat })
        // const { error, data } = await getDevice({ input: result })
        // // eslint-disable-next-line
        // console.log(error, data)
        req.session.user = {
          deviceid,
          email,
          isLoggedIn: true,
          roles,
          storeUserId,
          token
        }
        await req.session.save()
        res.send({ ok: true, success, message: message, storeUserId, token })
      }
    } catch (error) {
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  },
  {
    password: process.env.SESSION_KEY,
    cookieName: process.env.SESSION_NAME,
    cookieOptions: {
      expires: new Date(Date.now() + MAX_AGE * 1000),
      maxAge: MAX_AGE, // 8 hours,
      secure: process.env.NODE_ENV === 'production'
    }
  }
)
//--- Tokens

/**
 * @description Función que genera el token
 * @param {string} token Token JWT para el inicio de sesión y el id del usuario
 * @returns {{ user: string, userProfile: object, error: boolean }} devolución del token y los datos
 */
export const getUserFromToken = async token => {
  let user = null
  let userProfile = null
  let error = false
  if (!token) return { error: false, message: '' }
  const tokenState = getTokenState(token)
  const { needRefresh, valid } = tokenState || {}
  try {
    if (needRefresh === true) return { error: true, user: user, userProfile: userProfile }
    if (!valid) return { error: true, message: 'El token no es valido' }
  } catch {
    user = ''
    userProfile = ''
    error = false
  }
  return { user, userProfile, error }
}