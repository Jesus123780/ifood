import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'
import createCatOfProductResolver from './catOfProduct'
import emplooyeResolver from './emplooye'
import ContractResolver from './contrac'
import pedidosResolver from './pedidos'
import setVisitorStore from './VisitorStore'
import storyStore from './storyStore'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...emplooyeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductResolver.TYPES,
        ...setVisitorStore.TYPES,
        ...pedidosResolver.TYPES,
        ...storyStore.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...emplooyeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
        ...pedidosResolver.QUERIES,
        ...setVisitorStore.QUERIES,
        ...createCatOfProductResolver.QUERIES,
        ...storyStore.QUERIES,
        ...ContractResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ContractResolver.MUTATIONS,
        ...setVisitorStore.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...pedidosResolver.MUTATIONS,
        ...emplooyeResolver.MUTATIONS,
        ...createCatOfProductResolver.MUTATIONS,
        ...storyStore.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
