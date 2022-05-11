import { ApolloError } from 'apollo-server-micro'
import { filterKeyObject, REFRESH_TOKEN_COOKIE_OPTIONS } from '../../../../../utils'
import banners from '../../models/banners/banners'
import Store from '../../models/Store/Store'
import Users from '../../models/Users'
import Userprofile from '../../models/users/UserProfileModel'
import { LoginEmail } from '../../templates/LoginEmail'
import { generateCode, generateToken, sendEmail } from '../../utils'
import { deCode, enCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'

export const getAllMasterBanners = async (_, { min, max, search }, ctx, info) => {
    const attributes = getAttributes(banners, info)
    const data = await banners.findAll({
        attributes,
        where: {
            [Op.or]: [
                {
                    BannersState: { [Op.gt]: 0 }
                }
            ]
        }, limit: [min || 0, max || 100], order: [['BannersState', 'ASC']]
    })
    return data
}
export const setBanners = async (_, { input }, ctx) => {
    const { path, description, BannersState } = input
    console.log(input)
    const data = await banners.create({
        ...input,
    })
    // return data
    return input


}
export default {
    TYPES: {
    },
    QUERIES: {
        getAllMasterBanners,
    },
    MUTATIONS: {
        setBanners,
    }
}
