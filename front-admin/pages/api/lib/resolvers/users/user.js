import { ApolloError } from 'apollo-server-micro'
import Users from '../../models/Users'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterUser = async (_, input) => {
    try {
        let res = {}
        const { name, password } = input
        if (input?.id) {
            let values = {}
            for (const x in input) if (x !== 'id') values = { ...values, [x]: input[x] }
            res = await Users.update(
                { ...values },
                { where: { id: deCode(input.id) } }
            )
            console.log(res)
            const token = await generateToken(res)
            return {
                success: true,
                message: 'Session created.',
            }
        } else {
            const isExist = await Users.findOne({
                attributes: ['id'],
                where: {
                    [Op.or]: [
                        { email: name },
                        { uPhoNum: password }
                    ]
                }
            })
            if (isExist) return new ApolloError('El usuario ya existe', 409)
            res = await Users.create({ ...input, uState: 1 })
            let array = []
            array.push(res)
            const newData = array?.map(x => x.dataValues)
            const dataFinal = newData?.map(x => ({ name: x.name, id: enCode(x.id) }))
            const token = await generateToken(dataFinal[0])
            console.log(token)
            return {
                token: token,
                roles: false,
                success: true,
                message: 'Session created.',
            }
        }
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return error
    }
}

export const registerEmailLogin = async (_, { input }, ctx) => {
    const { uEmail } = input
    try {
        console.log(uEmail)
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
        console.log(error)
        return { success: false, message: error }
    }
}
export const getUser = async (_, args, context, info) => {
    try {
        const attributes = getAttributes(Users, info)
        const user = await Users.findOne({ attributes, where: { id: deCode(context.User.id) } })
        return user
    } catch (e) {
        throw new ApolloError('error')
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
        getUser
    },
    MUTATIONS: {
        newRegisterUser,
        registerEmailLogin,
    }
}
