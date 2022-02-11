import deviceResolver from './device'

export default {
    TYPES: {
        ...deviceResolver.TYPES
    },
    QUERIES: {
        ...deviceResolver.QUERIES
    },
    MUTATIONS: {
        ...deviceResolver.MUTATIONS
    }
}
