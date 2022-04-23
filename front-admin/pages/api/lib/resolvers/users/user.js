import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject } from '../../../../../utils'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import Userprofile from '../../models/users/UserProfileModel'
import { generateCode, generateToken } from '../../utils'
import { deCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterUser = async (root, input) => {
    const { name, password, email, username } = input
    try {
        // eslint-disable-next-line
        const { count, rows } = await Users.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        email: {
                            [Op.like]: email
                        }
                    }
                ]
            },
            offset: 10,
            limit: 2
        });
        // console.log(count);
        // console.log(rows);
        const project = await Users.findByPk(1);
        if (project === null) {
            console.log('Not found!', 53);
        } else {
            // console.log(project instanceof Project, 0); // true
            // Its primary key is 123
        }
        // eslint-disable-next-line
        const [user, _created] = await Users.findOrCreate({
            where: { email: email },
            defaults: {
                name,
                password,
                email,
                username
            }
        })
        const StoreInfo = await Store.findOne({ attributes: ['idStore', 'id'], where: { id: deCode(user.id) } })
        const tokenGoogle = {
            name: name,
            username: username,
            restaurant: StoreInfo ? StoreInfo : null,
            id: user.id
        }
        const tokenGo = await generateToken(tokenGoogle)
        return {
            token: tokenGo,
            roles: false,
            storeUserId: StoreInfo ? StoreInfo : null,
            success: true,
            userId: user.id,
            message: `Bienvenido ${name}`,
        }
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return error
    }
}
// eslint-disable-next-line
export const sayHello = async (_, { input }, ctx) => {
    return 'Hello Pero que pasa chavales todo bien todo correcto...'
}
export const registerEmailLogin = async (_, { input }, ctx) => {
    const { uEmail } = input
    try {
        const existEmail = await Users.findOne({ attributes: ['email'], where: { email: uEmail } })
        const uToken = await generateCode()

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
// eslint-disable-next-line
export const LoginEmailConfirmation = async (_root, { email, otp }, context, info) => {
    try {
        const existEmail = await Users.findOne({ attributes: ['email', 'uToken', 'id'], where: { email } })
        await Store.findOne({ attributes: ['storeName', 'idStore', 'id'], where: { id: deCode(existEmail.id) } })
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
    } catch (error) {
        return { success: false, message: error }
    }
}
export const getUser = async (_, args, context, info) => {
    if (!context.User) return {}
    try {
        const attributes = getAttributes(Users, info)
        const user = await Users.findOne({ attributes, where: { id: deCode(context.User.id) } })
        return user
    } catch (e) {
        throw new ApolloError('Inicie session correctamente')
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
// eslint-disable-next-line
const updateUserProfile = async (_root, { input }, context) => {
    try {
        // eslint-disable-next-line
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
    // eslint-disable-next-line
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
        console.log(e)
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
// eslint-disable-next-line
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
        sayHello,
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
