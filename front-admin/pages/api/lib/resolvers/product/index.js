import productsResolver from './products'
import foodResolver from './food'

export default {
    TYPES: {
        ...productsResolver.TYPES,
        ...foodResolver.TYPES,
    },
    QUERIES: {
        ...productsResolver.QUERIES,
        ...foodResolver.QUERIES
    },
    MUTATIONS: {
        ...productsResolver.MUTATIONS,
        ...foodResolver.MUTATIONS
    }
}
