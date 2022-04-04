import { Op } from 'sequelize'
// import { PubSub, withFilter } from 'apollo-server'
import { PubSub, withFilter } from 'graphql-subscriptions';
import StatusPedidosModel from '../../models/Store/statusPedidoFinal';
import { deCode, getAttributes } from '../../utils/util';
const pubsub = new PubSub(); //create a PubSub instance
/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
let currentNumber = 0;
function incrementNumber() {
    //  currentNumber++;
    const currentNumber = { success: true, message: 'lol' }
    pubsub.publish('NEW_ORDER_STORE', { newStorePedidosNum: currentNumber });
    setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();

const Query = {
    Query: {
        getOneSalesStoreS: async (parent, { to, content }, ctx) => {
            setTimeout(incrementNumber, 1000);
            pubsub.publish('NEW_ORDER_STORE', { newStorePedidosNum: currentNumber });
            return 1
        },
    }
}

const SubscriptionSubscription = {
    Subscription: {
        newStorePedidosNum: {
            subscribe: () => pubsub.asyncIterator(['NEW_ORDER_STORE']),
        },
    },
}

const pushNotificationOrder = async (_root, { pCodeRef, idStore }, context, info) => {
    const attributes = getAttributes(StatusPedidosModel, info)
    // console.log(context, 11)
    const data = await StatusPedidosModel.findOne({
        attributes,
        where: {
            pCodeRef: pCodeRef,
            idStore: deCode(idStore)
        }
    })
    pubsub.publish('NEW_NOTIFICATION_ORDER', { newStoreOrder: data, context: context })
    return data
}
const NotificationMutation = {
    Mutation: {
        createOneNotification: async (parent, { message }, ctx) => {
            try {
                pubsub.publish('NEW_NOTIFICATION', { newNotification: message })
                return message
            } catch (err) {
                console.log(err)
            }
        }
    }
}
const SubscriptionSubscriptionNotification = {
    Subscription: {
        newNotification: {
            subscribe: () => pubsub.asyncIterator(['NEW_NOTIFICATION']),
        },
    },
}
const SubscriptionNotificationOrder = {
    Subscription: {
        newStoreOrder: {
            subscribe: withFilter((_, __, ctx) => {
                // if (!ctx) throw new AuthenticationError('Unauthenticated')
                return pubsub.asyncIterator(['NEW_NOTIFICATION_ORDER'])
            }, ({ newStoreOrder, context }, args, ctx) => {
                console.log(context.restaurant, 9)
                if (context.restaurant === newStoreOrder.idStore) {
                    // console.log(context.restaurant === newStoreOrder.idStore)
                    return true
                } else return false
                // console.log(newStoreOrder.idStore, 9)
                // deCode(ctx.restaurant)
                // if (newMessage.from === ctx.User.uUsername || newMessage.to === ctx.User.uUsername) {
                // }
                // return false
            }),
        },
    },
}

export default {
    TYPES: {
    },
    QUERIES: {
        pushNotificationOrder,
        ...Query.Query
    },
    MUTATIONS: {
        ...NotificationMutation.Mutation,
    },
    SUBSCRIPTIONS: {
        ...SubscriptionSubscription.Subscription,
        ...SubscriptionSubscriptionNotification.Subscription,
        ...SubscriptionNotificationOrder.Subscription,
    }
}
