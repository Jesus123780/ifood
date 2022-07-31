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
