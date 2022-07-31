import { gql } from '@apollo/client'

export const SAVE_LOCATION_USER = gql`
mutation saveLocation($country: String, $lat: Float, $long: Float) {
  saveLocation(country: $country, lat: $lat,  long: $long) {
    success
    message
  }
}
`
