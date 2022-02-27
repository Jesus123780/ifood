import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_BASE } from './urls'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { onError } from '@apollo/client/link/error'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient
let userAgent
export const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    userAgent = window.navigator.userAgent
    return result.visitorId
}

const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('session')
    const lol = await getDeviceId()
    window.localStorage.setItem('deviceid', lol)
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}` ? `Bearer ${token}` : '',
        }
    }
})

const httpLink = new HttpLink({
    uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
    authorization: 'pija',
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})

// Create Second Link
const subscriptions = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: 'pija'
    }
    // other link options...
});
// const thirdLink = new HttpLink({
//     uri: 'http://localhost:3000/',
//     headers: {
//     }
//     // other link options...
//   });
// const otherLinks = ApolloLink.split(
//     operation => operation.getContext().clientName === "main", // Routes the query to the proper client
//     thirdLink,  
// );

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

function createApolloClient() {
    return new ApolloClient({
        // connectToDevTools: true,
        connectToDevTools: process.browser,
        ssrMode: typeof window === 'undefined',
        // link: ApolloLink.split(
        //     operation => operation.getContext().clientName === "subscriptions", // Routes the query to the proper client
        //     authLink,
        //     httpLink,
        //     subscriptions,
        //     // otherLinks
        // ),
        link: from([
            errorLink,
            authLink,
            httpLink,
            operation => operation.getContext().clientName === "subscriptions", // Routes the query to the proper client
            // subscriptions
        ]),
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
