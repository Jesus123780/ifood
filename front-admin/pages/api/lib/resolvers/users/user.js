import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject } from '../../../../../utils'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterUser = async (root, input, _context, info) => {
    console.log(input, 0)

    try {
        let res = {}
        const { name, password, email, username } = input
        if (input?.id) {
            let values = {}
            for (const x in input) if (x !== 'id') values = { ...values, [x]: input[x] }
            res = await Users.update(
                { ...values },
                { where: { id: deCode(input.id) } }
            )
            const token = await generateToken(res)
            return {
                success: true,
                message: 'Session created.',
            }
        } else {
            const isExist = await Users.findOne({
                attributes: ['id', 'email', 'password'],
                where: {
                    [Op.or]: [
                        { email: email }
                    ]
                }
            })
            const StoreInfo = await Store.findOne({
                attributes: ['id', 'idStore'],
                where:
                    { id: deCode(isExist.id) }

            })
            const tokenGoogle = {
                name: name,
                username: username,
                restaurant: StoreInfo.idStore,
                id: isExist.id
            }
            const tokenGo = await generateToken(tokenGoogle)
            if (isExist && isExist.password === password) {
                return {
                    token: tokenGo,
                    roles: false,
                    storeUserId: StoreInfo.idStore,
                    success: true,
                    message: `Bienvenido ${name}`,
                }
            } else {
                res = await Users.create({ ...input, uState: 1 })
                let array = []
                array.push(res)
                const newData = array?.map(x => x.dataValues)
                const dataFinal = newData?.map(x => ({ name: x.name, id: enCode(x.id) }))
                const token = await generateToken(dataFinal[0])
                return {
                    token: token,
                    roles: false,
                    storeUserId: StoreInfo.idStore,
                    success: true,
                    message: 'Session created.',
                }
            }
        }
    } catch (e) {
        console.log(e);
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return error
    }
}

export const registerEmailLogin = async (_, { input }, ctx) => {
    const { uEmail } = input
    try {
        const existEmail = await Users.findOne({ attributes: ['email'], where: { email: uEmail } })
        const uToken = await generateCode()
        const dataUser = {
            uEmail: uEmail,
            code: uToken,
        }
        const token = await generateToken(dataUser)
        // sendEmail({
        //     from: 'juvi69elpapu@gmail.com',
        //     to: uEmail,
        //     text: 'Code recuperation.',
        //     subject: 'Code recuperation.',
        //     html: LoginEmail({
        //         code: uToken,
        //         or_JWT_Token: token
        //     })
        // }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err 1'))
        if (!existEmail) {
            Users.create({ email: uEmail, uState: 1, uToken: uToken })
        } else {
            await Users.update({ uToken: uToken }, { where: { email: uEmail } })
        }
    } catch (error) {
        return { success: false, message: error }
    }
}
/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1  email del usuario 
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
export const LoginEmailConfirmation = async (_root, { email, otp }, context, info) => {
    try {
        const existEmail = await Users.findOne({ attributes: ['email', 'uToken', 'id'], where: { email } })
        const StoreInfo = await Store.findOne({ attributes: ['storeName', 'idStore', 'id'], where: { id: deCode(existEmail.id) } })
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        if (!existEmail) return error
        const dataUser = {
            uEmail: email,
            // need fix
            restaurant: 'StoreInfo.idStore',
            code: existEmail.uToken,
            id: existEmail.id
        }
        if (existEmail.uToken === otp) {
            const token = await generateToken(dataUser)
            return {
                token: token,
                roles: false,
                // need fix
                idStore: 'StoreInfo.idStore',
                success: true,
                message: 'Session created.',
            }
        } else {
            return {
                token: 'null',
                roles: false,
                success: false,
                message: 'El codigo ya no es valido.',
            }
        }
        // sendEmail({
        //     from: 'juvi69elpapu@gmail.com',
        //     to: uEmail,
        //     text: 'Code recuperation.',
        //     subject: 'Code recuperation.',
        //     html: LoginEmail({
        //         code: uToken,
        //         or_JWT_Token: token
        //     })
        // }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err esteeeeeeeeee'))
    } catch (error) {
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
export const getOneUser = async (root, { uEmail }, context, info) => {
    try {
        const attributes = getAttributes(Users, info)
        const data = await Users.findOne({
            attributes,
            where: {
                [Op.or]: [
                    {
                        email: uEmail ? uEmail : { [Op.gt]: 0 },
                    }
                ]
            }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno o el producto no esta  registrado, Vuelve a intentarlo mas tarde.')
        return error
    }
}

const updateUserProfile = async (_root, { input }, context) => {
    try {
        const { user, ...rest } = input || {}
        const { id, ...resUser } = user
        await Users.update({ ...resUser }, { where: { id: deCode(id) } })
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}

export const setUserProfile = async (_root, { input }, context) => {
    const data = input
    const { user, ...res } = data || {}
    const { id } = user || {}
    try {
        const data = input
        const ExistUserProf = await Userprofile.findOne({
            attributes: ['id'],
            where: { id: deCode(context.User.id) }
        })
        if (user.id) {
            if (!ExistUserProf) {
                await Userprofile.create({ id: id || context?.User?.id, ...filterKeyObject(data, ['user', 'cId', 'ctId', 'dId']) })
            } else {
                await Userprofile.update({ ...filterKeyObject(data, ['user', 'cId', 'ctId', 'dId']) }, { where: { id: deCode(id) } })
            }
            await updateUserProfile(null, { input: data }, context)
            return { ...data }
        }
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getOneUserProfile = async (_root, { id }, context, info) => {
    try {
        const attributes = getAttributes(Userprofile, info)
        const data = await Userprofile.findOne({ attributes, where: { id: deCode('NTQ0MTc3NjI5NzAzMDMyOTAw') } })
        return data
    } catch (e) {
        const error = new Error(e, 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getUser,
        getOneUser,
        getOneUserProfile,
    },
    MUTATIONS: {
        newRegisterUser,
        LoginEmailConfirmation,
        setUserProfile,
        registerEmailLogin,
    }
}
