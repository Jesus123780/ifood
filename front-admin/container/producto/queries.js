import { gql } from '@apollo/client'

export const EDIT_PRODUCT = gql`
  mutation editProductFoods($input: InputProductFood) {
  editProductFoods(input: $input) {
    success
    message
  }
}
`
export const GET_ONE_PRODUCTS_FOOD = gql`
query productFoodsOne($pId: ID){
    productFoodsOne(pId: $pId ){
        pId
        carProId
        pCode
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
        ValueDelivery
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
      department {
        dId
        cId
        dName
        dDatCre
        dDatMod
        dState
      }
      pais {
        cId
        cName
        cCalCod
        cState
        
      }
      city {
        ctId
        dId
        cName
        cState
        cDatCre
        cDatMod
      }
    }
    
	}
}
`