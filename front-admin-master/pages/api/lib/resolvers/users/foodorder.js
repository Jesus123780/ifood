import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject, REFRESH_TOKEN_COOKIE_OPTIONS } from '../../../../../utils'
import StatusPedidosModel from '../../models/Store/statusPedidoFinal'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'

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


export default {
    TYPES: {
    },
    QUERIES: {
       
    },
    MUTATIONS: {
    }
}
