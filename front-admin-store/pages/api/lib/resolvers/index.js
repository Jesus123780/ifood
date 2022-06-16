import dateTimeScalar from './CustomScalar'
import storeResolver from './Store'
import UserResolvers from './users'
import products from './product'
import deviceResolver from './device'
import categoriesResolver from '../resolvers/Category'
import informationResolver from './informations'
import Providers from './Providers'
import recommendedCategorieStoreResolver from './recommended'
import paymentCardResolver from './paymentCard'
import adminResolver from './admin'
export default {
  ...UserResolvers.TYPES,
  ...storeResolver.TYPES,
  ...informationResolver.TYPES,
  ...Providers.TYPES,
  ...products.TYPES,
  ...paymentCardResolver.TYPES,
  ...deviceResolver.TYPES,
  ...recommendedCategorieStoreResolver.TYPES,
  ...categoriesResolver.TYPES,
  ...adminResolver.TYPES,
  DateTime: dateTimeScalar,
  // Upload: GraphQLUpload,
  Query: {
    ...UserResolvers.QUERIES,
    ...categoriesResolver.QUERIES,
    ...adminResolver.QUERIES,
    ...Providers.QUERIES,
    ...recommendedCategorieStoreResolver.QUERIES,
    ...informationResolver.QUERIES,
    ...storeResolver.QUERIES,
    ...paymentCardResolver.QUERIES,
    ...products.QUERIES,
    ...deviceResolver.QUERIES
  },
  Mutation: {
    ...UserResolvers.MUTATIONS,
    ...Providers.MUTATIONS,
    ...categoriesResolver.MUTATIONS,
    ...adminResolver.MUTATIONS,
    ...storeResolver.MUTATIONS,
    ...informationResolver.MUTATIONS,
    ...products.MUTATIONS,
    ...paymentCardResolver.MUTATIONS,
    ...recommendedCategorieStoreResolver.MUTATIONS,
    ...deviceResolver.MUTATIONS
  }
}
