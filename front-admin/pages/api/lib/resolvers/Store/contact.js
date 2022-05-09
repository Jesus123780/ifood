import contacts from '../../models/Store/contacts'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

export const createContacts = async (_, { input }, ctx) => {
  try {
    await contacts.create({ ...input, cntState: 1, id: deCode(ctx.User.id), idStore: deCode(ctx.restaurant) })
    return {
      success: true,
      message: 'creada'
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
export const getAllContacts = async (_, { idStore }, ctx, info) => {
  try {
    const attributes = getAttributes(contacts, info)
    const data = await contacts.findAll({
      attributes,
      where: {
        idStore: deCode(ctx.restaurant),
        id: deCode(ctx.User.id),
        cntState: { [Op.gt]: 0 }
      }
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllContacts
  },
  MUTATIONS: {
    createContacts
  }
}
