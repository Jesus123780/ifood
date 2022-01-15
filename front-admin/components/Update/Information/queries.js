import { gql } from '@apollo/client';

export const GET_TYPE_PQR = gql`
query typepqr{
  typepqr{
    thpId
    thpName
    thpIcon    
  }
} 
`