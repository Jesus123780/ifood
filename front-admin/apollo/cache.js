import { InMemoryCache, makeVar } from '@apollo/client'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
export const isLoggedVar = makeVar({ state: true, expired: false })

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLogged: {
                    read: () => isLoggedVar()
                },
                allPosts: concatPagination()
            }
        }
    }
})