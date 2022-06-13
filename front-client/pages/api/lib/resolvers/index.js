import dateTimeScalar from './CustomScalar'
import UserResolvers from './users'
import recommendationResolver from './recommendation'
import acepteCookies from './acepteCookies'
export default {
    ...UserResolvers.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...UserResolvers.QUERIES,
        ...acepteCookies.QUERIES,
    },
    Mutation: {
        ...UserResolvers.MUTATIONS,
        ...recommendationResolver.MUTATIONS,
        ...acepteCookies.MUTATIONS,
    }
}
