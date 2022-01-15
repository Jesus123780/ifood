// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../../apollo/session"
export default withSession(async (req, res) => {
    const { name, username, lastName, email, password } = req.body
    // console.log( name, username, lastName, email, password)
    console.log(req, 'que pedo')
    res.status(200).json({ name: 'John Doe' })

})
  