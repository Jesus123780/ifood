import bannerResolver from './bannerMain'

export default {
    TYPES: {
        ...bannerResolver.TYPES,
    },
    QUERIES: {
        ...bannerResolver.QUERIES,
    },
    MUTATIONS: {
        ...bannerResolver.MUTATIONS,
    }
}
