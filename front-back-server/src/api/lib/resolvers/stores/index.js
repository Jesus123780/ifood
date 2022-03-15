import storeResolver from './store'

export default {
    TYPES: {
        ...storeResolver.TYPES
    },
    QUERIES: {
        ...storeResolver.QUERIES
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS
    },
}
