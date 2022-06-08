import StatusPedidosModel from '../../models/Store/statusPedidoFinal'
import { deCode, getAttributes } from '../../utils/util'

import { Op } from 'sequelize'
// store
export const getAllPedidoStoreFinal = async (_, args, ctx, info) => {
  const { idStore } = args || {}
  try {
    const attributes = getAttributes(StatusPedidosModel, info)
    const data = await StatusPedidosModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            // ID STORE
            pSState: { [Op.between]: [0, `${4}`] },
            idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant)
          }
        ]
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export const getAllSalesStore = async (_, args, ctx, info) => {
  const { idStore, min, max, fromDate, toDate } = args || {}
  try {
    const attributes = getAttributes(StatusPedidosModel, info)
    const data = await StatusPedidosModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            pSState: 4,
            ...((fromDate && toDate) ? { pDatCre: { [Op.between]: [fromDate, `${toDate} 23:59:59`] } } : {}),
            // ID STORE
            idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant)
          }
        ]
      }, limit: [min || 0, max || 100], order: [['pDatCre', 'ASC']]
    })
    return data
  } catch (error) {
    return error
  }
}
export const getAllSalesStoreStatistic = async (_, args, ctx, info) => {
  const { idStore, min, max, fromDate, toDate } = args || {}
  try {
    const attributes = getAttributes(StatusPedidosModel, info)
    const data = await StatusPedidosModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...((fromDate && toDate) ? { pDatCre: { [Op.between]: [fromDate, `${toDate} 23:59:59`] } } : {}),
            // ID STORE
            idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant)
          }
        ]
      }, limit: [min || 0, max || 100], order: [['pDatCre', 'DESC']]
    })
    return data
  } catch (error) {
    return error
  }
}
export const getOneSalesStore = async (_, args, ctx, info) => {
  const { pCodeRef } = args || {}
  try {
    const attributes = getAttributes(StatusPedidosModel, info)
    const data = await StatusPedidosModel.findOne({
      attributes,
      where: {
        [Op.or]: [
          {
            pSState: 4,
            // ID STORE
            pCodeRef: pCodeRef && pCodeRef
          }
        ]
      }
    })
    return data
  } catch (error) {
    return error
  }
}

export default {
  TYPES: {
  },
  QUERIES: {
    getAllSalesStore,
    getAllSalesStoreStatistic,
    getOneSalesStore

  },
  MUTATIONS: {
  }
}
