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
    cateStore{
      catStore
      cName
      
    }
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

export const GET_ALL_SHOPPING_CARD = gql`
query getAllShoppingCard{
  getAllShoppingCard{
  ShoppingCard
  cState
  idStore 
  pId
  comments
    productFood{
        pId
        carProId
        sizeId
        colorId
        idStore
        cId
        caId
        dId
        ctId
        tpId
        fId
        pName
        ProPrice
        ProDescuento
        ProUniDisponibles
        ProDescription
        ValueDelivery
        ProProtegido
        ProAssurance
        ProImage
        ProStar
        ProWidth
        ProHeight
        ProLength
        ProWeight
        ProQuantity
        ProOutstanding
        ProDelivery
        ProVoltaje
        pState
        sTateLogistic
        pDatCre
        pDatMod
    }
  cantProducts
  getStore {
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
      pais {
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
}
`

export const GET_ALL_CAT_STORE = gql`
query getAllCatStore{
getAllCatStore{
  catStore
  idUser
  cPathImage
  cName
  cState
  cDatCre
  cDatMod
  csDescription
  }
}
`
