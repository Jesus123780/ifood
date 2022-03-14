import { gql } from '@apollo/client'

export const SET_USER_PROFILE = gql`
    mutation setUserProfile($data: IUserProfile!) {
        setUserProfile(input: $data){
            upId
            id
            upPhone
            upDateBir
            upImage
            upBloodG
            cId
            ctId
            dId
            upAddress
            upZipCode
        }
    }
`
export const GET_ALL_DEVICES = gql`
query getDeviceUsers{
  getDeviceUsers{
      dId
      locationFormat
      deviceId
      deviceName
      type
      short_name
      platform
      version
      dState
      DatCre
      DatMod
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
export const GET_USER_PROFILE = gql`
query getOneUserProfile($id: ID) {
  getOneUserProfile(id: $id){
      upId
      id
      upPhone
      upImage
      upDateBir
      upBloodG
      upAddress
      ctId
      dId
      upZipCode
      cId
      upLatitude
      upLongitude
      user {
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

      }
  }
}
`

export const SET_FAVORITES_STORE = gql`
    mutation setFavorites($data: IFavorites!) {
    setFavorites(input: $data) {
        success
        message
    }
}
`
export const SET_START_STORE = gql`
  mutation setRatingStar($data: IStar!) {
    setRatingStar(input: $data) {
      success 
      message      
  }
}
`

export const GET_ALL_FAV_STORE = gql`
query getFavorite{
  getFavorite{
    fIStoreId
    fState
    createAt
    updateAt
    idStore
    getOneStore {
      idStore
      cId
      id
      ctId
      catStore
      dId
      storeName
      Image
      city{
        ctId
        dId
        cName
      }
      department {
        dId
        cId
        dName
        
      }
      pais {
        cId
        cName
        
      }
    }
  }
}
`
export const GET_ONE_FAV_STORE = gql`
query getOneFavorite($idStore: ID) {
  getOneFavorite(idStore: $idStore) {
    fIStoreId
    fState
    idStore
  }
}
`