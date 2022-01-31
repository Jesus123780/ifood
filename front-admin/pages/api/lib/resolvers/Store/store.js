import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const newRegisterStore = async (_, { input }, ctx) => {
    // const id = ctx.User.id || ''
    const { idStore, cId, dId, ctId, id, catStore, neighborhoodStore, Viaprincipal, storeOwner, storeName, emailStore, storePhone, socialRaz, Image, banner, documentIdentifier, uPhoNum, ULocation, upLat, upLon, uState, siteWeb, description, NitStore, typeRegiments, typeContribute, addressStore, createAt, } = input
    try {
        let res = {}
        res = await Store.create({ ...input, uState: 1, cId: deCode(cId), id: deCode(id), dId: deCode(dId), ctId: deCode(ctId),  catStore: deCode(catStore) })
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
        where: { idStore: deCode(context.restaurant) }
        // where: { id: deCode('NjUzMDEzMTU1NjQzNjM5NTAwMA==') }
    })
    return data
}
export const oneCategoriesStore = async (parent, _args, _context, info) => {
    try {
        const attributes = getAttributes(CatStore, info)
        const data = CatStore.findOne({ attributes,  where: { catStore: deCode(parent.catStore) } })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getOneStore = async (parent, _args, context, info) => {
    console.log(context.restaurant, 'OYEEEEEEEEEEEE SI      PAPI IIIIIIII ', 0);
    
    // try {
    //     const attributes = getAttributes(CatStore, info)
    //     const data = CatStore.findOne({ attributes,  where: { catStore: deCode(parent.catStore) } })
    //     return data
    // } catch (e) {
    //     const error = new Error('Lo sentimos, ha ocurrido un error interno')
    //     return error
    // }
}
export default {
    TYPES: {
        Store: {
            cateStore: oneCategoriesStore
        }
    },
    QUERIES: {
        getStore,
        getOneStore
    },
    MUTATIONS: {
        newRegisterStore,
    }
}
