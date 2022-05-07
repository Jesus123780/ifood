import { gql } from '@apollo/client'

export const GET_TYPE_PQR = gql`
query getTypePqr{
  typopqr{
    thpId
    thpName
    thpState
    thpIcon
    thpDatCre
    thpDatMod
  }
}
`