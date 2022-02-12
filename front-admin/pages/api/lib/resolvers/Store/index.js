import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'
import createCatOfProductResolver from './catOfProduct'
import emplooyeResolver from './emplooye'
import ContractResolver from './contrac'
import pedidosResolver from './pedidos'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...emplooyeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductResolver.TYPES,
        ...pedidosResolver.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...emplooyeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
        ...pedidosResolver.QUERIES,
        ...createCatOfProductResolver.QUERIES,
        ...ContractResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ContractResolver.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...pedidosResolver.MUTATIONS,
        ...emplooyeResolver.MUTATIONS,
        ...createCatOfProductResolver.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
