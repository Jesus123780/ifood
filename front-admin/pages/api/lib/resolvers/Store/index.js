import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'
import createCatOfProductsResolver from './catOfProducts'
import createCatOfProductResolver from './catOfProduct'
import emplooyeResolver from './emplooye'
import ContractResolver from './contrac'
import pedidosResolver from './pedidos'
import setVisitorStore from './VisitorStore'
import storyStore from './storyStore'
import shoppingStore from './shopping'
import contactStore from './contact'
import walletDebtStore from './walletDebt'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...walletDebtStore.TYPES,
        ...emplooyeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
        ...createCatOfProductResolver.TYPES,
        ...setVisitorStore.TYPES,
        ...pedidosResolver.TYPES,
        ...storyStore.TYPES,
        ...shoppingStore.TYPES,
        ...contactStore.TYPES,
        ...createCatOfProductsResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...emplooyeResolver.QUERIES,
        ...walletDebtStore.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
        ...createCatOfProductsResolver.QUERIES,
        ...pedidosResolver.QUERIES,
        ...setVisitorStore.QUERIES,
        ...shoppingStore.QUERIES,
        ...contactStore.QUERIES,
        ...createCatOfProductResolver.QUERIES,
        ...storyStore.QUERIES,
        ...ContractResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...walletDebtStore.MUTATIONS,
        ...ContractResolver.MUTATIONS,
        ...shoppingStore.MUTATIONS,
        ...setVisitorStore.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
        ...contactStore.MUTATIONS,
        ...pedidosResolver.MUTATIONS,
        ...emplooyeResolver.MUTATIONS,
        ...createCatOfProductResolver.MUTATIONS,
        ...storyStore.MUTATIONS,
        ...createCatOfProductsResolver.MUTATIONS,
    }
}
