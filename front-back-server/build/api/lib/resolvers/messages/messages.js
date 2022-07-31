'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true
})
exports.default = void 0

var _graphqlSubscriptions = require('graphql-subscriptions')

// import { PubSub, withFilter } from 'apollo-server'
const pubsub = new _graphqlSubscriptions.PubSub() //create a PubSub instance

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
    pubsub.publish('NUMBER_INCREMENTED', {
        numberIncremented: currentNumber
    })
    setTimeout(incrementNumber, 1000)
} // Start incrementing


incrementNumber()
const Query = {
    Query: {
    // eslint-disable-next-line
    currentNumber: async (parent, _, ctx) => {
            setTimeout(incrementNumber, 1000)
            pubsub.publish('NUMBER_INCREMENTED', {
                numberIncremented: currentNumber
            })
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
var _default = {
    TYPES: {},
    QUERIES: { ...Query.Query
    },
    MUTATIONS: {},
    SUBSCRIPTIONS: { ...SubscriptionSubscription.Subscription
    }
}
exports.default = _default