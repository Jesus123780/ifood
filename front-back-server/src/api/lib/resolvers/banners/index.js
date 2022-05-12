/* eslint-disable linebreak-style */
import bannerResolver from './bannerMain'
import bannerStoreResolver from './bannerStoreProfile'

export default {
    TYPES: {
        ...bannerResolver.TYPES,
        ...bannerStoreResolver.TYPES,
    },
    QUERIES: {
        ...bannerResolver.QUERIES,
        ...bannerStoreResolver.QUERIES,
    },
    MUTATIONS: {
        ...bannerResolver.MUTATIONS,
        ...bannerStoreResolver.MUTATIONS,
    }
}