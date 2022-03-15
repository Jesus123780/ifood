import { ApolloError } from 'apollo-server-micro'
import { COOKIE_OPTIONS } from 'utils'
const { Op } = require('sequelize')

const pushOneRecommendation = async (_parent, { input }, { setCookies }) => {
    try {
        const { carProId, id } = input || {}
        const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
        setCookies.push({
            name: process.env.RECOMMENDATION_COOKIE,
            value: carProId,
            options: {
                ...COOKIE_OPTIONS,
                expires: refreshTokenExpiry
            }
        })
    } catch (error) {

    }
}
const pushOneRecommendationProduct = async (_parent, { input }, { setCookies }) => {
    try {
        const { productName } = input || {}
        const refreshTokenExpiry = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000)
        setCookies.push({
            name: process.env.PRODUCT_NAME_COOKIE,
            value: productName,
            options: {
                ...COOKIE_OPTIONS,
                expires: refreshTokenExpiry
            }
        })
    } catch (error) {

    }
}

export default {
    TYPES: {
    },
    QUERIES: {
    },
    MUTATIONS: {
        pushOneRecommendation,
        pushOneRecommendationProduct,
    }
}
