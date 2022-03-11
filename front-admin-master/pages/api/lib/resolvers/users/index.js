import userResolver from './user'
import locationResolver from './location'

export default {
    TYPES: {
        ...userResolver.TYPES,
        ...locationResolver.TYPES
    },
    QUERIES: {
        ...userResolver.QUERIES,
        ...locationResolver.QUERIES,
    },
    MUTATIONS: {
        ...userResolver.MUTATIONS,
        ...locationResolver.MUTATIONS
    }
}
