import { ApolloError } from 'apollo-server-micro'
import UserLocation from '../../models/product/userLocations'
import { deCode, getAttributes } from '../../utils/util'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import CitiesModel from '../../models/information/CitiesModel'
import { Op } from 'sequelize'

export const updateUserLocations = async (_root, input, context) => {
  try {
    const {
      cId,
      dId,
      ctId,
      uLatitud,
      uLongitude,
      uLocationKnow,
      uPiso
    } = input.input || {}
    const data = await UserLocation.create({ id: deCode(context.User.id), uLocationKnow, uPiso, uLongitude, uLatitud, ctId: deCode(ctId), dId: deCode(dId), cId: deCode(cId) })
    return data
  } catch (e) {
    const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
    return error
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteUserLocations = async (_root, { uLocationState, locationId }, _context, _info) => {
  try {
    await UserLocation.update({ uLocationState: uLocationState === 1 ? 0 : 1 }, { where: { locationId: deCode(locationId) } })
    return {
      success: true,
      message: 'Ubicación eliminada'
    }
  } catch (e) {
    const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
    return error
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
      }
    }
  },
  QUERIES: {
    getUserLocations
  },
  MUTATIONS: {
    updateUserLocations,
    deleteUserLocations
  }
}
