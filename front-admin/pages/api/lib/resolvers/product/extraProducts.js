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
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes, linkBelongsTo } from '../../utils/util'
const { Op } = require('sequelize')

export const updateExtProductFoods = async (_root, { input }, context) => {
    const { exPid, pId, exState, extraName, extraPrice } = input
    try {
        if (!exPid) {
            const data = await ExtraProductModel.create({
                state: 1,
                extraPrice,
                pId: deCode(pId),
                extraName,
                exState,
                idStore: 1,
                // idStore:  deCode(context.restaurant),

            })
            return data
        }
        else {
            await ExtraProductModel.update({ state: state === 1 ? 0 : 1 }, { where: { exPid: deCode(exPid) } })
            if (isExist) {
            }
            else {
                throw new ApolloError('No se pudo eliminar el producto debido a un error interno.')
            }
        }
    } catch (e) {
        throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
    }
}
export const updateExtraInProduct = async (_root, { input }) => {
    const { pId } = input || {}
    try {
        await ExtraProductModel.create({
            ...input,
            pId: deCode(pId)
        })
        return input
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno2')
        return error
    }
}

export const ExtProductFoodsAll = async (root, args, context, info) => {
    try {
        const { search, min, max, pId } = args
        let whereSearch = {}
        if (search) {
            whereSearch = {
                [Op.or]: [
                    { extraName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
                ]
            }
        }
        const attributes = getAttributes(productModelFood, info)
        const data = await ExtraProductModel.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        // ...whereSearch,
                        // // get restaurant
                        // idStore: deCode(context.restaurant),
                        // // get user
                        // id: deCode(context.User.id),
                        // // ID Productos
                        // pId: pId ? deCode(pId) : { [Op.gt]: 0 },
                        pId:  deCode('MTA4ODM1NTI1OTQwNjA2NTgwMA=='),
                        // // Productos state
                        // pState: { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['extraName', 'DESC']]
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno')
        return error
    }
}

export const updateMultipleExtProductFoods = async (_root, args, context) => {

    const { inputLineItems, inputLineItems: { setData } } = args
    try {
        for (let i = 0; i < setData.length; i++) {
            const { pId, exState, extraName, extraPrice } = setData[i]
            await updateExtraInProduct(null, { input: { pId, exState, extraName, extraPrice } })
        }

    } catch (e) {
        throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
    }

}
export default {
    TYPES: {
    },
    QUERIES: {
        ExtProductFoodsAll,
    },
    MUTATIONS: {
        updateExtProductFoods,
        updateMultipleExtProductFoods,
    }
}
