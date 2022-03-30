import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import productModelFood from '../../models/product/productFood'
import pedidosModel from '../../models/Store/pedidos'
import ShoppingCard from '../../models/Store/ShoppingCard'
import StatusPedidosModel from '../../models/Store/statusPedidoFinal'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
import { deleteOneItem, getOneStore } from './store'
const { Op } = require('sequelize')

export const createOnePedidoStore = async (_, { input }, ctx) => {
    const { id, idStore, ShoppingCard, change, pickUp, pCodeRef, payMethodPState, pPRecoger } = input || {}
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
const changePPStatePPedido = async (_, { pPStateP, pCodeRef }, ctx) => {
    try {
        console.log(pPStateP, pCodeRef)
        const data = await StatusPedidosModel.update({ pSState: pPStateP }, { where: { pCodeRef: pCodeRef } })
        return {
            success: true,
            message: pPStateP === 1
                ? 'El pedido fue marcado como aprobado'
                : pPStateP === 2 ? 'El pedido fue marcado como en proceso'
                    : pPStateP === 3 ? 'El pedido Esta listo para salir'
                        : pPStateP === 4 ? 'Pedido fue pagado con éxito por el cliente (Concluido)'
                            : 'Pedido rechazado'
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}
const createMultipleOrderStore = async (_, { input }, ctx) => {
    const { setInput, change, pickUp, pCodeRef, payMethodPState, pPRecoger, totalProductsPrice, locationUser } = input || {}
    let res = {}
    try {
        await StatusPedidosModel.create({ id: deCode(ctx.User.id), locationUser, idStore: deCode(setInput[0].idStore), pSState: 0, pCodeRef: pCodeRef, change: change, payMethodPState: payMethodPState, pickUp, totalProductsPrice })
        for (let i = 0; i < setInput.length; i++) {
            const { ShoppingCard, idStore } = setInput[i]
            await deleteOneItem(null, { ShoppingCard, cState: 1 })
            await createOnePedidoStore(null, { input: { id: ctx.User.id, idStore, ShoppingCard, change, pickUp, pCodeRef, payMethodPState, pPRecoger } })
            // console.log(ShoppingCard, idStore)
        }
        return { success: true, message: 'Update' }
    } catch (error) {
        console.log(error)
        return { success: false, message: error }
    }
}
// store
export const getAllPedidoStore = async (_, args, ctx, info) => {
    const { idStore } = args
    try {
        const attributes = getAttributes(pedidosModel, info)
        // console.log(attributes)
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
            }
        })
        return data
    } catch (error) {
        return error
    }
}
// store
export const getAllPedidoStoreFinal = async (_, args, ctx, info) => {
    const { idStore } = args || {}
    try {
        const attributes = getAttributes(StatusPedidosModel, info)
        const data = await StatusPedidosModel.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
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
export const getAllPedidoUserFinal = async (_, args, ctx, info) => {
    const { id } = args || {}
    try {
        const attributes = getAttributes(StatusPedidosModel, info)
        const data = await StatusPedidosModel.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ID STORE
                        id: id ? deCode(id) : deCode(ctx.User.id),
                    }
                ]
            }, order: [['pDatCre', 'DESC']]
        })
        return data
    } catch (error) {
        return error
    }
}


export default {
    TYPES: {
        StorePedidos: {
            getOneStore,
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
            getAllPedidoStore: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(pedidosModel, info)
                    const data = await pedidosModel.findAll({
                        attributes,
                        where: { pCodeRef: parent.pCodeRef }
                    })
                    return data
                } catch {
                    return null
                }
            },
            getAllShoppingCard: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(ShoppingCard, info)
                    const data = await ShoppingCard.findOne({
                        attributes,
                        where: { ShoppingCard: deCode(parent.ShoppingCard) }
                    })
                    return data
                } catch {
                    return null
                }
            }
        },
    },
    QUERIES: {
        getAllPedidoStore,
        getAllPedidoStoreFinal,
        // User
        getAllPedidoUserFinal,
    },
    MUTATIONS: {
        createOnePedidoStore,
        createMultipleOrderStore,
        changePPStatePPedido,
    }
}
