import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import storeResolver from './Store'
import UserResolvers from './users'
import products from './product'
import categoriesResolver from '../resolvers/Category'
import informationResolver from './informations'
export default {
    ...UserResolvers.TYPES,
    ...storeResolver.TYPES,
    ...informationResolver.TYPES,
    ...products.TYPES,
    ...categoriesResolver.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...UserResolvers.QUERIES,
        ...categoriesResolver.QUERIES,
        ...informationResolver.QUERIES,
        ...storeResolver.QUERIES,
        ...products.QUERIES,
    },
    Mutation: {
        ...UserResolvers.MUTATIONS,
        ...categoriesResolver.MUTATIONS,
        ...storeResolver.MUTATIONS,
        ...informationResolver.MUTATIONS,
        ...products.MUTATIONS,
    }
}
