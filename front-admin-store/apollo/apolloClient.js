import { useMemo } from 'react'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, ApolloLink, split } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
// import FingerprintJS from '@fingerprintjs/fingerprintjs'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_ADMIN, URL_BASE, URL_BASE_ADMIN_MASTER } from './urls'
import { typeDefs } from './schema'
import { cache, isLoggedVar } from './cache'
import { WebSocketLink } from '@apollo/client/link/ws'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
// import { createHttpLink } from 'apollo-link-http'
// import { createHttpLink } from 'apollo-link-http'
// https://stackoverflow.com/questions/57229164/how-to-get-the-uri-in-callback-of-onerror-from-apollo-link-error
// https://stackoverflow.com/questions/53062839/handling-errors-for-apollo-client-when-using-apollolink-split
let apolloClient

export const getDeviceId = async () => {
  // const fp = await FingerprintJS.load()
  // const result = await fp.get()
  // userAgent = 'window.navigator.userAgent'
  return '73.8459648'
}
// eslint-disable-next-line
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

const authLink = async () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('session')
    const restaurant = window.localStorage.getItem('restaurant')
    return {
      authorization: token && `Bearer ${token}`,
      restaurant: restaurant ?? restaurant,
      deviceid: ''
    }
  }
}
// eslint-disable-next-line
const httpLink = createUploadLink({
  uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
  credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})
// Create Second Link
const wsLink = typeof window !== 'undefined' ? new WebSocketLink({
  uri: process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/graphql' : 'ws://server-image-food.herokuapp.com/graphql',
  options: {
    reconnect: true,
    lazy: true,
    timeout: 30000,
    connectionParams: async () => {
      const headers = await authLink()
      return {
        headers:
        {
          ...headers
        }
      }
    },
    connectionCallback: (error, result) => {
      // eslint-disable-next-line no-console
      console.log(error, result)
    }
  }
}) : null
function createApolloClient() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, location, path }) =>
      {return console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`)}
      )
  
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })
  const ssrMode = typeof window === 'undefined' // Disables forceFetch on the server (so queries are only run once)
  const getLink = async (operation) => {
    // await splitLink({ query: operation.query })
    const headers = await authLink()
    const service = operation.getContext().clientName
    let uri = `${process.env.URL_BASE}api/graphql`
    if (service === 'main') uri = `${process.env.URL_BASE}api/graphql`
    if (service === 'admin-store') uri = `${URL_ADMIN}graphql`
    if (service === 'admin') uri = `${URL_BASE_ADMIN_MASTER}graphql`
    if (service === 'admin-server') uri = `${process.env.URL_ADMIN_SERVER}graphql`
    const { authorization } = headers || {}
    const token = authorization?.split(' ')[1]
    const context = operation.getContext()
    const { headers: ctx } = context || {}
    const { restaurant } = ctx || {}
    operation.setContext({
      headers: {
        ...headers,
        authorization: service === 'admin-server' || service === 'subscriptions' ? `Bearer ${token}` : `${restaurant}`,
        client: 'front-admin'
      }
    })


    if (!restaurant) {
      isLoggedVar({ state: false, expired: true, message: 'Inicie session', code: 403 })
    }
    const link = createUploadLink({
      uri,
      credentials: 'include',
      authorization: service === 'admin-server' || service === 'subscriptions' ? `Bearer ${token}` : `${restaurant}`,

      headers: {
        ...headers
      }
    })
    return link.request(operation)
  }
  // eslint-disable-next-line
  const defaultOptions = { 
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
  const link = ssrMode ? ApolloLink.split(() => { return true }, operation => { return getLink(operation) },
    onError(({
      graphQLErrors,
      networkError
    }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path
        }) => {
          return console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        }
        )
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    })
  ) : typeof window !== 'undefined'
    ? split((operation) => {
      const definition = getMainDefinition(operation.query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    ApolloLink.split(() => { return true }, operation => { return getLink(operation) },
      errorLink
    )
    )
    : ApolloLink.split(() => { return true }, operation => { return getLink(operation) },
      errorLink
    )
    
    
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode,
    link:  link,
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
      arrayMerge: (destinationArray, sourceArray) => {
        return [
          ...sourceArray,
          ...destinationArray.filter(d => { return sourceArray.every(s => { return !isEqual(d, s) }) }
          )
        ]
      }
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
  const store = useMemo(() => { return initializeApollo(state) }, [state])
  return store
}
