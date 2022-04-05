import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink, split, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_ADMIN_SERVER, URL_BASE, URL_BASE_ADMIN_MASTER } from './urls'
import { typeDefs } from './schema'
import { cache, isLoggedVar } from './cache'
import { WebSocketLink } from '@apollo/client/link/ws'
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
let apolloClient
let userAgent
export const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    userAgent = window.navigator.userAgent
    return result.visitorId
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        // Handle Errors
    }

    forward(operation)
})

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

const errorHandler = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver
                case 'UNAUTHENTICATED':
                    // Modify the operation context with a new token
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                        headers: {
                            ...oldHeaders,
                            authorization: getNewToken(),
                        },
                    });
                    // Retry the request, returning the new observable
                    return forward(operation);
            }
        }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
})

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
const authLink2 = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('restaurant') || '',
            deviceid: await getDeviceId() || '',
            // client: 'ml.admin'
        }
    }
})
const httpLink = createUploadLink({
    uri: `${URL_BASE}graphql`, // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
})
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
const authLinkDemo = setContext((_, { headers }) => {
    console.log(_, 98)
    // my authorization stuff
})
function createApolloClient() {
    const ssrMode = typeof window === 'undefined'
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
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        // this callback is never called
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    })
    const link2 = ApolloLink.from([
        errorLink,
        httpLink,
    ])
    const authenticationLink = new ApolloLink((operation, forward) => {
        console.log(operation)
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            }
            if (networkError) console.error(`[Network error]: ${networkError}`, networkError.stack);
        })
        return forward(operation);
        // const currentSession = await Auth.currentSession();
        // setAccessToken(currentSession.signInUserSession.idToken.jwtToken)

        // if (typeof token === "string") {
        //   operation.setContext(() => ({
        //     headers: {
        //       Authorization: token
        //     }
        //   }));
        // }

    });
    const ERROR = onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
          // Handle Errors
        }
      
        forward(operation)
      })
    const apolloClient = new ApolloClient({
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
        typeDefs,
        name: 'front-admin',
        headers: {
            // authorization: localStorage.getItem('token'),
            'client': 'front-admin',
        },
        link: ApolloLink.from([
            // errorLink,
            authenticationLink, link
        ]),
        credentials: 'same-origin',
        defaultOptions,
        cache,
        // link: errorLink.concat(link),
        // link: ApolloLink.from([
        //     onError(({ graphQLErrors, networkError }) => {
        //         if (graphQLErrors) {
        //           graphQLErrors.map(({ message, locations, path }) =>
        //             console.log(
        //               `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //             )
        //           );
        //         }
        //         if (networkError) console.error(`[Network error]: ${networkError}`, networkError.stack);
        //       }),
        //       ApolloLink.split(
        //         operation => operation.getContext().important === true,
        //         httpLink, // don't batch important
        //         // batchHttpLink
        //       ),
        // ]),
        // link: ApolloLink.split(
        //     (operation) => operation.getContext().clientName === 'link1',
        //     Link1, // <= apollo will send to this if clientName is "link1"
        //     ApolloLink.split(
        //         (operation) => operation.getContext().clientName === 'link2',
        //         Link2,// <= apollo will send to this if clientName is "link2"
        //         Link3,// <= else Link3 will run
        //     ),
        // ),


        // client,
    })
    return apolloClient
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
