import { gql } from '@apollo/client'

export const CREATE_USER_SESSION = gql`
mutation  newRegisterUser($input: UserInput){
  newRegisterUser(input: $input){
    success
    message
  }
}
`