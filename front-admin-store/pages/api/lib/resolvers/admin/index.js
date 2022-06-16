import adminResolver from './admin'

export default {
  TYPES: {
    ...adminResolver.TYPES
  },
  QUERIES: {
    ...adminResolver.QUERIES
  },
  MUTATIONS: {
    ...adminResolver.MUTATIONS
  }
}
