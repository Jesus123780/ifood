import { gql } from '@apollo/client'

export const GET_ALL_PEDIDOS = gql`
query getAllPedidoStoreFinal($idStore: ID) {
  getAllPedidoStoreFinal(idStore: $idStore) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    pSState
    pDatCre
    pDatMod
    totalProductsPrice
    getUser{
       id
      name
      username
      email
      description
      ULocation
      upLon
      upLat
    }
    getAllPedidoStore{
        pdpId
      	pId
        id
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
        id
        pId
        productFood{
          pId
          carProId
          colorId
          idStore
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