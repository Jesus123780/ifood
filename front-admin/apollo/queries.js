import { gql } from '@apollo/client'

export const UPDATE_TOKEN = gql`
    mutation updateToken {
        refreshUserPayrollToken {
            tokenAuth
        }
    }
`