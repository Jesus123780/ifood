import { ApolloError } from 'apollo-server-micro'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import Users from '../../models/Users'
import { deCode } from '../../utils/util'
import Store from '../../models/Store/Store'
import { generateToken } from '../../utils'
import { getUserFromToken } from 'pages/api/auth'



/**
 * New user token.
 * @param {Object} _ Not used
 * @param {Object} __ Not used
 * @param {Object} __ Context data
 * @return {Object} data
 * @version 1.1
 * @author Jesus Juvinao
 */

const refreshUserPayrollToken = (async (_, { id, error, token }, __) => {
    try {
        const { error: e } = await getUserFromToken(token)
        if (!token) return { success: false, message: 'Session expired', tokenAuth: null }
        if (e) {
            const data = await Users.findOne({ attributes: ['id', 'name', 'username'], where: { id: deCode(id) } })
            const StoreInfo = await Store.findOne({ attributes: ['idStore', 'id'], where: { id: deCode(id) } })
            if (!data || !StoreInfo) return { success: false, message: 'Incorrect dates', tokenAuth: null }
            const UserToken = {
                name: data.name || null,
                username: data.username || null,
                restaurant: StoreInfo ? StoreInfo : null,
                id
            }
            const tokenAuth = await generateToken(UserToken)
            if (!tokenAuth) return { success: false, message: 'invalid token', tokenAuth: null }
            return { success: true, message: 'Token actualizado', tokenAuth }
        }
    } catch (error) {
        return { success: true, message: 'Ocurrió un error', tokenAuth: null }
    }
}
)

export default {
    TYPES: {

    },
    QUERIES: {
    },
    MUTATIONS: {
        refreshUserPayrollToken
    }
}
