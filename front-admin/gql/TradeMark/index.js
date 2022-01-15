import { gql } from '@apollo/client';

export const GET_ALL_MARK = gql`
query getAllMark{
  trademarkAll{
    tId
    Name
    Icon
    DatCre
    DatMod
    __typename
  }
}
`