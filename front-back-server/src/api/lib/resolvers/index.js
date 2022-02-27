// import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import deviceResolver from './device'
import messagesResolver from './messages'
export default {
    ...deviceResolver.TYPES,
    DateTime: dateTimeScalar,
    // Upload: GraphQLUpload,
    Query: {
        ...deviceResolver.QUERIES,
    },
    Mutation: {
        ...deviceResolver.MUTATIONS,
    },
    Subscription: {
        ...messagesResolver.SUBSCRIPTIONS,
        // ...deviceResolver.SUBSCRIPTIONS,
    },
}
