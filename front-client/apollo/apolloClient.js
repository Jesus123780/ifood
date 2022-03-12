import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_ADMIN, URL_ADMIN_SERVER, URL_BASE } from './urls'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { onError } from '@apollo/client/link/error'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { WebSocketLink } from "@apollo/client/link/ws";

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient
let userAgent
export const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    userAgent = window.navigator.userAgent
    return result.visitorId
}
const wsLink = process.browser ? new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
    },
}) : null
// const wsLink = new WebSocketLink({
//     uri: `ws://localhost:4000/graphql`,
//     options: {
//         reconnect: true,
//         connectionParams: {
//             authToken: 'localStorage.getItem(AUTH_TOKEN)'
//         }
//     }
// });
const authLink = async (_) => {
    const token = window.localStorage.getItem('session')
    const lol = await getDeviceId()
    window.localStorage.setItem('deviceid', lol)
    return {
        authorization: `Bearer ${token}` ? `Bearer ${token}` : '',
    }
}
const httpLink = new HttpLink({
    uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
    authorization: 'pija',
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})

// Create Second Link
const subscriptions = process.browser ? new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: 'pija'
    }
    // other link options...
}) : null
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


// const splitLink = split(
//     ({ query }) => {
//         console.log(query)
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
// );
const getLink = async (operation) => {
    // await splitLink({ query: operation.query })
    const headers = await authLink()
    const definition = getMainDefinition(operation.query);
    const service = operation.getContext().clientName
    let uri = `${URL_BASE}graphql`
    if (service === 'subscriptions') uri = 'http://localhost:4000/graphql'
    if (service === 'main') uri = 'http://localhost:3000/api/graphql'
    if (service === 'admin') uri = `${URL_ADMIN}graphql`
    if (service === 'admin-server') uri = `${URL_ADMIN_SERVER}graphql`
    const link = new HttpLink({
        uri,
        credentials: 'same-origin',
        authorization: '',
        headers: {  
            ...headers,
        }
    })
    return link.request(operation)
}
function createApolloClient() {
    return new ApolloClient({
        // connectToDevTools: true,
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.split(() => true, operation => getLink(operation),
            // ,
            errorLink,
        ),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        allPosts: concatPagination()
                    }
                }
            }
        })
    })
}

export function initializeApollo(initialState = null, ctx) {
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
    const store = useMemo(() => initializeApollo(state, pageProps), [state])
    return store
}
