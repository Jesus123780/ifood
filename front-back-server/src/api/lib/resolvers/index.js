// import GraphQLUpload from 'graphql-upload'
import dateTimeScalar from './CustomScalar'
import deviceResolver from './device'
import messagesResolver from './messages'
import bannerResolver from './banners'
import storeResolver from './stores'
import { GraphQLUpload } from "graphql-upload";
export default {
    ...deviceResolver.TYPES,
    DateTime: dateTimeScalar,
    Upload: GraphQLUpload,
    Query: {
        ...deviceResolver.QUERIES,
        ...messagesResolver.QUERIES,
        ...storeResolver.QUERIES,
        ...bannerResolver.QUERIES,
    },
    Mutation: {
        ...deviceResolver.MUTATIONS,
        ...storeResolver.MUTATIONS,
        ...messagesResolver.MUTATIONS,
        ...bannerResolver.MUTATIONS,
    },
    Subscription: {
        ...messagesResolver.SUBSCRIPTIONS,
        ...storeResolver.SUBSCRIPTIONS,
        ...bannerResolver.SUBSCRIPTIONS,
        // ...deviceResolver.SUBSCRIPTIONS,
    },
}
