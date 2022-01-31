import productsResolver from './products'
import foodResolver from './food'
import productsfoodResolver from './productsfood'

export default {
    TYPES: {
        ...productsResolver.TYPES,
        ...foodResolver.TYPES,
    },
    QUERIES: {
        ...productsResolver.QUERIES,
        ...productsfoodResolver.QUERIES,
        ...foodResolver.QUERIES
    },
    MUTATIONS: {
        ...productsResolver.MUTATIONS,
        ...productsfoodResolver.MUTATIONS,
        ...foodResolver.MUTATIONS
    }
}
