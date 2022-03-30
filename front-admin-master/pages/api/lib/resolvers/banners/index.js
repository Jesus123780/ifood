import bannerResolver from './bannerMain'
import bannerDashboardResolver from './bannerMainDashboard'

export default {
    TYPES: {
        ...bannerResolver.TYPES,
        ...bannerDashboardResolver.TYPES,
    },
    QUERIES: {
        ...bannerDashboardResolver.QUERIES,
        ...bannerResolver.QUERIES,
    },
    MUTATIONS: {
        ...bannerResolver.MUTATIONS,
        ...bannerDashboardResolver.MUTATIONS,
    }
}
