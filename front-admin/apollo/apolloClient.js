import { useMemo } from 'react'
import { setContext } from '@apollo/client/link/context'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink, split, createHttpLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_ADMIN_SERVER, URL_BASE, URL_BASE_ADMIN_MASTER } from './urls'
import { typeDefs } from './schema'
import { cache, isLoggedVar } from './cache'
import { WebSocketLink } from '@apollo/client/link/ws'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'


let apolloClient
let userAgent
export const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    userAgent = window.navigator.userAgent
    return result.visitorId
}

const errorHandler = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors?.length && graphQLErrors.forEach(err => {
            const { code } = err.extensions
            if (code === 'UNAUTHENTICATED' || code === 'FORBIDDEN') console.log('')
            else if (code === 403) {
                console.log('')
            }
        })
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        })
    //   
    graphQLErrors?.length && graphQLErrors.forEach(err => {
        const { code } = err.extensions
        if (code === 'UNAUTHENTICATED' || code === 'FORBIDDEN') console.log('Papuuuuuuuu')
        else if (code === 403) {
            console.log('Papuuuuuuuu')
        }
    })
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// const authLink = setContext(async (_, { headers }) => {
//     const lol = await getDeviceId()
//     window.localStorage.setItem('deviceid', lol)
//     const token = localStorage.getItem('sma.sv1')
//     const restaurant = localStorage.getItem('restaurant')
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? token : '',
//             userAgent: userAgent ? userAgent : '',
//             restaurant: restaurant ?? restaurant,
//             deviceid: await getDeviceId() || '',
//         }
//     }
// })


const authLink = async (_) => {
    const lol = await getDeviceId()
    window.localStorage.setItem('deviceid', lol)
    const token = localStorage.getItem('sma.sv1')
    const restaurant = localStorage.getItem('restaurant')
    return {
        authorization: token ? token : '',
        userAgent: userAgent ? userAgent : '',
        restaurant: restaurant ?? restaurant,
        deviceid: await getDeviceId() || '',
    }
}



const httpLink = createUploadLink({
    uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})

const getLink = async (operation) => {
    // await splitLink({ query: operation.query })
    const headers = await authLink()
    const definition = getMainDefinition(operation.query);
    const service = operation.getContext().clientName
    let uri = `${URL_BASE}graphql`
    if (service === 'subscriptions') uri = 'http://localhost:4000/graphql'
    if (service === 'main') uri = 'http://localhost:3000/api/graphql'
    if (service === 'admin-store') uri = `${URL_ADMIN}graphql`
    if (service === 'admin') uri = `${URL_BASE_ADMIN_MASTER}graphql`
    if (service === 'admin-server') uri = `${URL_ADMIN_SERVER}graphql`
    const link = createUploadLink({
        uri,
        credentials: 'same-origin',
        authorization: '',
        headers: {
            ...headers,
        }
    })
    return link.request(operation)
}


// Create Second Link
const wsLink = typeof window !== 'undefined' ? new WebSocketLink({
    uri: process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/graphql' : 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        lazy: true,
        timeout: 30000,
        connectionParams: async () => {
            const headers = await authLink()
            return {
                headers:
                {
                    ...headers,
                }
            }
        },
        connectionCallback: (error, result) => {
            console.log(error, result)
        }
    }
}) : null;

function createApolloClient() {
    const ssrMode = typeof window === 'undefined'

    const getLink = async (operation, forward) => {
        // await splitLink({ query: operation.query })
        const headers = await authLink()
        const definition = getMainDefinition(operation.query);
        const service = operation.getContext().clientName
        let uri = `${URL_BASE}graphql`
        if (service === 'subscriptions') uri = 'http://localhost:4000/graphql'
        if (service === 'main') uri = 'http://localhost:3000/api/graphql'
        if (service === 'admin-store') uri = `${URL_ADMIN}graphql`
        if (service === 'admin') uri = `${URL_BASE_ADMIN_MASTER}graphql`
        if (service === 'admin-server') uri = `${URL_ADMIN_SERVER}graphql`
        operation.setContext({
            headers: {
                ...headers,
                authorization: localStorage.getItem('restaurant') || '',
                deviceid: await getDeviceId() || '',
                client: 'front-admin'
            }
        });
        const context = operation.getContext()
        const { headers: ctx } = context || {}
        const { restaurant } = ctx || {}
        if (!restaurant) {
            isLoggedVar({ state: false, expired: true, message: 'Inicie session', code: 403 })
        }
        const link = createUploadLink({
            uri,
            credentials: 'same-origin',
            authorization: '',
            headers: {
                ...headers,
            }
        })

        return link.request(operation)
    }
    const defaultOptions = {
        watchQuery: {
            fetchPolicy: 'cache-first',
            returnPartialData: true,
            notifyOnNetworkStatusChange: true,
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all'
        }
    }
    const link = ssrMode ? ApolloLink.split(() => true, operation => getLink(operation),
    onError(({
        graphQLErrors,
        networkError
    }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path
            }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        }
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }),
) : typeof window !== "undefined"
    ? split((operation) => {
        const definition = getMainDefinition(operation.query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
        wsLink,
        ApolloLink.split(() => true, operation => getLink(operation),
            errorLink,
        ),

    )
    : ApolloLink.split(() => true, operation => getLink(operation),
        errorLink
    )
    return new ApolloClient({
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
        link: link,
        defaultOptions,
        typeDefs,
        cache
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))
                )
            ]
        })

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function addApolloState(client, pageProps) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
}

export function useApollo(pageProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME]
    const store = useMemo(() => initializeApollo(state), [state])
    return store
}
