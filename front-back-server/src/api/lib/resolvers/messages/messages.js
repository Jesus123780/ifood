// import { PubSub, withFilter } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub() //create a PubSub instance
/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
let currentNumber = 0
function incrementNumber() {
    currentNumber++
    pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber })
    setTimeout(incrementNumber, 1000)
}
// Start incrementing
incrementNumber()
const Query =  {
    Query: {
        // eslint-disable-next-line
        currentNumber: async (parent, _, ctx) => {
            setTimeout(incrementNumber, 1000)
            pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber })
            return 1
        }
    }
}
const SubscriptionSubscription = {
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED'])
        }
    }

}

export default {
    TYPES: {
    },
    QUERIES: {
        ...Query.Query
    },
    MUTATIONS: {
    },
    SUBSCRIPTIONS: {
        ...SubscriptionSubscription.Subscription
    }
}
