import { gql } from '@apollo/client'

export const CREATE_CURRENT_SESSION = gql`
mutation  newRegisterUser($input: UserInput){
  newRegisterUser(input: $input){
    success
    message
  }
}
`
export const EMAIL_SESSION = gql`
mutation  registerEmailLogin($input: IEmailLogin){
  registerEmailLogin(input: $input){
    success
    message
  }
}
`