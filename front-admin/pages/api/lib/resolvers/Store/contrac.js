/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-server-micro'
import Contract from '../../models/Store/contract'
import { deCode } from '../../utils/util'

export const createOneContract = async (_root, { input }, context) => {
  try {
    await Contract.create({ ...input, id: deCode(context.User.id), idStore: deCode(context.restaurant) })
    return { success: true, message: 'Update' }
  } catch (e) {
    const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
export const getOneCOntractStore = async (_root, { StoreName }, context) => {
  try {
    const data = await Contract.findOne({ id: deCode(context.User.id), idStore: deCode(context.restaurant) })
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
    getOneCOntractStore
  },
  MUTATIONS: {
    createOneContract
  }
}
