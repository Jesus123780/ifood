import { gql } from '@apollo/client'

export const GET_ONE_CONTRACT = gql`
query getOneCOntractStore ($StoreName: String, $idStore: ID) {
  getOneCOntractStore(StoreName: $StoreName, idStore:$idStore) {
    ctrId
    idStore
    ctCode
    catDescription
    createAt
    updateAt
    
  }
}
`