import { newRegisterUser } from "../lib/resolvers/users/user"
import withSession from "../../../apollo/session"

export default withSession(async (req, res) => {
    const { name, username, lastName, email, password, useragent, deviceid, locationFormat } = req.body
    // console.log(name, username, lastName, email, password, useragent, deviceid, locationFormat)
    try {
        const { token, message, success, roles, storeUserId, userId } = await newRegisterUser(null, { name, username, lastName, email, password })
        // const detector = new DeviceDetector;
        // const resultOs = detector.parseOs(useragent);
        // const resultClient = detector.parseClient(useragent);
        // const resultDeviceType = detector.parseDeviceType(useragent, resultOs, resultClient, {});
        // const result = Object.assign({ os: resultOs }, { client: resultClient }, { device: resultDeviceType }, { useragent: useragent, deviceid: deviceid, email: email, userId: userId, locationFormat });
        // const { error, data } = await getDevice({ input: result })
        // console.log(error, data)
        // console.log(os);
        if (success) {
            const user = { isLoggedIn: true, roles, token, storeUserId, userId }
            req.session.set('user', user)
            await req.session.save()
            return res.json({ success, message: message, storeUserId, token, userId })
        } else { res.json({ success: 0, message: message, storeUserId, token, userId }) }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
})