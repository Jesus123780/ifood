import { gql } from '@apollo/client'

export const DELETE_ONE_ITEM_SHOPPING_PRODUCT = gql`
mutation deleteOneItem($cState: Int, $ShoppingCard: ID) {
  deleteOneItem(cState: $cState, ShoppingCard: $ShoppingCard){
    success
    message
  }
}
`
export const CREATE_MULTIPLE_ORDER_PRODUCTS = gql`
mutation createMultipleOrderStore($input: SET_INPUT_SHOPPING_PRODUCTS_ITEMS) {
  createMultipleOrderStore(input: $input){
    success
    message
  }
}
`
