import { gql } from '@apollo/client'

export const REGISTER_PAYMENT_CARD_STORE = gql`
mutation registerPaymentCard($input: IPaymentCard){
  registerPaymentCard(input: $input){
    paymentCardId
    id
    idStore
    typeCardName
    CVV
    numberCard
    dueDate
    clientName
    createAt
    updateAt
    
  }
}
`
