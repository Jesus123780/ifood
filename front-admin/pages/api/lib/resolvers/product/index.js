import productsResolver from './products'
import foodResolver from './food'
import productsfoodResolver from './productsfood'
import extraProducts from './extraProducts'

export default {
  TYPES: {
    ...productsResolver.TYPES,
    ...foodResolver.TYPES,
    ...extraProducts.TYPES,
    ...productsfoodResolver.TYPES

  },
  QUERIES: {
    ...productsResolver.QUERIES,
    ...productsfoodResolver.QUERIES,
    ...extraProducts.QUERIES,
    ...foodResolver.QUERIES
  },
  MUTATIONS: {
    ...productsResolver.MUTATIONS,
    ...productsfoodResolver.MUTATIONS,
    ...extraProducts.MUTATIONS,
    ...foodResolver.MUTATIONS
  }
}
