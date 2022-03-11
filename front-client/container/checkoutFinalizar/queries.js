import { gql } from "@apollo/client";

export const GET_ALL_PEDIDOS_STATUS = gql`
query getAllPedidoUserFinal($id: ID) {
    getAllPedidoUserFinal(id: $id) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    totalProductsPrice
    pSState
    getOneStore {
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
Image
pais {
  cId
  cName
  
}
city {
  ctId
  cName
  dId
}
department {
  dId
  cId
  dName
  
}
      
    }
    pDatCre
    locationUser
    pDatMod
    getAllPedidoStore{
        pdpId
      	pId
      	idStore
      	ShoppingCard
        pCodeRef
        pPStateP
        payMethodPState
        pPRecoger
        pDatCre
        pDatMod
      	getAllShoppingCard {
          ShoppingCard
          comments
          cantProducts
          pId
        productFood{
          pId
          carProId
          colorId
          idStore
          pName
          ProPrice
          ProDescuento
          ProDescription
          ValueDelivery
          ProImage
          ProStar
          pState
          pDatCre
          pDatMod
        }
      }
    }
  }
}
`