import { gql } from '@apollo/client'

export const GET_ALL_STORY_ACTIVE_MESSAGE_ORDER = gql`
query getAllStoreActiveChat($idStore: ID, $id: ID, $search: String,  $min: Int, $max: Int) {
  getAllStoreActiveChat(idStore: $idStore, id: $id,  search: $search, min: $min, max: $max) {
    id
    idStore
    StaState
    getOneStore {
    idStore
    cId
    dId
    ctId
    catStore
    neighborhoodStore
    Viaprincipal
    storeOwner
    storeName
    emailStore
    storePhone
    socialRaz
    Image
    banner
    documentIdentifier
    uPhoNum
    ULocation
    upLat
    upLon
    uState
    siteWeb
    description
    NitStore
    typeRegiments
    typeContribute
    secVia
    addressStore
    createdAt
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
    cateStore {
      catStore
      idUser
      cName
      cState
      cDatCre
      cDatMod
      csDescription
      
    }
      
    }
  }
}
`