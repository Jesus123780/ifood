import providersStoreResolver from './providers'

export default {
  TYPES: {
    ...providersStoreResolver.TYPES
  },
  QUERIES: {
    ...providersStoreResolver.QUERIES
  },
  MUTATIONS: {
    ...providersStoreResolver.MUTATIONS
  }
}
