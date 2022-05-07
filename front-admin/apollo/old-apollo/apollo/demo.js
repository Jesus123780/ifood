import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { split } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_BASE, URL_BASE_WS } from './urls'
import { typeDefs } from './schema'

const authLink = setContext(async (_, { headers }) => {
  const lol = await getDeviceId()
  window.localStorage.setItem('deviceid', lol)
  const token = localStorage.getItem('sma.sv1')
  const restaurant = localStorage.getItem('restaurant')
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
      userAgent: userAgent ? userAgent : '',
      restaurant: restaurant ?? restaurant,
      deviceid: await getDeviceId() || ''
    }
  }
})

function createApolloClient() {
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === 'undefined',
    // assumeImmutableResults: true,
    // queryDeduplication: true,
    link: from([
      authLink,
      httpLink
      // errorLink,
      // splitLink
    ]),
    typeDefs,
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
      arrayMerge: (destinationArray, sourceArray) => {return [
        ...sourceArray,
        ...destinationArray.filter(d => {return sourceArray.every(s => {return !isEqual(d, s)})}
        )
      ]}
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
  const store = useMemo(() => {return initializeApollo(state)}, [state])
  return store
}
