/* eslint-disable linebreak-style */
import messagesResolver from './messages'
import clientStoreResResolver from './messages_store_client'

export default {
    TYPES: {
        ...messagesResolver.TYPES,
        ...clientStoreResResolver.TYPES,
    },
    QUERIES: {
        ...messagesResolver.QUERIES,
        ...clientStoreResResolver.QUERIES,
    },
    MUTATIONS: {
        ...messagesResolver.MUTATIONS,
        ...clientStoreResResolver.MUTATIONS
    },
    SUBSCRIPTIONS: {
        ...messagesResolver.SUBSCRIPTIONS,
        ...clientStoreResResolver.SUBSCRIPTIONS
    }
}
