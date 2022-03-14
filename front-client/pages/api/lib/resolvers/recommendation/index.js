import recommendationResolver from './recommendation'

export default {
    TYPES: {
        ...recommendationResolver.TYPES
    },
    QUERIES: {
        ...recommendationResolver.QUERIES
    },
    MUTATIONS: {
        ...recommendationResolver.MUTATIONS
    }
}
