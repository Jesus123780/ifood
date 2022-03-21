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
debtWalletId
idStore
id
pId
UserDebtId
gender
debtName
personName
ccWalletUser
phoneWalletUser
lastName
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
export const DELETE_ONE_WALLET_DEBT = gql`
mutation delWalletDebt ($input: IWalletDebt!) {
  delWalletDebt(input: $input) {
    success
    message
    
  }
}
`
export const GET_ALL_WALLET_DEBT = gql`
query WalletDebt($search: String, $min: Int, $max: Int, $idStore: ID, $refDebtCode: String) {
  WalletDebt(search: $search, min: $min, max: $max, idStore: $idStore, refDebtCode: $refDebtCode) {
    debtWalletId
    idStore
    # id
    pId
    UserDebtId
    debtName
    personName
    phoneWalletUser
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
    phoneWalletUser
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