import { ApolloError } from 'apollo-server-micro'
import UserLocation from '../../models/product/userLocations'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'
import dynamicPassword from '../../models/users/dynamicPassword'

export const registerDynamicPassword = async (_root, { input }, context) => {
  try {
    await dynamicPassword.create({ id: deCode(context.User.id), idStore: deCode(context.restaurant), ...input })
    return {
      message: 'Se registró correctamente el código de seguridad',
      success: true
    }
  } catch (e) {
    const error = new ApolloError('Lo sentimos, ha ocurrido un error interno', 400)
    return error
  } 
}
export const getAOneDynamicPassword = async (_, _args, ctx, info) => {
  try {
    const attributes = getAttributes(dynamicPassword, info)
    const data = await dynamicPassword.findOne({
      attributes,
      where: {
        [Op.or]: [
          {
            id: deCode(ctx.User.id),
            dState: { [Op.gt]: 0 }
          }
        ]
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const deleteUserLocations = async (_root, { uLocationState, locationId }) => {
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
export const getAllDynamicPassword = async (_root, _args, _context, info) => {
  try {
    const attributes = getAttributes(dynamicPassword, info)
    const data = await dynamicPassword.findAll({
      attributes,
      where: {
        dState: { [Op.gt]: 0 }
      }
    })
    return data
  } catch (e) {
    throw ApolloError('Lo sentimos, ha ocurrido un error interno' + e)
  }
}

export default {
  TYPES: {

  },
  QUERIES: {
    getAllDynamicPassword,
    getAOneDynamicPassword
  },
  MUTATIONS: {
    // registerDynamicPassword,
    // deleteUserLocations
  }
}
