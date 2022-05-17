import { useMemo } from 'react'
import { ApolloClient, from, HttpLink, InMemoryCache, ApolloLink, split, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { URL_ADMIN, URL_ADMIN_SERVER, URL_BASE } from './urls'
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'


export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient
let userAgent
export const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    userAgent = window.navigator.userAgent
    return result.visitorId
}
const authLink = async (_) => {
    if (typeof window !== "undefined") {
        const token = window?.localStorage.getItem('session')

        const authorization = token ? `Bearer ${token}` : null
        return token
            ? {
                headers: {
                    // ...headers,
                    authorization,
                },
            }
            : {
                headers: {
                    // ...headers,
                },
            }

    }
}


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

// Create Second Link
const wsLink = process.browser ? new WebSocketLink({
    // uri: process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/graphql' : 'ws://localhost:4000/graphql',
    uri: process.env.NODE_ENV === 'development' ? 'ws://server-image-food.herokuapp.com/graphql' : 'ws://server-image-food.herokuapp.com/graphql',
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: async () => {
            const headers = await authLink()
            return {
                ...headers,
            }
        }
    }
}) : null;



const getLink = async (operation) => {
    // await splitLink({ query: operation.query })
    const headers = await authLink()
    const definition = getMainDefinition(operation.query);
    const service = operation.getContext().clientName
    let uri = `${process.env.URL_BASE}api/graphql`
    if (service === 'main') uri = `${process.env.MAIN_URL_BASE}api/graphql`
    if (service === 'admin') uri = `${URL_BASE_ADMIN_MASTER}graphql`
    if (service === 'admin-server') uri = `${process.env.URL_ADMIN_SERVER}graphql`
    const link = new HttpLink({
        uri,
        credentials: 'same-origin',
        authorization: '',
        ...headers
    })
    return link.request(operation)
}
const httpLink = createUploadLink({
    uri: `${URL_BASE}graphql`,
    authorization: 'pija',
    credentials: 'same-origin'
})
// split based on operation type 
const _Link = typeof window !== "undefined" ? split(
    (operation) => {
        const definition = getMainDefinition(operation.query);
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    },
    wsLink,
    httpLink,
) : httpLink;


// const [createPerson] = useMutation(CREATE PERSON, (
//     onError: (error) » {
//       notifyError(error.graphQLErrors[0].message)
//     },
//     update: (store, response) {
//       const dataInStore = store.readQuery({ query: ALL_PERSONS })
//       store.writeQuery({
//         query: ALL PERSONS,
//         data: {

//            ... dataInStore,
//           allPersons:[
//                dataInStore.allPersons, ...
//             response.data.addPerson
//       })
//   })

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
    return new ApolloClient({
        // defaultOptions,
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',

        link,
        // link: ApolloLink.from([
        //     onError(({
        //         graphQLErrors,
        //         networkError
        //     }) => {
        //         if (graphQLErrors) {
        //             graphQLErrors.map(({ message, locations, path
        //             }) =>
        //                 console.log(
        //                     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //                 )
        //             );
        //         }
        //         if (networkError) {
        //             console.log(`[Network error]: ${networkError}`);
        //         }
        //     }),
        //     link
        // ]),
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
