/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/**
 * 
 * @param {*} _root no usado 
 * @param {*} param1 _
 * @param {*} context context info global
 * @param {*} info _
 * @returns 
 */
export const getRoles = async (_root, _args, context, info) => {
    console.log('first')
}
export const getMessage = async (_root, _args, context, info) => {
    return 'Prueba 1'
}
export const currentNumber = async (_root, _args, context, info) => {
    let currentNumber = 0
    context.pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber })
    return 0
    // return 'Prueba 1'
}
export const numberIncremented = async (_root, _args, context, info) => {
    return { numberIncremented: { subscribe: () => context.pubsub.asyncIterator(['NUMBER_INCREMENTED']) } }
    // return 'Prueba 1'
}

export default {
    TYPES: {
    },
    QUERIES: {
        getRoles,
        // currentNumber,
        getMessage
    },
    MUTATIONS: {
    // numberIncremented
    },
    SUBSCRIPTIONS: {
    // numberIncremented
    }
}
