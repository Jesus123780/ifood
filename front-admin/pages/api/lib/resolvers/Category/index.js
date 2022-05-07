import categoriesResolver from './categories'

export default {
  TYPES: {
    ...categoriesResolver.TYPES
  },
  QUERIES: {
    ...categoriesResolver.QUERIES
  },
  MUTATIONS: {
    ...categoriesResolver.MUTATIONS
  }
}
