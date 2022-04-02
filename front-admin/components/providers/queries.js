import { gql } from '@apollo/client'

export const CREATE_PROVIDERS = gql`
mutation registerProviders($input: IProviders) {
  registerProviders(input: $input) {
    success
    message
  }
}
`
export const GET_ALL_PROVIDERS = gql`
query getAllProviders($idStore: ID,$search: String, $min: Int, $max: Int $fromDate: DateTime, $toDate: DateTime ) {
  getAllProviders(idStore: $idStore, search: $search, min: $min, max: $max, toDate: $toDate, fromDate: $fromDate) {
    idProvider
    idStore
    prImage
    prPathImage
    PrNit
    prName
    PrNumberPhone
    PrNumberIdentity
    PrAdres
    PrMail
    TotalBysPr
    TotalDeuda
    prState
    DatCre
    DatMod
  }
}
`
