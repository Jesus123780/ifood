import { ApolloError } from 'apollo-server-micro'
import Users from '../../models/Users'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
const { Op } = require('sequelize')

export const newRegisterUser = async (_, input) => {
    try {
        let res = {}
        const { name, username, lastName, email, siteWeb, description, uPhoNum, upLat, upLon, avatar, createAt } = input.input
        if (input?.id) {
            let values = {}
            for (const x in input) if (x !== 'id') values = { ...values, [x]: input[x] }
            res = await Users.update(
                { ...values },
                { where: { id: deCode(input.id) } }
            )
            return { ...input }
        } else {
            const isExist = await Users.findOne({
                attributes: ['id'],
                where: {
                    [Op.or]: [
                        { email: name },
                        { uPhoNum: uPhoNum }
                    ]
                }
            })
            if (isExist) return new ApolloError('El usuario ya existe', 409)

            res = await Users.create({ ...input.input, uState: 1 })
            return { ...input.input, id: res.id }
        }
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return error
    }
}

export const registerEmailLogin = async (_, { input }, ctx) => {
    const { uEmail } = input
    try {
        console.log(input)
        const existEmail = await Users.findOne({ attributes: ['email'], where: { email: uEmail } })
        const uToken = await generateCode()
        const dataUser = {
            uEmail: uEmail,
            code: uToken,
        }
        const token = await generateToken(dataUser)
        if (!existEmail) {
            Users.create({ email: uEmail, uState: 1, uToken: uToken })
        } else {
            await Users.update({ uToken: uToken }, { where: { email: uEmail } })
        }
        sendEmail({
            from: 'juvi69elpapu@gmail.com',
            to: uEmail,
            text: 'Code recuperation.',
            subject: 'Code recuperation.',
            html: LoginEmail({
                code: uToken,
                or_JWT_Token: token
            })
        }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err'))
    } catch (error) {
        return { success: false, message: error }
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
    },
    MUTATIONS: {
        newRegisterUser,
        registerEmailLogin,
    }
}
