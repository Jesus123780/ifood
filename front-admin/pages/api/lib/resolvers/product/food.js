import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import productModel from '../../models/product/food'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterFoodProduct = async (_, { input }, ctx) => {
    const id = ctx.User.id || ''
    const { idStore } = input
    try {
        // let res = {}
        await productModel.create({ ...input, pState: 1, id: deCode(id), idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant), })
        return {
            success: true,
            message: 'producto  creado',
        }
    } catch (error) {
        return { success: false, message: error }
    }
}
export const getStore = async (root, args, context, info) => {
    const attributes = getAttributes(Store, info)
    const data = await Store.findOne({
        attributes,
        where: { id: deCode(context.User.id) }
    })
    return data
}
export const getFoodAllProduct = async (root, args, context, info) => {
    const { search, min, max, pfId, gender, desc, categories } = args
    let whereSearch = {}
    if (search) {
        whereSearch = {
            [Op.or]: [
                { pName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                { ProPrice: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                { ProDescuento: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                { ProDelivery: { [Op.substring]: search.replace(/\s+/g, ' ') } }
            ]
        }
    }
    if (gender?.length) {
        whereSearch = {
            ...whereSearch,
            ProDelivery: {
                [Op.in]: gender.map(x => x)
            }
        }
    }
    if (desc?.length) {
        whereSearch = {
            ...whereSearch,
            ProDescuento: { [Op.in]: desc.map(x => x) }
        }
    }
    //validad que  venga una categoría para hacer el filtro por categorías
    if (categories?.length) {
        whereSearch = {
            ...whereSearch,
            caId: { [Op.in]: categories.map(x => deCode(x)) }
        }
    }

    const attributes = getAttributes(productModel, info)
    const data = await productModel.findAll({
        attributes,
        where: {
            [Op.or]: [
                {
                    // ...whereSearch,
                    // ID Productos
                    // pfId: pfId ? deCode(pfId) : { [Op.gt]: 0 },
                    pState: 1
                    // // ID departamento
                    // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                    // // ID Cuidad
                    // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                }
            ]
        }, limit: [min || 0, max || 100], order: [['pName', 'ASC']]
    })
    return data
}
export default {
    TYPES: {

    },
    QUERIES: {
        getFoodAllProduct
    },
    MUTATIONS: {
        newRegisterFoodProduct,
    }
}
