import { ApolloError } from 'apollo-server-micro'
import productModelFood from '../../models/product/productFood'
import catProducts from '../../models/Store/cat'
import shopping from '../../models/Store/shopping'
import Walletdebt from '../../models/Store/walletdebt'
import walletdebtproducts from '../../models/Store/walletdebtproducts'
import { deCode, filterKeyObject, getAttributes, linkBelongsTo } from '../../utils/util'
const { Op } = require('sequelize')

export const createwalletdebtproducts = async (_, { input }, context) => {
    console.log(input, 'habla')
    const { RefDebtCode, UserDebtId, pId, ctx, debtAmountProduct } = input || {}
    await walletdebtproducts.create({
        RefDebtCode,
        debtAmountProduct,
        debtProductState: 1,
        idStore: deCode(ctx.restaurant),
        pId: deCode(pId),
        id: deCode(ctx.User.id),
        UserDebtId: deCode(UserDebtId)
    })
    return {
        success: true,
        message: 'creada products wallet',
    }
}
export const createWalletDebt = async (_, { input, inputLineItems }, ctx) => {
    try {
        const { UserDebtId, RefDebtCode } = input || {}
        const { setData } = inputLineItems || {}
        await Walletdebt.create({
            ...input,
            debtState: 1,
            id: deCode(ctx.User.id),
            UserDebtId: deCode(UserDebtId),
            idStore: deCode(ctx.restaurant)
        })
        for (let i = 0; i < setData.length; i++) {
            const { pId, debtAmountProduct } = setData[i]
            await createwalletdebtproducts(null, { input: { pId, RefDebtCode, UserDebtId, debtAmountProduct, ctx } })
        }
        return {
            success: true,
            message: 'creada',
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: error }
    }
}
export const WalletDebt = async (_, { idStore }, ctx, info) => {
    try {
        const attributes = getAttributes(Walletdebt, info)
        const data = await Walletdebt.findAll({
            attributes,
            where: {
                idStore: deCode(ctx.restaurant),
                id: deCode(ctx.User.id),
                debtState: { [Op.gt]: 0 }
            }
        })
        return data
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno lol')
        return error
    }
}
export const getAllWalletDebtProduct = async (parent, _args, _context, info) => {
    try {
        const attributes = getAttributes(walletdebtproducts, info)
        const data = await walletdebtproducts.findAll({
            attributes,
            where: { RefDebtCode: (parent.RefDebtCode) }
        })
        return data
    } catch {
        return []
    }
}
export const getOneWalletDebt = async (parent, { debtWalletId }, ctx, info) => {
    try {
        const attributes = getAttributes(Walletdebt, info)
        const data = await Walletdebt.findOne({
            attributes,
            where: {
                debtWalletId: deCode(debtWalletId),
                idStore: deCode(ctx.restaurant),
                debtState: { [Op.gt]: 0 }
            }
        })
        return data
    } catch {
        return []
    }
}
export default {
    TYPES: {
        WalletDebt: {
            getAllWalletDebtProduct
        }
    },
    QUERIES: {
        WalletDebt,
        getOneWalletDebt,
    },
    MUTATIONS: {
        createWalletDebt,
        createwalletdebtproducts,
    }
}
