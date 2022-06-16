import { gql } from '@apollo/client'

export const GET_ALL_CARDS_TYPES = gql`
query getAllPaymentCardType {
  getAllPaymentCardType {
    cardtypeId
    typeCardName
    createAt
    updateAt
  }
}
`
export const REGISTER_CARDS_TYPES = gql`
mutation registerPaymentCardType($input: IPaymentCardType) {
  registerPaymentCardType(input: $input) {
    cardtypeId
    typeCardName
    createAt
    updateAt
  }
}
`
export const DELETE_CARDS_TYPES = gql`
mutation deletePaymentCardType($cardtypeId: ID) {
  deletePaymentCardType(cardtypeId: $cardtypeId) {
    success
    message
  }
}
`
