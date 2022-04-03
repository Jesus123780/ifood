import { Op } from 'sequelize'
// import { PubSub, withFilter } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions';
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

const pushNotificationOrder = async (_root, { pCodeRef, idStore }, _context, info) => {
    const attributes = getAttributes(StatusPedidosModel, info)
    console.log(pCodeRef, idStore)
    const data = await StatusPedidosModel.findOne({
        attributes,
        where: {
            pCodeRef: pCodeRef,
            idStore: deCode(idStore)
        }
    })
    pubsub.publish('NEW_NOTIFICATION_ORDER', { newStoreOrder: data })
    return data
}
const NotificationMutation = {
    Mutation: {
        createOneNotification: async (parent, { message }, ctx) => {
            console.log(ctx)
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
            subscribe: () => pubsub.asyncIterator(['NEW_NOTIFICATION_ORDER']),
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
