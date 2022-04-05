import { InMemoryCache, makeVar } from '@apollo/client'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import { getToken } from '../utils'
// const lol = getToken()
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