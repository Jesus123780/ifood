import messagesResolver from './messages'

export default {
  TYPES: {
    ...messagesResolver.TYPES
  },
  QUERIES: {
    ...messagesResolver.QUERIES
  },
  MUTATIONS: {
    ...messagesResolver.MUTATIONS
  },
  SUBSCRIPTIONS: {
    ...messagesResolver.SUBSCRIPTIONS
  }
}
