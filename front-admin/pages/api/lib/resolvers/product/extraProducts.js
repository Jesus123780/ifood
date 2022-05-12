/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-server-micro'
import ExtraProductModel from '../../models/product/productExtras'
import productsOptionalExtra from '../../models/product/productsOptionalExtra'
import productsSubOptionalExtra from '../../models/product/productsSubOptionalExtra'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

export const deleteextraproductfoods = async (_root, { state, id }) => {
  try {
    await ExtraProductModel.update({ state: state === 1 ? 0 : 1 }, { where: { exPid: deCode(id) } })
    return {
      success: true,
      message: 'Eliminado'
    }

  } catch (error) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
  }

}
export const DeleteExtFoodSubsOptional = async (_root, { state, opSubExPid }, _context) => {
  try {
    await productsSubOptionalExtra.update({ state: state === 1 ? 0 : 1 }, { where: { opSubExPid: deCode(opSubExPid) } })
    return {
      success: true,
      message: 'Eliminado'
    }

  } catch (error) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
  }

}
export const updateExtProductFoods = async (_root, { input }) => {
  const { exPid, pId, exState, extraName, extraPrice, code } = input
  let state
  try {
    if (!exPid) {
      const data = await ExtraProductModel.create({
        state: 1,
        extraPrice,
        pId: deCode(pId),
        extraName,
        exState,
        code,
        idStore: 1
      })
      return data
    }
    await ExtraProductModel.update({ state: state === 1 ? 0 : 1 }, { where: { exPid: deCode(exPid) } })
        
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
  }
}
// OPTIONAL PRODUCTS
export const updateExtProductFoodsOptional = async (_root, { input }, context) => {
  const { opExPid, pId, OptionalProName, numbersOptionalOnly, code, required } = input
  try {
    if (!opExPid) {
      const data = await productsOptionalExtra.create({
        state: 1,
        pId: deCode(pId),
        OptionalProName,
        required,
        // idStore: 3,
        code,
        numbersOptionalOnly,
        idStore: deCode(context.restaurant)

      })
      return data
    }
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}

// SUB_OPTIONAL PRODUCTS
export const updateExtProductFoodsSubOptional = async (_root, { input }, context) => {
  const { pId, state, OptionalSubProName, exCode, exCodeOptionExtra } = input
  try {
    const data = await productsSubOptionalExtra.create({
      state,
      pId: deCode(pId),
      OptionalSubProName,
      // opExPid: exCodeOptionExtra, # cuando se reeedite 
      exCodeOptionExtra: exCodeOptionExtra,
      // idStore: 3,
      exCode,
      idStore: deCode(context.restaurant)

    })
    return data

  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}

// NO USADO
export const ExtProductFoodsOptionalOne = async (root, { pId }, context, info) => {
  try {
    const attributes = getAttributes(productsOptionalExtra, info)
    const data = await productsOptionalExtra.findOne({
      attributes,
      where: {
        [Op.or]: [
          {
            // ID Productos
            pId: pId ? deCode(pId) : { [Op.gt]: 0 }
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

export const editExtProductFoods = async (_root, { input }, context) => {
  if (!context.User) return { success: false, message: 'Inicie session' }
  const { state, extraName, extraPrice, exPid } = input || {}
  if (exPid) {
    await ExtraProductModel.update({
      state, extraName, extraPrice
    }, { where: { exPid: deCode(exPid), idStore: deCode(context.restaurant) } })
    return { success: true, message: 'Editado con éxito' }
  } 
  return { success: false, message: 'Ocurrió un error, no pudimos editarlo' }
    
}
export const updateExtraInProduct = async (_root, { input }, _context) => {
  const { pId, idStore } = input || {}
  try {
    await ExtraProductModel.create({
      ...input,
      idStore: deCode(idStore),
      pId: deCode(pId)
    })
    return input
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
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
          { extraName: { [Op.substring]: search.replace(/\s+/g, ' ') } }
        ]
      }
    }
    const attributes = getAttributes(ExtraProductModel, info)
    const data = await ExtraProductModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...whereSearch,
            // // get restaurant
            // idStore: deCode(context.restaurant),
            // // get user
            // id: deCode(context.User.id),
            // // ID Productos
            // pId: deCode(pId),
            // pId: pId ? deCode(pId) : { [Op.gt]: 0 },
            ...((pId) ? { pId: deCode(pId) } : {}),
            idStore: deCode(context.restaurant),
            // // Productos state
            state: { [Op.gt]: 0 }
          }
        ]
      }, limit: [min || 0, max || 100], order: [['pDatCre', 'DESC']]
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
export const ExtProductFoodsOptionalAll = async (root, args, context, info) => {
  try {
    const { search, min, max, pId } = args
    let whereSearch = {}
    if (search) {
      whereSearch = {
        [Op.or]: [
          { extraName: { [Op.substring]: search.replace(/\s+/g, ' ') } }
        ]
      }
    }
    const attributes = getAttributes(productsOptionalExtra, info)
    const data = await productsOptionalExtra.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...((pId) ? { pId: deCode(pId) } : {}),
            state: { [Op.gt]: 0 }
            // ...((context.restaurant) ? { idStore: deCode(context.restauran) } : {}),
          }
        ]
      }, limit: [min || 0, max || 100], order: [['OptionalProName', 'DESC']]
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno', e)
    return error
  }
}
export const DeleteExtProductFoodsOptional = async (root, { state, opExPid }) => {
  try {
    await productsOptionalExtra.update({ state: state === 1 ? 0 : 1 }, { where: { opExPid: deCode(opExPid) } })
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
export const ExtProductFoodsSubOptionalAll = async (root, args, context, info) => {
  try {
    const { search, min, max, pId } = args
    let whereSearch = {}
    if (search) {
      whereSearch = {
        [Op.or]: [
          { extraName: { [Op.substring]: search.replace(/\s+/g, ' ') } }
        ]
      }
    }
    const attributes = getAttributes(productsSubOptionalExtra, info)
    const data = await productsSubOptionalExtra.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            pId: deCode(pId),
            state: { [Op.gt]: 0 }
          }
        ]
      }, limit: [min || 0, max || 100], order: [['OptionalProName', 'DESC']]
    })
    return data
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}

