import { gql } from '@apollo/client'

export const GET_ONE_TEAM_USER = gql`
query getOneUser($uEmail: String) {
  getOneUser(uEmail: $uEmail) {
    id
    name
    username
    lastName
    email
    avatar
    uToken
    uPhoNum
    upLat
    uState
    upLon
    upIdeDoc
    siteWeb
    description
    password
    createAt
    }
  }
`
export const CREATE_ONE_TEAM_USER = gql`
mutation createOneEmployeeStore($input: IEmployeeStore) {
  createOneEmployeeStore(input: $input) {
    success
    message
    }
  }
`
export const CREATE_ONE_TEAM_USER_INVITE = gql`
mutation createOneEmployeeStoreAndUser($input: IEmployeeStore) {
  createOneEmployeeStoreAndUser(input: $input) {
    success
    message
    }
  }
`