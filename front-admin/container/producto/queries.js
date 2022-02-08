import { gql } from '@apollo/client'

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
    }
    
	}
}
`