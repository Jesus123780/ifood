// import { PubSub, withFilter } from 'apollo-server'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { Op } from 'sequelize'
import MessagesModel from '../../models/Messages/messages'
import Store from '../../models/Store/Store'
import { deCode } from '../../utils/util'
const pubsub = new PubSub() //create a PubSub instance

/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
export const getMessages = async (parent, { from }, ctx) => {
    try {
        try {
            if (!ctx.User || !from) throw new Error('Debes iniciar sesión primero')
            const otherUser = await Store.findOne({ attributes: ['id', 'idStore'], where: { idStore: !!from && deCode(from) } })
            if (!otherUser) throw new Error('Usuario no existe')
            const ID = [ctx.User.id, otherUser.idStore]
            const messages = await MessagesModel.findAll({
                where: {
                    from: { [Op.in]: ID },
                    to: { [Op.in]: ID }
                },
                order: [['aDatCre', 'ASC']]
            })
            return messages
        } catch (e) {
            return e
        }

    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
        return error
    }

}
export const sendMessage = async (parent, { to, content }, ctx) => {
    try {
        try {
            const message = await MessagesModel.create({ from: ctx.User.id, to, content })
            pubsub.publish('NEW_MESSAGE', { newMessage: message, ctx })
            return message
        } catch (err) {
            throw new ApolloError('Lo sentimos, ha ocurrido un error interno')
        }
    } catch (e) {
        const error = new Error('Lo sentimos, ha ocurrido un error interno', e, 400)
        return error
    }

}

// Suscripción para enviar mensajes
const SubscriptionSubscription = {
    Subscription: {
        newMessage: {
            subscribe: withFilter((_, __, ctx) => {
                if (!ctx) throw new AuthenticationError('Unauthenticated')
                return pubsub.asyncIterator(['NEW_MESSAGE'])
            // eslint-disable-next-line no-unused-vars
            }, ({ newMessage, ctx }, _, __) => {
                if (newMessage.from === ctx.User.id || newMessage.from === ctx.User.id) {
                    return true
                } else {
                    return false
                }
            })
        }
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getMessages
    },
    MUTATIONS: {
        sendMessage
    },
    SUBSCRIPTIONS: {
        ...SubscriptionSubscription.Subscription
    }
}
