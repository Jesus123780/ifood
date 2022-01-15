import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import storeResolver from './Store'
import UserResolvers from './users'
import products from './product'
import informationResolver from './informations'
export default {
    ...UserResolvers.TYPES,
    ...storeResolver.TYPES,
    ...informationResolver.TYPES,
    ...products.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...UserResolvers.QUERIES,
        ...informationResolver.QUERIES,
        ...storeResolver.QUERIES,
        ...products.QUERIES,
    },
    Mutation: {
        ...UserResolvers.MUTATIONS,
        ...storeResolver.MUTATIONS,
        ...informationResolver.MUTATIONS,
        ...products.MUTATIONS,
    }
}
