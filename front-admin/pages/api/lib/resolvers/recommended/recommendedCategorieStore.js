import { Op, fn } from "sequelize"
import productModelFood from "../../models/product/productFood"
import Store from "../../models/Store/Store"
import { deCode, getAttributes } from "../../utils/util"

export const getAllMatchesStoreRecommended = async (root, args, context, info) => {
    try {
        const { min, max, catStore } = args
        console.log(min, max, catStore)
        let whereSearch = {}
        const attributes = getAttributes(Store, info)
        // console.log(attributes)
        const data = await Store.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        ...((catStore) ? { catStore: deCode(catStore) } : {}),
                    }
                ]
            }, limit: [min || 0, max || 5], order: fn('RAND')
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno en mach store')
        return error
    }
}

export const productFoodsAllRecommended = async (root, args, context, info) => {
    try {
        const { search, min, max, pId, gender, desc, categories } = args
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
        const attributes = getAttributes(productModelFood, info)
        const data = await productModelFood.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        ...whereSearch,
                        // get restaurant
                        pState: { [Op.gt]: 0 },
                    }
                ]
            }, limit: [min || 0, max || 100],  order: fn('RAND')
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno en product recomendante')
        return error
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getAllMatchesStoreRecommended,
        productFoodsAllRecommended,
    },
    MUTATIONS: {
    }
}
