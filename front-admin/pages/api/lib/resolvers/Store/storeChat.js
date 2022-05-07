import promosStoreAdmin from '../../models/Store/promosStoreAdmin'
import StatusPedidosModel from '../../models/Store/statusPedidoFinal'
import { deCode } from '../../utils'
import { getAttributes } from '../../utils/util'
import { getOneStore } from './store'
const { Op } = require('sequelize')

export const getAllStoreActiveChat = async (_, { min, max, search, id }, ctx, info) => {
  try {
    const attributes = getAttributes(StatusPedidosModel, info)
    const data = await StatusPedidosModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            // ID STORE
            pSState: { [Op.between]: [0, `${4}`] },
            ...((ctx.User || id) ? { id: id ? deCode(id) : deCode(ctx.User.id) } : {})
          }
        ]
      }, order: [['pDatCre', 'DESC']]
    })
    return data
  } catch (error) {
    return new Error('No es posible traer a los chats', 400)
  }
}

export default {
  TYPES: {
    StoreActiveChat: {
      getOneStore
    }
  },
  QUERIES: {
    getAllStoreActiveChat
  },
  MUTATIONS: {
  }
}
