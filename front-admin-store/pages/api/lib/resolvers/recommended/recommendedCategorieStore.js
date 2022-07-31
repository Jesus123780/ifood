import { Op, fn } from 'sequelize'
import productModelFood from '../../models/product/productFood'
import Store from '../../models/Store/Store'
import { linkBelongsTo } from '../../utils'
import { deCode, getAttributes } from '../../utils/util'

// eslint-disable-next-line
export const getAllMatchesStoreRecommended = async (_root, args, _context, info) => {
  try {
    const { min, max, catStore } = args
    let whereSearch = {}
    const attributes = getAttributes(Store, info)
    // console.log(attributes)
    return await Store.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...whereSearch,
            uState: 2,
            ...((catStore) ? { catStore: deCode(catStore) } : {})
          }
        ]
      }, limit: [min || 0, max || 5], order: fn('RAND')
    })
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno en mach store')
    return error
  }
}

export const productFoodsAllRecommended = async (_root, args, _context, info) => {
  try {
    const { min, max } = args
    linkBelongsTo(productModelFood, Store, 'idStore', 'idStore')
    const attributes = getAttributes(productModelFood, info)
    return await productModelFood.findAll({
      attributes: attributes,
      include: [
        {
          attributes: ['ctId'],
          model: Store,
          required: true,
          where: { uState: '2' }
        }
      ],
      where: {
        [Op.or]: [
          {
            // ...whereSearch,
            // get restaurant
            pState: { [Op.gt]: 0 }
          }
        ]
      }, limit: [min || 0, max || 100], order: fn('RAND')
    })
  } catch (e) {
    return new Error('Lo sentimos, ha ocurrido un error interno en product recomendante')
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllMatchesStoreRecommended,
    productFoodsAllRecommended
  },
  MUTATIONS: {
  }
}
