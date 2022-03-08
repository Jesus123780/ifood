import { ApolloError } from 'apollo-server-micro'
import ItemStory from '../../models/Store/ItemStory'
import messageStory from '../../models/Store/messageStory'
import storyStore from '../../models/Store/StoryModel'
import { deCode, filterKeyObject, getAttributes } from '../../utils/util'
const { Op } = require('sequelize')

export const registerStoryItemPhotoStore = async (_root, { input }, context) => {
    try {
        const { stoId, itemImage } = input || {}
        const data = await ItemStory.create({ isState: 1, stoId: deCode(stoId), itemImage, idStore: deCode('MjcyMDg4ODE0ODUxNTE2NDUw') /* deCode(context.restaurant) */ })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const registerStoryStore = async (_root, { input }, context) => {
    try {
        const data = await storyStore.create({ ...input, sState: 1, idStore: deCode(input.idStore || context.restaurant), id: deCode('MjcyMDg4ODE0ODUxNTE2NDUw') })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getAllStoryStore = async (_root, { idStore }, ctx, info) => {
    try {
        const attributes = getAttributes(storyStore, info)
        const data = await storyStore.findAll({ attributes, where: { idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant) } })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getAllStoryItemPhotoStore = async (_root, { stoId }, ctx, info) => {
    try {
        const attributes = getAttributes(ItemStory, info)
        const data = await ItemStory.findAll({ attributes, where: { stoId: deCode(stoId) } })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
// export const registerStoryComment = async (_root, { stoId }, ctx, info) => {
//     try {
//         const attributes = getAttributes(messageStory, info)
//         const data = await messageStory.findAll({ attributes, where: { stoId: deCode(stoId) } })
//         return data
//     } catch (e) {
//         const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
//         return error
//     }
// }
export const registerStoryComment = async (_root, { input }, context) => {
    try {
        const { stoId, from, comments, username } = input || {}
        const data = await messageStory.create({ username, comments, from: from, messageState: 1, stoId: deCode(stoId) })
        return data
    } catch (e) {
        const error = new ApolloError(e || 'Lo sentimos, ha ocurrido un error interno')
        return error
    }
}
export const getAllStoryComment = async (parent, { stoId, min, max }, _context, info) => {
    try {
        const attributes = getAttributes(messageStory, info)
        const data = await messageStory.findAll({
            attributes,
            where: {
                [Op.or]: [
                    {
                        messageState: { [Op.gt]: 0 },
                        stoId: stoId ? deCode(stoId) : deCode(parent.stoId)
                    }
                ]
            }, limit: [min || 0, max || 100], order: [['comments', 'DESC']]
        })
        return data
    } catch {
        return []
    }
}

export default {
    TYPES: {
        StoryStore: {
            getAllStoryComment
        }
    },
    QUERIES: {
        getAllStoryStore,
        getAllStoryComment,
        getAllStoryItemPhotoStore
    },
    MUTATIONS: {
        registerStoryStore,
        registerStoryComment,
        registerStoryItemPhotoStore
    }
}
