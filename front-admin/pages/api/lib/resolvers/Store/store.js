import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
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
    console.log('DATA USER', 0);
    const attributes = getAttributes(Store, info)
    const data = await Store.findOne({
        attributes,
        where: { idStore: deCode(context.restaurant), id: deCode(context.User.id) }
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
export const getAllStoreInStore = async (root, args, context, info) => {
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
        const attributes = getAttributes(Store, info)
        const data = await Store.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ...whereSearch,
                        // ID Productos
                        uState: { [Op.gt]: 0 }
                        // // ID departamento
                        // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                        // // ID Cuidad
                        // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['storeName', 'ASC']]
        })
        return data
    } catch (e) {
        console.log(e)
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getOneStore = async (parent, args, context, info) => {
    const { idStore, StoreName } = args
    // console.log(context.restaurant, 'OYEEEEEEEEEEEE SI      PAPI IIIIIIII ', 0);
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
        Store: {
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
        getAllStoreInStore,
        getOneStore
    },
    MUTATIONS: {
        newRegisterStore,
    }
}
