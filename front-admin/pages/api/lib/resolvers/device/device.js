import UserDeviceModel from '../../models/users/userDevice'
import { deCode, getAttributes } from '../../utils/util'

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
export const getDeviceUsers = async (_root, _args, context, info) => {
  try {
    const attributes = getAttributes(UserDeviceModel, info)
    const data = await UserDeviceModel.findAll({
      attributes,
      where: {
        id: deCode(context.User.id)
      }
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
    return error
  }

}

export default {
  TYPES: {
  },
  QUERIES: {
    getDeviceUsers
  },
  MUTATIONS: {
  }
}
