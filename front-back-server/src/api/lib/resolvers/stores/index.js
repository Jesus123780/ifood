import storeResolver from './store'
import productResolver from './products'
import ordersResolver from './orders'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...ordersResolver.TYPES,
        ...productResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...productResolver.QUERIES,
        ...ordersResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ordersResolver.MUTATIONS,
        ...productResolver.MUTATIONS,
    },
    SUBSCRIPTIONS: {
        ...ordersResolver.SUBSCRIPTIONS
    }
}
