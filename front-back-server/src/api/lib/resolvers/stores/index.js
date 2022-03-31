import storeResolver from './store'
import productResolver from './products'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...productResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...productResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...productResolver.MUTATIONS,
    },
}
