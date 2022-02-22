import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject, REFRESH_TOKEN_COOKIE_OPTIONS } from '../../../../../utils'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import UserLocation from '../../models/product/userLocations'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import CitiesModel from '../../models/information/CitiesModel'
const { Op } = require('sequelize')

export const updateUserLocations = async (root, input, context, info) => {
    console.log(input)
    try {
        const { 
            cId,
            dId,
            ctId,
            uLatitud,
            uLongitude,
            uLocationKnow,
            uPiso,
            DatCre,
            DatMod } = input.input || {}
        const data = await UserLocation.create({ id: deCode(context.User.id), uLocationKnow, uPiso, uLongitude, uLatitud, ctId: deCode(ctId), dId: deCode(dId), cId: deCode(cId)})
        return data
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return e
    }
}
export const deleteUserLocations = async (root, { uLocationState, locationId }, context, info) => {
    try {
        await UserLocation.update({ uLocationState: uLocationState === 1 ? 0 : 1 }, { where: { locationId: deCode(locationId) } })
        return {
            success: true,
            message: 'Ubicación eliminada'
        }
    } catch (e) {
        const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
        return e
    }
}
export const getUserLocations = async (_root, _args, context, info) => {
    try {
        const attributes = getAttributes(UserLocation, info)
        const data = await UserLocation.findAll({
            attributes, where: {
                id: deCode(context.User.id),
                uLocationState: { [Op.gt]: 0 }
            }, order: [['DatCre', 'DESC']]
        })
        return data
    } catch (e) {
        throw ApolloError('Lo sentimos, ha ocurrido un error interno')
    }
}

export default {
    TYPES: {
        UserLocation: {
            pais: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(CountriesModel, info)
                    const data = await CountriesModel.findOne({
                        attributes,
                        where: { cId: deCode(parent.cId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            department: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(DepartmentsModel, info)
                    const data = await DepartmentsModel.findOne({
                        attributes,
                        where: { dId: deCode(parent.dId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            city: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(CitiesModel, info)
                    const data = await CitiesModel.findOne({
                        attributes,
                        where: { ctId: deCode(parent.ctId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
        },
    },
    QUERIES: {
        getUserLocations
    },
    MUTATIONS: {
        updateUserLocations,
        deleteUserLocations
    }
}
