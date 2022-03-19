import { gql } from '@apollo/client'

export const CREATE_CONTACTS = gql`
mutation createContacts ($input: IContacts) {
  createContacts(input: $input) {
    success
    message
  }
}
`
export const GET_ALL_CONTACTS = gql`
query getAllContacts($idStore: ID) {
  getAllContacts(idStore: $idStore) {
    contactId
    cntState
    cntComments
    cntName
    createAt
    updateAt
    
  }
}
`