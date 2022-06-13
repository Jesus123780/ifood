import { gql } from '@apollo/client'

export const GET_ALL_RESTAURANT = gql`
query getAllStoreAdmin($search: String, $min: Int, $max: Int, $dId: ID, $ctId: ID, $cId: ID, $uState: Int){
  getAllStoreAdmin(search: $search, min: $min, max: $max, cId: $cId, ctId:$ctId, dId: $dId uState: $uState) {
    idStore
    cId
    id
    dId
    ctId
    storeOwner
    storeName
    uState
    emailStore
    storePhone
    Image
    banner
    createAt
    uPhoNum
    ULocation
    pais{
      	cId
        cName
        cCalCod
        cState
        cDatCre
        cDatMod
    }
    city {
      ctId
      dId
      cName
      cState
      cDatCre
      cDatMod
    }
    department {
      dId
      cId
      dName
      dState
      dDatCre
      dDatMod
    }
  }
}
`
export const CHANGE_STATE = gql`
  mutation setChangeStatus($idStore: ID, $uState: String) {
  setChangeStatus(idStore: $idStore, uState: $uState){
		success
    message
  }
}
`