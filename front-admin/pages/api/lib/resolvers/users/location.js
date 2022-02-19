import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject, REFRESH_TOKEN_COOKIE_OPTIONS } from '../../../../../utils'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import UserLocation from '../../models/product/userLocations'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const updateUserLocations = async (root, input) => {
    try {
        const { 
            id,
            cId,
            dId,
            ctId,
            uLatitud,
            uLongitude,
            uLocationKnow,
            uPiso,
            DatCre,
            DatMod } = input.input || {}
        const data = await UserLocation.create({ id: deCode(id), uLocationKnow, uPiso, uLongitude, uLatitud, ctId: deCode(ctId), dId: deCode(dId), cId: deCode(cId)})
        return data
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return e
    }
}
export const getUserLocations = async (_root, _args, _context, info) => {
    try {
        const attributes = getAttributes(UserLocation, info)
        const data = await UserLocation.findAll({ attributes, where: { uLocationState: { [Op.gt]: 0 } } })
        return data
    } catch (e) {
        throw ApolloError('Lo sentimos, ha ocurrido un error interno')
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getUserLocations
    },
    MUTATIONS: {
        updateUserLocations
    }
}
