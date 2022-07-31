import userResolver from './user'
import locationResolver from './location'
import salesResolver from './foodorder'
import dynamicPasswordResolver from './dynamicPassword'

export default {
  TYPES: {
    ...dynamicPasswordResolver.TYPES,
    ...locationResolver.TYPES,
    ...salesResolver.TYPES,
    ...userResolver.TYPES
  },
  QUERIES: {
    ...dynamicPasswordResolver.QUERIES,
    ...locationResolver.QUERIES,
    ...salesResolver.QUERIES,
    ...userResolver.QUERIES
  },
  MUTATIONS: {
    ...dynamicPasswordResolver.MUTATIONS,
    ...locationResolver.MUTATIONS,
    ...salesResolver.MUTATIONS,
    ...userResolver.MUTATIONS
  }
}
