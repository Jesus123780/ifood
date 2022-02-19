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
    const { id, idStore, ShoppingCard, change, pickUp, pCodeRef, payMethodPState, pPRecoger } = input || {}
    console.log(id, idStore, ShoppingCard, change, pickUp, pCodeRef, payMethodPState, pPRecoger)
    let res = {}
    try {
        res = await pedidosModel.create({
            ...input,
            pPStateP: 1,
            id: deCode(id),
            idStore: deCode(idStore),
            ShoppingCard: deCode(ShoppingCard),
            pCodeRef,
            pPRecoger,
            payMethodPState
        })
        return {
            success: true,
            message: '',
        }
    } catch (error) {
        return { success: false, message: error }
    }
}
const createMultipleOrderStore = async (_, { input }, ctx) => {
    const { setInput, change, pickUp, pCodeRef, payMethodPState, pPRecoger } = input || {}
    // console.log(input)
    let res = {}
    const id = 'MjcyMDg4ODE0ODUxNTE2NDUw'
    try {
        for (let i = 0; i < setInput.length; i++) {
            const { ShoppingCard, idStore } = setInput[i]
            await createOnePedidoStore(null, { input: { id, idStore, ShoppingCard, change, pickUp, pCodeRef, payMethodPState, pPRecoger } })
            // console.log(ShoppingCard, idStore)
        }
        return { success: true, message: 'Update' }
    } catch (error) {
        return { success: false, message: error }
    }
}
// store
export const getAllPedidoStore = async (_, args, ctx, info) => {
    const { idStore } = args
    try {
        // const attributes = getAttributes(pedidosModel, info)
        // console.log(attributes)
        const data = await pedidosModel.findAll({
            attributes: [
                'pdpId',
                // 'id',
                // 'idStore',   
                'pId',
                // 'ppState',
                // 'pCodeRef',
                // 'pPDate',
                // 'pPStateP',
                // 'payMethodPState',
                // 'pPRecoger',
                // 'unidProducts',
                // 'pDatCre',
                // 'pDatMod'
            ],
            where: {
                [Op.or]: [
                    {
                        // ppState: 0,
                        // ID STORE
                        idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
                    }
                ]
            }
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
        createMultipleOrderStore,
    }
}
