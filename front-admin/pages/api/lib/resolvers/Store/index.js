import storeResolver from './store'
import ScheduleStoreResolver from './Schedule'

export default {
    TYPES: {
        ...storeResolver.TYPES,
        ...ScheduleStoreResolver.TYPES,
    },
    QUERIES: {
        ...storeResolver.QUERIES,
        ...ScheduleStoreResolver.QUERIES,
    },
    MUTATIONS: {
        ...storeResolver.MUTATIONS,
        ...ScheduleStoreResolver.MUTATIONS,
    }
}
