/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-server-micro'
import catOfProducts from '../../models/Store/catOfProducts'
import { deCode, getAttributes } from '../../utils/util'

export const createCatOfProducts = async (_root, { input }, context ) => {
  try {
    await catOfProducts.create({ ...input, id: deCode(context.User.id) })
    return { success: true, message: 'Update' }
  } catch (e) {
    const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
export const getAllCatOfProducts = async (root, { idStore }, context, info) => {
  try {
    const attributes = getAttributes(catOfProducts, info)
    const data = await catOfProducts.findAll({ attributes, where: { id: 8 }, limit: [0, 100], order: [['catName', 'ASC']] })
    return data
  } catch (e) {
    const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
    return error
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllCatOfProducts
  },
  MUTATIONS: {
    createCatOfProducts
  }
}
