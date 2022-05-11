/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from 'apollo-server-micro'
import visitUserStore from '../../models/Store/visitUserStore'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

export const setVisitorStore = async (_root, { input }) => {
  try {
    const { id, idStore } = input || {}
    const [rating, _created] = await visitUserStore.findOrCreate({
      where: { id: deCode(id) },
      defaults: {
        id: deCode(id),
        idStore: deCode(idStore)
      }
    })
    return { success: true, message: '' }
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno2')
    return error
  }
}
export const getAllVisitorStore = async (_root, { idStore, fromDate, toDate, max, min }, ctx, info) => {
  try {
    const attributes = getAttributes(visitUserStore, info)
    const data = await visitUserStore.findAll({
      attributes, where:
            {
              [Op.or]: [
                {
                  ...((fromDate && toDate) ? { createAt: { [Op.between]: [fromDate, `${toDate} 23:59:59`] } } : {}),
                  idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant)
                }
              ]
            }
    })
    return data
  } catch (e) {
    throw new ApolloError('No ha sido posible procesar su solicitud.', 500, e)
  }
}
export default {
  TYPES: {
  },
  QUERIES: {
    getAllVisitorStore
  },
  MUTATIONS: {
    setVisitorStore
  }
}
