import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
// import UserResolvers from './users'
export default {
    ...UserResolvers.TYPES,
    // DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        // ...UserResolvers.QUERIES,
    },
    Mutation: {
        // ...UserResolvers.MUTATIONS,
    }
}
