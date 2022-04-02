import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject, REFRESH_TOKEN_COOKIE_OPTIONS } from '../../../../../utils'
import StatusPedidosModel from '../../models/Store/statusPedidoFinal'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'

const { Op } = require('sequelize')
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
                        idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
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
                        idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['pSState', 'ASC']]
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
                        idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
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
                        pCodeRef: pCodeRef && pCodeRef,
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
        getOneSalesStore,

    },
    MUTATIONS: {
    }
}
