// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../../apollo/session"
import { newRegisterUser } from "../lib/resolvers/users/user"

export default withSession(async (req, res) => {
    const { name, username, lastName, email, password } = req.body
    console.log(name, username, lastName, email, password)
    try {
        const { token, message, success, roles, storeUserId } = await newRegisterUser(null, { name, username, lastName, email, password })
        if (success) {
            const user = { isLoggedIn: true, roles, token, storeUserId }
            req.session.set('user', user)
            await req.session.save()
            return res.json({ success, message: message, storeUserId })
        } else { res.json({ success: 0, message: message, storeUserId }) }
    } catch (error) {
        const { response: fetchResponse } = error
        res.status(fetchResponse?.status || 500).json(error.data)
    }
})