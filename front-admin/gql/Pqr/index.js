import { gql } from '@apollo/client'

export const GET_ALL_PQR = gql`
query getPqr{
  pqr{
    hpqrId
    thpId
    hpqrQuestion
    hpqrAnswer
    hpqrState
    hpqrDatCre
    typepqr{
      thpId
      thpName
      thpIcon
      thpState
      thpDatMod
      __typename
    }
  }
}
`