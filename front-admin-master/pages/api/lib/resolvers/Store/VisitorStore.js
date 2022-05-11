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
                idStore: deCode(idStore),
            }
        })
        return { success: true, message: '' }
    } catch (e) {
        console.log(e)
        const error = new Error('Lo sentimos, ha ocurrido un error interno2')
        return error
    }
}
export const getAllVisitorStore = async (_root, { idStore }, ctx, info) => {
    try {
        const attributes = getAttributes(visitUserStore, info)
        const data = await visitUserStore.findAll({ attributes, where: { idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant) } })
        return data
    } catch (e) {
        throw ApolloError('Lo sentimos, ha ocurrido un error interno')
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
