import userResolver from './user'

export default {
    TYPES: {
        ...userResolver.TYPES
    },
    QUERIES: {
        ...userResolver.QUERIES
    },
    MUTATIONS: {
        ...userResolver.MUTATIONS
    }
}
