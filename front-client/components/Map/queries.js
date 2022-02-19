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
export const GET_ALL_LOCATIONS = gql`
query getUserLocations {
  getUserLocations {
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
