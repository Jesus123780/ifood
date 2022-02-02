import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'
import createCatOfProductResolver from './catOfProduct'
import emplooyeResolver from './emplooye'
import ContractResolver from './contrac'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...emplooyeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductResolver.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...emplooyeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
        ...createCatOfProductResolver.QUERIES,
        ...ContractResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ContractResolver.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...emplooyeResolver.MUTATIONS,
        ...createCatOfProductResolver.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
