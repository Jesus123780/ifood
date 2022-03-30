import { gql } from '@apollo/client'

export const GET_ALL_SALES = gql`
query getAllSalesStore($idStore: ID,$search: String, $min: Int, $max: Int $fromDate: DateTime, $toDate: DateTime ) {
  getAllSalesStore(idStore: $idStore, search: $search, min: $min, max: $max, toDate: $toDate, fromDate: $fromDate) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    totalProductsPrice
    pSState
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
export const GET_ALL_SALES_STATISTICS = gql`
query getAllSalesStoreStatistic($idStore: ID,$search: String, $min: Int, $max: Int $fromDate: DateTime, $toDate: DateTime ) {
  getAllSalesStoreStatistic(idStore: $idStore, search: $search, min: $min, max: $max, toDate: $toDate, fromDate: $fromDate) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    totalProductsPrice
    pSState
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

export const GET_ONE_SALES = gql`
query getOneSalesStore($pCodeRef: String) {
  getOneSalesStore(pCodeRef: $pCodeRef) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    totalProductsPrice
    pSState
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