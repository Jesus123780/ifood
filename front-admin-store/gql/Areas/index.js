import { gql } from '@apollo/client'

export const GET_ALL_AREAS = gql`
query getAreas{
  getAreas{
    aId
    aName
  }
}
`