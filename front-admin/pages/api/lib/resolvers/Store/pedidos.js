import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import productModelFood from '../../models/product/productFood'
import pedidosModel from '../../models/Store/pedidos'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const createOnePedidoStore = async (_, { input }, ctx) => {
    const { id, idStore, pId } = input || {}
    let res = {}
    try {
        res = await pedidosModel.create({ ...input, uState: 1, id: deCode(id), idStore: deCode(idStore), pId: deCode(pId) })
        return {
            success: true,
            idStore: 'res.idStore',
            message: 'Tienda creada',
        }
    } catch (error) {
        return { success: false, message: error }
    }
}
// store
export const getAllPedidoStore = async (_, args, ctx, info) => {
    const { idStore } = args
    try {
        const attributes = getAttributes(pedidosModel, info)
        const data = await pedidosModel.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ppState: 0,
                        // ID STORE
                        idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
                    }
                ]
            },
            order: [['pCodeRef', 'DESC']]
        })
        return data
    } catch (error) {
        return error
    }
}
export default {
    TYPES: {
        StorePedidos: {
            productFoodsOne: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(productModelFood, info)
                    const data = await productModelFood.findOne({
                        attributes,
                        where: { pId: deCode(parent.pId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            getUser: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(Users, info)
                    const data = await Users.findOne({
                        attributes,
                        where: { id: deCode(parent.id) }
                    })
                    return data
                } catch {
                    return null
                }
            },
        }
    },
    QUERIES: {
        getAllPedidoStore
    },
    MUTATIONS: {
        createOnePedidoStore,
    }
}
