import { gql } from '@apollo/client'

export const CREATE_SHOPPING = gql`
mutation newShopping ($input: IShopping) {
  newShopping(input: $input) {
    success
    message
  }
}
`
export const GET_ALL_SHOPPING = gql`
query getAllShopping($idStore: ID) {
  getAllShopping(idStore: $idStore) {
    shoId
    idStore
    shoName
    shoPrice
    shoComments
    shoState
    createAt
    updateAt
    
  }
}
`