import { gql } from '@apollo/client'

export const CREATE_CONTACTS = gql`
mutation createContacts ($input: IContacts) {
  createContacts(input: $input) {
    success
    message
  }
}
`
export const CREATE_WALLET_DEBT = gql`
mutation createWalletDebt ($input: IWalletDebt! $inputLineItems: LineItemsIdProductsWallet!) {
  createWalletDebt(input: $input, inputLineItems: $inputLineItems) {
    success
    message
  }
}
`
export const GET_ALL_WALLET_DEBT = gql`
query WalletDebt {
  WalletDebt {
    debtWalletId
    idStore
    # id
    pId
    UserDebtId
    debtName
    personName
    RefDebtCode
    debtAmount
    debtUuid
    debtComments
    debtState
    ccWalletUser
    createAt
    updateAt
    getAllWalletDebtProduct {
      pId
      UserDebtId
      debtWalletProductId
      idStore
      RefDebtCode
      debtAmountProduct
      debtComments
      debtProductState
      createAt
      updateAt
    }
    
  }
}
`
export const GET_ONE_WALLET_DEBT = gql`
query getOneWalletDebt($debtWalletId: ID!){
  getOneWalletDebt(debtWalletId: $debtWalletId) {
       debtWalletId
    idStore
    # id
    pId
    UserDebtId
    debtName
    personName
    RefDebtCode
    debtAmount
    debtUuid
    debtComments
    debtState
    createAt
    updateAt
    getAllWalletDebtProduct {
      pId
      UserDebtId
      debtWalletProductId
      idStore
      RefDebtCode
      debtAmountProduct
      debtComments
      debtProductState
      createAt
      updateAt
    }
   
  }
}
`