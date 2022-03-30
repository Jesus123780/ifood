import { gql } from '@apollo/client'

export const CREATE_CLIENTS = gql`
mutation createClients ($input: IClients) {
  createClients(input: $input) {
    cliId
    idStore
    idUser
    clState
    ClientAddress
    clientNumber
    ccClient
    gender
    clientLastName
    clientName
    createAt
    updateAt
  }
}
`
export const DELETE_ONE_CLIENTS = gql`
mutation deleteClient($cliId: ID, $clState: Int!) {
  deleteClient(cliId: $cliId, clState: $clState) {
    success
    message
    
  }
}
`
export const GET_ALL_CLIENTS = gql`
query getAllClients($idStore: ID, $cId: ID, $dId: ID, $ctId: ID, $search: String,  $min: Int, $max: Int, $fromDate: DateTime, $toDate: DateTime ) {
  getAllClients(idStore: $idStore, cId: $cId, dId: $dId, ctId: $ctId, search: $search, min: $min, max: $max, fromDate: $fromDate, toDate: $toDate) {
    cliId
    idStore
    gender
    idUser
    clState
    clientNumber
    ccClient
    clientLastName
    clientName
    ClientAddress
    createAt
    updateAt

  }
}
`
export const GET_ONE_CLIENT = gql`
query getOneClients($cliId: ID) {
  getOneClients(cliId: $cliId) {
    cliId
    idStore
    idUser
    clState
    clientNumber
    ClientAddress
    gender
    ccClient
    clientLastName
    clientName
    createAt
    updateAt

  }
}
`
