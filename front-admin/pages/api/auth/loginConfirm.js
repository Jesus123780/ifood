// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from '../../../apollo/session'
import { LoginEmailConfirmation } from '../lib/resolvers/users/user'

// eslint-disable-next-line consistent-return
export default withSession(async (req, res) => {
  const { email, otp } = req.body
  try {
    const { token, message, success, roles, idStore } = await LoginEmailConfirmation(null, { email, otp })
    if (success === true) {
      const user = { isLoggedIn: true, roles, token }
      req.session.set('user', user)
      await req.session.save()
      return res.json({ success, message, idStore, token })
    } 
    req.session.destroy()
    res.json({ success: 0, message: message })
        
  } catch (error) {
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})