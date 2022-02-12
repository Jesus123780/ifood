import { gql } from '@apollo/client'

export const GET_ALL_RESTAURANT = gql`
query getAllStoreInStore($search: String, $min: Int, $max: Int){
  getAllStoreInStore(search: $search, min: $min, max: $max) {
    idStore
    cId
    id
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
    createAt
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
`