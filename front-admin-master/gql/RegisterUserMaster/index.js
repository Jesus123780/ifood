import { gql } from '@apollo/client';

export const CREATE_USER_MASTER = gql`
    mutation ($input: UserInputMaster) {
      createUserMaster(input: $input){
        name,
        username,
        email,
        lastName,
        password
        }
    }
`