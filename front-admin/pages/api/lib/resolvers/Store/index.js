import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'
import emplooyeResolver from './emplooye'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...emplooyeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...emplooyeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...emplooyeResolver.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
