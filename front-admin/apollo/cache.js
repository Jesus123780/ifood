import { InMemoryCache, makeVar } from '@apollo/client'
import { getToken } from '../utils'

export const isLoggedVar = makeVar({ state: true, expired: false })

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLogged: {
                    read: () => isLoggedVar()
                }
            }
        }
    }
})