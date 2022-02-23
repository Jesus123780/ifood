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
export const setStoreSchedule = async (_root, { input }, context, _info) => {
    console.log(input)
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
        const data = await ScheduleStore.findAll({
            attributes: [
                'idStore',
                'schId',
                // 'id',
                'schDay',   
                'schHoSta',
                'schHoEnd',
                'schState',
                // 'store'
            ],
            where: {
                [Op.or]: [
                    {
                        // ID Productos
                        schState: 1,
                        idStore: deCode(context.restaurant)
                        // // ID departamento
                        // dId: dId ? deCode(dId) : { [Op.gt]: 0 },
                        // // ID Cuidad
                        // ctId: ctId ? deCode(ctId) : { [Op.gt]: 0 },
                    }
                ]
            }
        })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
const getOneStoreSchedules = async (root, { schDay }, context, info) => {
    console.log(schDay)
    try {
        const data = await ScheduleStore.findOne({
            attributes: [
                // 'idStore',
                'schId',
                // 'id',
                'schDay',   
                'schHoSta',
                'schHoEnd',
                'schState',
                // 'store'
            ],
            where: {
                [Op.or]: [
                    {
                        // schState: 1,
                        schDay: schDay,
                        // ID Store
                        idStore: deCode(context.restaurant)
                    }
                ]
            }
        })
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
        getStoreSchedules,
        getOneStoreSchedules,
    },
    MUTATIONS: {
        setStoreSchedule,
    }
}
