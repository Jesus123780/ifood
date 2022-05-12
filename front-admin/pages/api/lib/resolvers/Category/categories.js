/* eslint-disable consistent-return */
import { ApolloError } from 'apollo-server-micro'
import CategoryProductsModel from '../../models/Categories/CategoryProducts'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

// cities
export const updateCategoryProducts = async (_root, { input }) => {
  const { caId, cpState } = input
  try {
    if (!caId) {
      const data = await CategoryProductsModel.create({
        ...input,
        cpState: 1
      })
      return data
    }
        
    const isExist = await CategoryProductsModel.findOne({ attributes: ['caId', 'cpName', 'cpState'], where: { caId: deCode(caId) } })
    if (isExist) {
      await CategoryProductsModel.update({ cpState: cpState === 1 ? 0 : 1 }, { where: { caId: deCode(caId) } })
    }
    else {
      throw new ApolloError('No se pudo eliminar el producto debido a un error interno.')
    }
        
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export const CategoryProductsOne = async (root, { caId }, context, info) => {
  try {
    const attributes = getAttributes(CategoryProductsModel, info)
    const data = await CategoryProductsModel.findOne({
      attributes,
      where: {
        [Op.or]: [
          {
            // ID Categories
            caId: caId ? deCode(caId) : { [Op.gt]: 0 }
          }
        ]
      }
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno o No hay ningún producto registrado, Vuelve a intentarlo mas tarde ')
    return error
  }
}
export const CategoryProductsAll = async (root, args, context, info) => {
  try {
    const { search, min, max, caId } = args
    let whereSearch = {}
    if (search) {
      whereSearch = {
        [Op.or]: [
          { cpName: { [Op.substring]: search.replace(/\s+/g, ' ') } }
        ]
      }
    }
    const attributes = getAttributes(CategoryProductsModel, info)
    const data = await CategoryProductsModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...whereSearch,
            // ID Productos
            caId: caId ? deCode(caId) : { [Op.gt]: 0 },
            cpState: { [Op.gt]: 0 }
            // // ID departamento
            // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
            // // ID Cuidad
            // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
          }
        ]
      }, limit: [min || 0, max || 100], order: [['cpName', 'ASC']]
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
    CategoryProductsOne,
    CategoryProductsAll
  },
  MUTATIONS: {
    updateCategoryProducts
  }
}
