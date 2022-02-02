import { ApolloError } from 'apollo-server-micro'
import catOfProducts from '../../models/Store/catOfProducts'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const createCatOfProducts = async (_root, { input }, context ) => {
    console.log(input)
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
        // const data = await catOfProducts.findAll({ attributes, where: { id: deCode(context.User.id) } })

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
