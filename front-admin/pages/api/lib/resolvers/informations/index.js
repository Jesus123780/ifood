import informationResolver from './information'

export default {
  TYPES: {
    ...informationResolver.TYPES
  },
  QUERIES: {
    ...informationResolver.QUERIES
  },
  MUTATIONS: {
    ...informationResolver.MUTATIONS
  }
}
