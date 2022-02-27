import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject } from 'utils'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import productModelFood from '../../models/product/productFood'
import ScheduleStore from '../../models/Store/ScheduleStore'
import ShoppingCard from '../../models/Store/ShoppingCard'
import SubProducts from '../../models/Store/shoppingCardSubProduct'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterStore = async (_, { input }, ctx) => {
    // const id = ctx.User.id || ''
    const { idStore, cId, dId, ctId, id, catStore, neighborhoodStore, Viaprincipal, storeOwner, storeName, emailStore, storePhone, socialRaz, Image, banner, documentIdentifier, uPhoNum, ULocation, upLat, upLon, uState, siteWeb, description, NitStore, typeRegiments, typeContribute, addressStore, createAt, } = input
    try {
        let res = {}
        res = await Store.create({ ...input, uState: 1, cId: deCode(cId), id: deCode(id), dId: deCode(dId), ctId: deCode(ctId), catStore: deCode(catStore) })
        // sendEmail({
        //     from: 'juvi69elpapu@gmail.com',
        //     to: uEmail,
        //     text: 'Code recuperation.',
        //     subject: 'Code recuperation.',
        //     html: LoginEmail({
        //         code: uToken,
        //         or_JWT_Token: token
        //     })
        // }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err'))
        return {
            success: true,
            idStore: res.idStore,
            message: 'Tienda creada',
        }
    } catch (error) {
        return { success: false, message: error }
    }
}
export const getStore = async (_root, { id, StoreName, idStore }, context, info) => {
    const attributes = getAttributes(Store, info)
    const data = await Store.findOne({
        attributes,
        where: { 
            idStore: deCode(context.restaurant),
            // idStore: deCode(id) 
        }
        // where: { id: deCode('NjUzMDEzMTU1NjQzNjM5NTAwMA==') }
    })
    return data
}
export const oneCategoriesStore = async (parent, _args, _context, info) => {
    try {
        const attributes = getAttributes(CatStore, info)
        const data = CatStore.findOne({ attributes, where: { catStore: deCode(parent.catStore) } })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
const updateExtraProduct = async ({ input }) => {
    try {
        const { _id, id, pId } = input || {}
        await SubProducts.create({ pId: deCode(pId), id: deCode(id), opExPid: deCode(_id) })
        return input
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }

}
/**
 * 
 * @param {*} root 
 * @param {*} args 
 * @param {*} context contexto de la app 
 * @param {*} _info ADMINISTRA SHOPPING_CART 
 */
export const deleteOneItem = async (root, args, context, _info) => {
    try {
        const { ShoppingCard: id, cState } = args || {}
        await ShoppingCard.update({ cState: cState === 1 ? 0 : 1 }, { where: { ShoppingCard: deCode(id) } })
        return { success: true, message: 'Eliminado del carrito' }

    } catch (error) {
        return { success: false, message: 'No pudo ser eliminado' }
    }
}
export const registerShoppingCard = async (root, input, context, _info) => {
    const { idSubArray } = input || {}
    const { id } = context.User
    console.log(context.User)
    const { cName, cantProducts, cState, csDescription, pId, comments, idStore } = input.input || {}
    const { setID } = idSubArray || {}
    try {
        const data = await ShoppingCard.create({ pId: deCode(pId), id: deCode(id), comments, cantProducts, idStore: deCode(idStore) })
        for (let i = 0; i < setID.length; i++) {
            const { _id } = setID[i]
            await updateExtraProduct({ input: { _id, id, pId } })
        }
        return data
    } catch (e) {
        console.log(e)
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return e
    }
}
export const getAllShoppingCard = async (_root, { input }, context, info) => {
    try {
        const attributes = getAttributes(ShoppingCard, info)
        const data = await ShoppingCard.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // state
                        id: deCode(context.User.id),
                        cState: { [Op.gt]: 0 }
                    }
                ]
            }
        })
        return data
    } catch (e) {
        throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
    }
}

export const getAllStoreInStore = async (root, args, context, _info) => {
    try {
        const { search, min, max } = args
        let whereSearch = {}
        if (search) {
            whereSearch = {
                [Op.or]: [
                    { cpName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                ]
            }
        }
        const attributes = getAttributes(Store, _info)
        const data = await Store.findAll({
            attributes: [
                'idStore', 'cId',
                'id', 'dId',
                'ctId',
                // 'catStore',
                'neighborhoodStore', 'Viaprincipal',
                'storeOwner', 'storeName',
                'emailStore', 'storePhone',
                'socialRaz', 'Image',
                'banner', 'documentIdentifier',
                'uPhoNum', 'ULocation',
                'upLat', 'upLon',
                'uState', 'siteWeb',
                'description', 'NitStore',
                'typeRegiments', 'typeContribute',
                'secVia', 'addressStore',
                'createAt'
            ],
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        // ID Productos
                        uState: 1
                        // // ID departamento
                        // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                        // // ID Cuidad
                        // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['storeName', 'DESC']]
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getOneStore = async (parent, args, context, info) => {
    const { idStore, StoreName } = args
    try {
        const attributes = getAttributes(Store, info)
        const data = Store.findOne({ attributes, where: { idStore: deCode(idStore) } })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}


export default {
    TYPES: {
        CatStore: {
            getAllStore: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(Store, info)
                    const data = await Store.findAll({
                        attributes,
                        where: { catStore: deCode(parent.catStore) }
                    })
                    return data
                } catch {
                    return null
                }

            }
        },
        ShoppingCard: {
            getStore: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(Store, info)
                    const data = await Store.findOne({
                        attributes,
                        where: { idStore: deCode(parent.idStore) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            productFood: async (parent, _args, _context, info) => {
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
        },
        Store: {
            getStoreSchedules: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(ScheduleStore, info)
                    const data = await ScheduleStore.findAll({
                        attributes,
                        where: { idStore: deCode(parent.idStore) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            cateStore: oneCategoriesStore,
            pais: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(CountriesModel, info)
                    const data = await CountriesModel.findOne({
                        attributes,
                        where: { cId: deCode(parent.cId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            department: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(DepartmentsModel, info)
                    const data = await DepartmentsModel.findOne({
                        attributes,
                        where: { dId: deCode(parent.dId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            city: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(CitiesModel, info)
                    const data = await CitiesModel.findOne({
                        attributes,
                        where: { ctId: deCode(parent.ctId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
        }
    },
    QUERIES: {
        getStore,
        getAllShoppingCard,
        getAllStoreInStore,
        getOneStore

    },
    MUTATIONS: {
        newRegisterStore,
        deleteOneItem,
        registerShoppingCard,
    }
}
