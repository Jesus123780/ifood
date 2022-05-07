import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($input: LoginInput){
  login(input: $input){
    token
  }
}
`
export const GET_USER = gql`
query getUser($id: ID){
 getUser(id: $id ){
id
name
username
lastName
email
avatar
uToken
uPhoNum
ULocation
upLat
uState
upLon
upIdeDoc
siteWeb
description
password
createAt
  role {
    id
    name
  }
}
}
`
export const GET_ALL_USER = gql`
query getAllUser($search: String){
  getAllUser(search: $search){
    id
    name
    username
    lastName
    email
    email
    siteWeb
    description
    uPhoNum
    upLat
    upLon
    createAt
    avatar
    latestMessage {
      uuid
      content
      from
      to
    }
  }
}
`
export const UPDATE_AVATAR = gql`
mutation updateAvatar($file: Upload){
  UpdateAvatar(file: $file){
    status
    urlAvatar
  }
}
`