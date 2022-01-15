import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { concatPagination } from '@apollo/client/utilities'
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import merge from 'deepmerge'
import withSession from '../apollo/session'
import { createUploadLink } from 'apollo-upload-client'
import isEqual from 'lodash/isEqual'
import { URL_BASE } from './urls'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
const BROWSER_API_KEY = "k6mBs3JggSu0q48OS7yz";

let apolloClient
const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
}
// browser()
const authLink = setContext(async (_, { headers }) => {
    const idLasComp = localStorage.getItem('idLasComp')
    return {
        headers: {
            ...headers,
            authorization: idLasComp ? idLasComp : '',
            deviceid: await getDeviceId() || '',
        }
    }
})

const httpLink = createUploadLink({
    uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})

function createApolloClient() {
    return new ApolloClient({
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
        link: authLink.concat(httpLink),
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
