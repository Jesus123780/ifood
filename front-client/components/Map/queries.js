import { gql } from '@apollo/client'

export const SAVE_LOCATION_USER = gql`
mutation updateUserLocations($input: InputUserLocation) {
  updateUserLocations(input: $input) {
    locationId
    id
    cId
    dId
    ctId
    uLatitud
    uLongitude
    uLocationKnow
    uPiso
    DatCre
    DatMod
  }
}
`
export const DELETE_ONE_LOCATIONS = gql`
  mutation deleteUserLocations($locationId: ID, $uLocationState: Int) {
  deleteUserLocations(locationId: $locationId, uLocationState:$uLocationState) {
    success
    message
  }
}
`
export const GET_ALL_LOCATIONS = gql`

query getUserLocations {
  getUserLocations {
    locationId
    # id
    cId
    dId
    ctId
    uLatitud
    uLongitude
    uLocationKnow
    uPiso
    DatCre
    DatMod
       pais {
        cId
        cName
        cCalCod
        cState
        cDatCre
        cDatMod
      }
      city {
        ctId
        dId
        cName
        cState
        cDatCre
        cDatMod
      } 
      department {
        dId
        cId
        dName
        dState
        dDatCre
        dDatMod
      }
  }
}
`
