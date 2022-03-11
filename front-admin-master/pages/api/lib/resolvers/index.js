import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import storeResolver from './Store'
import UserResolvers from './users'
import products from './product'
import deviceResolver from './device'
import categoriesResolver from '../resolvers/Category'
import informationResolver from './informations'
export default {
    ...UserResolvers.TYPES,
    ...storeResolver.TYPES,
    ...informationResolver.TYPES,
    ...products.TYPES,
    ...deviceResolver.TYPES,
    ...categoriesResolver.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...UserResolvers.QUERIES,
        ...categoriesResolver.QUERIES,
        ...informationResolver.QUERIES,
        ...storeResolver.QUERIES,
        ...products.QUERIES,
        ...deviceResolver.QUERIES,
    },
    Mutation: {
        ...UserResolvers.MUTATIONS,
        ...categoriesResolver.MUTATIONS,
        ...storeResolver.MUTATIONS,
        ...informationResolver.MUTATIONS,
        ...products.MUTATIONS,
        ...deviceResolver.MUTATIONS,
    }
}
