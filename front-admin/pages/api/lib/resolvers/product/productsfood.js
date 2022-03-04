import { ApolloError } from 'apollo-server-micro'
import AreasModel from '../../models/areas/AreasModel'
import Feature from '../../models/feature/feature'
import CatStore from '../../models/information/CategorieStore'
import CitiesModel from '../../models/information/CitiesModel'
import colorModel from '../../models/information/color'
import CountriesModel from '../../models/information/CountriesModel'
import DepartmentsModel from '../../models/information/DepartmentsModel'
import ExtraProductModel from '../../models/product/productExtras'
import productModelFood from '../../models/product/productFood'
import trademarkModel from '../../models/product/trademark'
import Store from '../../models/Store/Store'
import ThirdPartiesModel from '../../models/thirdParties/ThirdPartiesModel'
import { deCode, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const productsOne = async (root, { pId }, context, info) => {
    try {
        const attributes = getAttributes(productModelFood, info)
        const data = await productModelFood.findOne({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ID Productos
                        pId: pId ? deCode(pId) : { [Op.gt]: 0 },
                    }
                ]
            }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno o el producto no esta  registrado, Vuelve a intentarlo mas tarde.')
        return error
    }
}
// GET ONE PRODUCTS FOOD
export const productFoodsOne = async (root, { pId }, context, info) => {
    try {
        const attributes = getAttributes(productModelFood, info)
        const data = await productModelFood.findOne({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ID Productos
                        pId: pId ? deCode(pId) : { [Op.gt]: 0 },
                        // ID STORE
                        // idStore: deCode(context.restaurant),
                    }
                ]
            }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno o el producto no esta  registrado, Vuelve a intentarlo mas tarde.')
        return error
    }
}
export const getMinPrice = async (root, { idStore }, context, info) => {
    const data = await productModelFood.findAll({
        attributes: ['ProPrice'],
        where: {
            [Op.or]: [
                {
                    idStore: idStore ? deCode(idStore) : deCode(context.restaurant)
                }
            ]
        }, order: [['ProPrice', 'DESC']]
    })
    let myArray = []
    var N = 0
    if (data?.length > 0) {
        myArray =  data.map(x => { return x.ProPrice })
        N = Math.min.apply(null, myArray);
        return N
    }
}
export const productFoodsAll = async (root, args, context, info) => {
    try {
        const { search, min, max, pId, gender, desc, categories } = args
        let whereSearch = {}
        console.log(args, 'hola')
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
        const attributes = getAttributes(productModelFood, info)
        const data = await productModelFood.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        // get restaurant
                        idStore: deCode(context.restaurant),
                        // get user
                        id: deCode(context.User.id),
                        // ID Productos
                        pId: pId ? deCode(pId) : { [Op.gt]: 0 },
                        // Productos state
                        pState: { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['pName', 'DESC']]
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}

export const updateProductFoods = async (_root, { input }, context) => {
    const { sizeId, colorId, cId, dId, ctId, pId, pState } = input
    try {
        if (!pId) {
            const data = await productModelFood.create({
                ...input,
                pState: 1,
                idStore: deCode(context.restaurant),
                id: deCode(context.User.id),
                sTateLogistic: 1,
                sizeId: sizeId ? deCode(sizeId) : null,
                colorId: colorId ? deCode(colorId) : null,
                cId: cId ? deCode(cId) : null,
                dId: dId ? deCode(dId) : null,
                ctId: ctId ? deCode(ctId) : null,
            })
            return data
        }
        else {
            await productModelFood.update({ pState: pState === 1 ? 0 : 1 }, { where: { pId: deCode(pId) } })
        }
    } catch (e) {
        throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
    }
}
export const productsLogis = async (root, args, context, info) => {
    try {
        const { search, min, max, pId } = args
        let whereSearch = {}
        if (search) {
            whereSearch = {
                [Op.or]: [
                    { pName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                    { ProPrice: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                    { ProDescuento: { [Op.substring]: search.replace(/\s+/g, ' ') } }
                ]
            }
        }
        const attributes = getAttributes(productModelFood, info)
        const data = await productModelFood.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        // ID Productos
                        pId: pId ? deCode(pId) : { [Op.gt]: 0 },
                        pState: 0
                        // // ID departamento
                        // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                        // // ID Cuidad
                        // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['pName', 'ASC']]
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export default {
    TYPES: {
        ProductFood: {
            ExtProductFoodsAll: async (parent, _args, _context, info) => {
                // linkBelongsTo(ExtraProductModel, productModelFood, 'exPid', 'pId')
                console.log(1);
                try {
                    const attributes = getAttributes(ExtraProductModel, info)
                    const data = await ExtraProductModel.findAll({
                        attributes,
                        where: { pId: deCode(parent.pId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
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
        },
        Product: {
            thirdParties: async parent => {
                try {
                    const res = await ThirdPartiesModel.findOne({
                        attributes: [
                            'tcId',
                            'umId',
                            'tpNumDoc',
                            'tpName',
                            'tpLasNam',
                            'tpPhone',
                            'tpEmail',
                            'tpState'
                        ],
                        where: { tcId: deCode(parent.tcId) }
                    })
                    return res
                } catch (error) {
                    return null
                }
            },
            area: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(AreasModel, info)
                    const data = await AreasModel.findAll({
                        attributes,
                        where: { caId: deCode(parent.caId) }
                    })
                    return data
                } catch {
                    return null
                }
            },

            feat: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(Feature, info)
                    const data = await Feature.findAll({
                        attributes,
                        where: { fId: deCode(parent.fId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            pais: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(CountriesModel, info)
                    const data = await CountriesModel.findOne({
                        attributes,
                        where: { caId: deCode(parent.caId) }
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
            mark: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(trademarkModel, info)
                    const data = await trademarkModel.findOne({
                        attributes,
                        where: { tId: deCode(parent.tId) }
                    })
                    return data
                } catch {
                    return null
                }
            },
            color: async (parent, _args, _context, info) => {
                try {
                    const attributes = getAttributes(colorModel, info)
                    const data = await colorModel.findOne({
                        attributes,
                        where: { colorId: deCode(parent.colorId) }
                    })
                    return data
                } catch {
                    return null
                }
            }
        }
    },
    QUERIES: {
        productFoodsAll,
        getMinPrice,
        productFoodsOne,
        productsOne
    },
    MUTATIONS: {
        updateProductFoods
    }
}
