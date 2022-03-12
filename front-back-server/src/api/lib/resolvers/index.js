// import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import deviceResolver from './device'
import messagesResolver from './messages'
import bannerResolver from './banners'
import { GraphQLUpload } from "graphql-upload";
export default {
    ...deviceResolver.TYPES,
    DateTime: dateTimeScalar,
    Upload: GraphQLUpload,
    Query: {
        ...deviceResolver.QUERIES,
        ...bannerResolver.QUERIES,
    },
    Mutation: {
        ...deviceResolver.MUTATIONS,
        ...bannerResolver.MUTATIONS,
    },
    Subscription: {
        ...messagesResolver.SUBSCRIPTIONS,
        ...bannerResolver.SUBSCRIPTIONS,
        // ...deviceResolver.SUBSCRIPTIONS,
    },
}
