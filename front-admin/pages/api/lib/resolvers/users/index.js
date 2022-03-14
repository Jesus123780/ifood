import userResolver from './user'
import locationResolver from './location'
import salesResolver from './foodorder'

export default {
    TYPES: {
        ...userResolver.TYPES,
        ...locationResolver.TYPES,
        ...salesResolver.TYPES,
    },
    QUERIES: {
        ...userResolver.QUERIES,
        ...locationResolver.QUERIES,
        ...salesResolver.QUERIES,
    },
    MUTATIONS: {
        ...userResolver.MUTATIONS,
        ...locationResolver.MUTATIONS,
        ...salesResolver.MUTATIONS
    }
}
