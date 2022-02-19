import { gql } from '@apollo/client'

export const CREATE_ONE_STORE = gql`
mutation  newRegisterStore($input: IStore){
  newRegisterStore(input: $input){
    success
    message
    idStore
  }
}
`
export const GET_ONE_STORE = gql`
query productFoodsOne($pId: ID){
    productFoodsOne(pId: $pId ){
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
        ExtProductFoodsAll {
          pId
          exPid
          exState
          extraName
          extraPrice
          state
          pDatCre
          pDatMod
    	}
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
}
`
export const GET_ONE_STORE_BY_ID = gql`
query getOneStore($StoreName: String, $idStore: ID){
  getOneStore(idStore: $idStore, StoreName: $StoreName) {
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
export const GET_ALL_CATEGORIES_WITH_PRODUCT = gql`
query getCatProductsWithProductClient($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], $carProId: ID $idStore: ID ) {
  getCatProductsWithProductClient(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories, carProId: $carProId idStore: $idStore) {
    carProId
    pState
    pState
    ProImage
    idStore
    pName
    ProDescription
    ProImage
    pState
    pDatCre
    pDatMod
    productFoodsAll {
         pId
        sizeId
        colorId
        carProId
        cId
        dId
        ValueDelivery
        ctId
        idStore
        caId
        fId
        pName
        ProPrice
        ProDescuento
        ProUniDisponibles
        ProDescription
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
    
  }
}
`
export const GET_EXTRAS_PRODUCT_FOOD_OPTIONAL = gql`
query ExtProductFoodsOptionalAll($search: String, $min: Int, $max: Int, $pId: ID) {
  ExtProductFoodsOptionalAll(search: $search, min: $min, max: $max, pId: $pId) {
      pId
      opExPid
      OptionalProName
      state
      code
      numbersOptionalOnly
      pDatCre
      required
      pDatMod
    ExtProductFoodsSubOptionalAll {
        pId
        opExPid
        idStore
        opSubExPid
        OptionalSubProName
        exCodeOptionExtra
        exCode
        state
        pDatCre
        pDatMod
    }
    
  }
}
`
export const GET_ONE_PRODUCTS_FOOD = gql`
query productFoodsOne($pId: ID){
    productFoodsOne(pId: $pId ){
        pId
        carProId
        sizeId
        colorId
        idStore
        cId
        caId
        dId
        ctId
        ValueDelivery
        tpId
        fId
        pName
        ProPrice
        ProDescuento
        ProUniDisponibles
        ProDescription
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
        ExtProductFoodsAll {
          pId
          exPid
          exState
          extraName
          extraPrice
          state
          pDatCre
          pDatMod
    	}
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
}
`