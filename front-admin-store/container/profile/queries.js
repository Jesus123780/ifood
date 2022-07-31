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