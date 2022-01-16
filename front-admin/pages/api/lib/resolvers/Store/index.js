import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
