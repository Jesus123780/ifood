import paymentCardResolver from './paymentCard'

export default {
  TYPES: {
    ...paymentCardResolver.TYPES
  },
  QUERIES: {
    ...paymentCardResolver.QUERIES
  },
  MUTATIONS: {
    ...paymentCardResolver.MUTATIONS
  }
}
