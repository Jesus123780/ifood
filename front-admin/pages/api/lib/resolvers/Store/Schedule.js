import { ApolloError } from 'apollo-server-micro'
import CatStore from '../../models/information/CategorieStore'
import ScheduleStore from '../../models/Store/ScheduleStore'
import Store from '../../models/Store/Store'
import { LoginEmail } from '../../templates/LoginEmail'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const updateStoreSchedule = async (_root, { input }) => {
    try {
        const { schId, ...restArgs } = input || {}
        const data = await ScheduleStore.update(restArgs, { where: { schId: deCode(schId) } })
        return input
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno2')
        return error
    }
}

export const setStoreScheduleReserve = async (_root, { input }) => {
    try {
        const { schData } = input || {}
        let response = []

        for (let i = 0; i < schData.length; i++) {
            const data = schData[i]
            if (data.schId) {
                await updateStoreSchedule(null, { input: data })
                response = [...response, data]
            }
            else {
                const dataNew = await ScheduleStore.create({ schState: 1, idStore: data.idStore, ...data })
                response = [...response, dataNew]
            }
        }
        return response
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno1')
        return error
    }
}
export const setStoreSchedule = async(_root, { input }, context, _info) => {
    try {
        await ScheduleStore.create({ ...input, idStore: deCode(context.restaurant), id: deCode(context.User.id) })
        return true
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno1')
        return error
    }
}

const getStoreSchedules = async (root, { schDay }, context, info) => {
    try {
        const attributes = getAttributes(ScheduleStore, info)
        const data = await ScheduleStore.findAll({  attributes, where: { idStore: context.restaurant ? deCode(context.restaurant) : { [Op.gt]: 0 } } })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export default {
    TYPES: {
    },
    QUERIES: {
        getStoreSchedules
    },
    MUTATIONS: {
        setStoreSchedule,
    }
}
