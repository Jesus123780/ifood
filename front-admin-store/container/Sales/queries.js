import { gql } from '@apollo/client'

export const CREATE_MULTIPLE_ORDER_PRODUCTS = gql`
mutation createMultipleOrderStore($input: SET_INPUT_SHOPPING_PRODUCTS_ITEMS) {
  createMultipleOrderStore(input: $input){
    success
    message
  }
}
`