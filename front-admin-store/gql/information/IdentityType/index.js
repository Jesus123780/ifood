import { gql } from '@apollo/client'

export const UPDATE_IDENTITY = gql`
mutation createTypeIdentity($input: ITypeIdentity){
  createTypeIdentity(input: $input){
    tiId
    tiName
    tiState    
  }
}
`
export const GET_IDENTITY = gql`
query typeIdentities{
  typeIdentities{
    tiId
    tiName
    tiState
  }
}
`