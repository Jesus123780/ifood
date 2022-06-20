import { gql } from '@apollo/client';

export const GET_ALL_STORE_REPORT = gql`
query getAllStoreAdminReport {
  getAllStoreAdminReport{
    inActiveStore {
      idStore,
      cId
      dId
      catStore
    }
    store{
      idStore,
      cId
      dId
      catStore
    }
    count
    countInActive
  }
}
`
export const GET_ALL_USER_REPORT = gql`
query getAllUserActives {
  getAllUserActives{
    usersInActives {
            id	
      name
      username
      lastName
      email
      uToken
      uPhoNum
      ULocation
      upLat
      createAt
      avatar
      role {
        id
        name
      }
    }
    users{
      id	
      name
      username
      lastName
      email
      uToken
      uPhoNum
      ULocation
      upLat
      createAt
      avatar
      role {
        id
        name
      }
    }
    countInActive
    count
  }
}
`