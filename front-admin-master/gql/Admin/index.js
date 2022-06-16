import { gql } from '@apollo/client';

export const GET_ALL_STORE_REPORT = gql`
query getAllStoreAdminReport {
  getAllStoreAdminReport{
    store{
      idStore,
      cId
      dId
      catStore
    }
    count
  }
}
`