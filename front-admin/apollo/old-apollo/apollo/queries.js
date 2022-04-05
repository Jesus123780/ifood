import { gql } from '@apollo/client'

export const UPDATE_TOKEN = gql`
mutation updateToken($id: ID,$token: String $error: Boolean!) {
  refreshUserPayrollToken(id: $id, token: $token, error: $error) {
      tokenAuth
      success
      message
    	
  }
}
`