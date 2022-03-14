import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject } from 'utils'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import productModelFood from '../../models/product/productFood'
import FavoritesModel from '../../models/Store/FavoritesModel'
import ScheduleStore from '../../models/Store/ScheduleStore'
import ShoppingCard from '../../models/Store/ShoppingCard'
import RatingStore from '../../models/Store/ratingStore'
import SubProducts from '../../models/Store/shoppingCardSubProduct'
import Store from '../../models/Store/Store'
import { deCode, getAttributes } from '../../utils/util'
import ratingStoreStart from '../../models/Store/ratingStoreStart'
const { Op } = require('sequelize')

export const newRegisterStore = async (_, { input }, ctx) => {
    // const id = ctx.User.id || ''
    const { idStore, cId, dId, ctId, id, catStore, neighborhoodStore, Viaprincipal, storeOwner, storeName, emailStore, storePhone, socialRaz, Image, banner, documentIdentifier, uPhoNum, ULocation, upLat, upLon, uState, siteWeb, description, NitStore, typeRegiments, typeContribute, addressStore, createAt, } = input
    try {
        let res = {}
        res = await Store.create({ ...input, uState: 2, cId: deCode(cId), id: deCode(id), dId: deCode(dId), ctId: deCode(ctId), catStore: deCode(catStore) })
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
        // const attributes = getAttributes(CatStore, info)

        const data = CatStore.findOne({ attributes: ['catStore'], where: { catStore: deCode(parent.catStore) } })
        return data
    } catch (e) {
        console.log(e)
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
        console.log(args)
        const { ShoppingCard: id, cState } = args || {}
        // ShoppingCard.destroy({ where: { ShoppingCard: deCode(id) } })
        await ShoppingCard.update({ cState: cState === 1 ? 0 : 1 }, { where: { ShoppingCard: deCode(id) } })
        return { success: true, message: 'Eliminado del carrito' }
    } catch (error) {
        return { success: false, message: 'No pudo ser eliminado' }
    }
}
export const registerShoppingCard = async (root, input, context, _info) => {
    const { idSubArray } = input || {}
    const { id } = context.User
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
                'id',
                'dId',
                'ctId',
                'catStore',
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
                        uState: 2
                        // // ID departamento
                        // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                        // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100],
            order: [
                // [ratingStoreStart, 'rScore', 'ASC']
                ['createdAt', 'DESC'],
                ['storeName', 'DESC'],
                ['id', 'DESC']
            ]
        })
        return data
    } catch (e) {
        console.log(e)
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
// export const getAllStoreAdmins = async (root, args, context, _info) => {
//     try {
//         const { search, min, max } = args
//         let whereSearch = {}
//         if (search) {
//             whereSearch = {
//                 [Op.or]: [
//                     { cpName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
//                 ]
//             }
//         }
//         const attributes = getAttributes(Store, _info)
//         const data = await Store.findAll({
//             attributes: [
//                 'idStore', 'cId',
//                 'id',
//                 'dId',
//                 'ctId',
//                 // 'catStore',
//                 'neighborhoodStore', 'Viaprincipal',
//                 'storeOwner', 'storeName',
//                 'emailStore', 'storePhone',
//                 'socialRaz', 'Image',
//                 'banner', 'documentIdentifier',
//                 'uPhoNum', 'ULocation',
//                 'upLat', 'upLon',
//                 'uState', 'siteWeb',
//                 'description', 'NitStore',
//                 'typeRegiments', 'typeContribute',
//                 'secVia', 'addressStore',
//                 'createAt'
//             ],
//             where: {
//                 [Op.or]: [
//                     {
//                         ...whereSearch,
//                         // ID Productos
//                         uState: 2
//                         // // ID departamento
//                         // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
//                         // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
//                     }
//                 ]
//             }, limit: [min || 0, max || 100],
//             order: [
//                 // [ratingStoreStart, 'rScore', 'ASC']
//                 ['createdAt', 'DESC'],
//                 ['storeName', 'DESC'],
//                 ['id', 'DESC']
//             ]
//         })
//         return data
//     } catch (e) {
//         console.log(e)
//         const error = new Error('Lo sentimos, ha ocurrido un error interno')
//         return error
//     }
// }
export const getOneStore = async (parent, args, context, info) => {
    const { idStore, StoreName } = args
    try {
        const attributes = getAttributes(Store, info)
        const data = Store.findOne({ attributes, where: { idStore: idStore ? deCode(idStore) : deCode(parent.idStore) } })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}


export const updateFavorites = async (_root, { input }, context) => {
    try {
        const { fState, idStore } = input || {}
        await FavoritesModel.update({ fState: fState === 0 ? 1 : 0 }, { where: { idStore: deCode(idStore), id: deCode(context.User.id) } })
        return { ...input, id: deCode(context.User.id) }

    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return e
    }
}
export const getFavorite = async (_root, args, context, info) => {
    try {
        const attributes = getAttributes(FavoritesModel, info)
        const data = await FavoritesModel.findAll({
            attributes: ['id', 'fState', 'fIStoreId', 'idStore', 'updateAt', 'createAt'],
            where: { id: deCode(context.User.id), fState: 1 }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return e
    }
}
export const getOneFavorite = async (_root, { idStore }, context, info) => {
    try {
        // console.log(idStore)
        const data = await FavoritesModel.findOne({
            attributes: ['id', 'fState', 'fIStoreId', 'idStore'],
            where: { idStore: deCode(idStore), id: deCode(context.User.id) }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return e
    }
}
export const getOneRating = async (_root, args, context, info) => {
    const { idStore } = args || {}
    try {
        const attributes = getAttributes(RatingStore, info)
        const data = await RatingStore.findOne({
            attributes,
            where: { idStore: deCode(idStore), id: /* deCode(context.User.id) */ deCode(context.User.id) }
        })
        return data

    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }

}
export const getAllRating = async (_root, args, ctx, info) => {
    const { idStore } = args || {}
    try {
        const attributes = getAttributes(RatingStore, info)
        const data = await RatingStore.findAll({
            attributes,
            where: { idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant), }
        })
        return data

    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }

}
export const getAllRatingStar = async (_root, { idStore }, ctx, info) => {
    const data = await ratingStoreStart.findAll({
        attributes: ['rScore', 'idStore', 'rSId', 'createAt'],
        where: { idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant), }
    })
    return data
}
export const setRatingStar = async (_root, { input }, context) => {
    const { idStore, rScore } = input || {}
    console.log(idStore, rScore)
    try {
        const [rating, _created] = await ratingStoreStart.findOrCreate({
            where: { id: deCode(context.User.id) },
            defaults: {
                id: deCode(context.User.id),
                idStore: deCode(idStore),
                rScore
            }
        })
        if (rating) {
            await ratingStoreStart.update({
                rScore
            }, { where: { id: deCode(context.User.id) } })
            return { success: true, message: '' }
        }
        return { success: true, message: 'Subido con éxito' }
    } catch (error) {
        return { success: false, message: error }
    }

}
export const setRating = async (_root, { input }, context) => {
    const { idStore, rAppearance, rTasty, rGoodTemperature, rGoodCondition } = input || {}
    try {
        const [rating, _created] = await RatingStore.findOrCreate({
            where: { id: deCode(context.User.id) },
            defaults: {
                id: deCode(context.User.id),
                idStore: deCode(idStore),
                rAppearance,
                rGoodTemperature,
                rTasty,
                rGoodCondition,
                rState: 1
            }
        })
        if (rating) {
            await RatingStore.update({
                rState: 1,
                rAppearance,
                rGoodTemperature,
                rTasty,
                rGoodCondition,
            }, { where: { idStore: deCode(idStore) } })
            return { success: true, message: 'Campos subidos' }
        }
        return { success: true, message: 'Subido con éxito' }
    } catch (error) {
        return { success: false, message: error }
    }

}
export const setFavorites = async (_root, { input }, context) => {
    try {
        const data = input
        const { idStore } = data || {}
        if (data.fState) {
            await updateFavorites(null, { input: data }, context)
            return { success: false, message: 'El Restaurante ha sido eliminado de tus favoritos' }
        } else {
            const isFavorites = await FavoritesModel.findOne({
                attributes: ['id', 'fState', 'fIStoreId', 'idStore'],
                where: { idStore: deCode(idStore) }
            })
            if (isFavorites) {
                await FavoritesModel.update({ fState: isFavorites.fState === 0 ? 1 : 0 }, { where: { idStore: deCode(idStore), id: deCode(context.User.id) } })

                if (isFavorites.fState === 0) {
                    return { success: true, message: 'El Restaurante ha sido agregado nuevamente a tus favoritos' }
                } else {
                    return { success: false, message: 'El Restaurante ha sido eliminado de tus favoritos' }
                }
            } else {
                await FavoritesModel.create({ fState: 1, id: deCode(context.User.id), idStore: deCode(idStore) })
                return { success: true, message: 'El Restaurante ha sido agregado a tus favoritos' }
            }
        }
    } catch (e) {
        console.log(e)
        return e
    }
}

export const getAllMatchesStore = async (root, args, context, info) => {
    try {
        const { search, min, max, pId } = args
        let whereSearch = {}
        if (search) {
            whereSearch = {
                [Op.or]: [
                    { storeName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                    { emailStore: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                    { Viaprincipal: { [Op.substring]: search.replace(/\s+/g, ' ') } }
                ]
            }
        }
        const attributes = getAttributes(Store, info)
        const data = await Store.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        // ID Productos
                        // pState: 1
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
export default {
    TYPES: {
        FavoriteStore: {
            getOneStore
        },
        CatStore: {
            getAllStore: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(Store, info)
                    const data = await Store.findAll({
                        attributes,
                        where: { catStore: deCode(parent.catStore), uState: 2 }
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
            getAllRatingStar: async (parent, _args, _context, info) => {
                const data = await ratingStoreStart.findAll({
                    attributes: ['rScore', 'idStore', 'rSId', 'createAt'],
                    where: { idStore: deCode(parent.idStore) }
                })
                return data
            },
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
        getFavorite,
        getAllRatingStar,
        getOneRating,
        getAllMatchesStore,
        getOneFavorite,
        getAllRating,
        // getAllStoreAdmin,
        getAllShoppingCard,
        getAllStoreInStore,
        getOneStore

    },
    MUTATIONS: {
        newRegisterStore,
        setFavorites,
        setRatingStar,
        deleteOneItem,
        setRating,
        registerShoppingCard,
    }
}
