import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import UserResolvers from './users'
import recommendationResolver from './recommendation'
export default {
    ...UserResolvers.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...UserResolvers.QUERIES,
    },
    Mutation: {
        ...UserResolvers.MUTATIONS,
        ...recommendationResolver.MUTATIONS,
    }
}
