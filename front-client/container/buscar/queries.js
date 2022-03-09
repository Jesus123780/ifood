import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS_SEARCH = gql`
query getAllMatchesProducts($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  getAllMatchesProducts(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
   	id
  	pfId
    idStore
    ProPrice
    ProDescuento
    ProDescription
    pName
    pState
    sTateLogistic
    ProStar
    ProImage
    ProHeight
    ProWeight
    ProOutstanding
    ProDelivery
    pDatCre
    pDatMod
  }
}
`
export const GET_ALL_STORE_SEARCH = gql`
query getAllMatchesStore($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  getAllMatchesStore(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
    idStore
    cId
    id
    dId
    ctId
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
    getAllRatingStar {
      rSId
      rScore
      idStore
      createAt
      
    }
  }
}
`