export const updateMultipleExtProductFoods = async (_root, args, context) => {
  // eslint-disable-next-line no-unused-vars
  const { inputLineItems: { setData } } = args
  const { restaurant } = context || {}
  try {
    for (let i = 0; i < setData.length; i++) {
      const { pId, exState, extraName, extraPrice } = setData[i]
      await updateExtraInProduct(null, { input: { pId, exState, extraName, extraPrice, idStore: restaurant } })
        .catch(() => {return new ApolloError('No ha sido posible procesar su solicitud.', 500)})
    }
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500)
  }

}
export default {
  TYPES: {
    ExtProductFoodOptional: {
      ExtProductFoodsSubOptionalAll: async (parent, _args, _context, info) => {
        const attributes = getAttributes(productsSubOptionalExtra, info)
        const data = await productsSubOptionalExtra.findAll({
          attributes,
          where: {
            exCodeOptionExtra: parent.code,
            state: { [Op.gt]: 0 }
          }
        })
        return data
      }
    }
  },
  QUERIES: {
    ExtProductFoodsAll,
    ExtProductFoodsOptionalAll,
    ExtProductFoodsSubOptionalAll
  },
  MUTATIONS: {
    updateExtProductFoods,
    updateMultipleExtProductFoods,
    deleteextraproductfoods,
    // OPTIONAL
    DeleteExtProductFoodsOptional,
    editExtProductFoods,
    updateExtProductFoodsOptional,
    // SUB_OPTIONAL
    updateExtProductFoodsSubOptional,
    DeleteExtFoodSubsOptional
  }
}
