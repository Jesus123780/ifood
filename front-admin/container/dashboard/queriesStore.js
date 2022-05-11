import { gql } from '@apollo/client'

export const CREATE_SCHEDULE_STORE = gql`
mutation setStoreSchedule($input: IsStoreSchedule!){
setStoreSchedule(input: $input){
  success
  message
}
}
`
export const GET_SCHEDULE_STORE = gql`
 query getStoreSchedules($schDay: Int, $idStore: ID) {
        getStoreSchedules(schDay: $schDay, idStore: $idStore){
            schId
            idStore
            schDay
            schHoSta
            schHoEnd
            schState
        }
    }
`
export const GET_ONE_SCHEDULE_STORE = gql`
 query getOneStoreSchedules($schDay: Int, $idStore: ID) {
        getOneStoreSchedules(schDay: $schDay, idStore: $idStore){
            schId
            schDay
            schHoSta
            schHoEnd
            schState
        }
    }
`
export const GET_CAT_OF_PRODUCTS = gql`
query getAllCatOfProducts($idStore: ID) {
 getAllCatOfProducts(idStore: $idStore) {
  id
  cpId
  catName
  catDescription
  schState
  
}
}
`
export const REGISTER_CAT_OF_PRODUCTS = gql`
mutation  updatedProducts($input: InputCatProducts){
  updatedProducts(input: $input){
    success
    message
  }
}
`
export const REGISTER_CONTRACT_STORE = gql`
mutation createOneContract($input: InputContractType) {
  createOneContract(input: $input) {
    success
    message
  }
}
`
export const GET_ALL_EMPLOYEE_STORE = gql`
query employees ($umId: ID, $cId: ID, $aId: ID){
   employees(umId: $umId, cId: $cId, aId: $aId) {
    eId
    idStore
    id
    idEmployee
    eSalary
    typeContract
    uEmail
    termContract
    eDatAdm
    eState
    
  }
}
`
export const GET_ALL_PRODUCT_STORE = gql`
query productFoodsAll($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  productFoodsAll(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
    pId
    sizeId #Talla
    colorId #Color
    cId  #Country
    dId  #Department
    ctId  #Cuidad
    fId  #Características
    pName
    ProPrice
    ProDescuento
	  ProUniDisponibles
	  ProDescription
	  ProProtegido
	  ProAssurance
	  ValueDelivery
	  ProStar
    sTateLogistic
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
    pDatCre
    pDatMod
	  ProDelivery
	  ProVoltaje
    pState
    feat {
      fId
      thpId
      hpqrQuestion
    }
    area {
      aId
      aName
    }
    
  }
}

`
export const GET_ALL_RATING_START_STORE = gql`
query getAllRatingStar($idStore: ID){
getAllRatingStar(idStore: $idStore){
  rSId
  rScore
  idStore
  createAt 
  }
}
`
export const GET_ALL_VISITOR_STORE = gql`
query getAllVisitorStore($idStore: ID, $search: String,  $min: Int, $max: Int, $fromDate: DateTime, $toDate: DateTime) {
  getAllVisitorStore(idStore: $idStore, search: $search, min: $min, max: $max, fromDate: $fromDate, toDate: $toDate) {
    visitStoreId
    id
    idStore
    createAt
    updateAt
  }
}
`
export const GET_MIN_PEDIDO = gql`
query getMinPrice($idStore: ID){
getMinPrice(idStore: $idStore)
}
`

export const GET_All_RATING_STORE = gql`
query getAllRating($idStore: ID){
  getAllRating(idStore: $idStore){
  idStore
  rId
  id
  rAppearance
  rTasty
  rGoodTemperature
  rGoodCondition
  rState
  createAt
  updateAt
  }
}
`
export const CREATE_LOGO = gql`
mutation setALogoStore($logo: Upload, $idStore: ID) {
  setALogoStore(logo: $logo, idStore: $idStore) {
    success
    message
  }
}
`
export const CREATE_BANNER_STORE = gql`
mutation registerBanner($input: IBanner) {
  registerBanner(input: $input) {
    success
    message
    
  }
}
`
export const DELETE_ONE_LOGO_STORE = gql`
  mutation deleteALogoStore($idStore: ID, $Image: String) {
  deleteALogoStore(idStore: $idStore, Image: $Image) {
      message
      success
  }

}
`
export const GET_ONE_BANNER_STORE = gql`
query getOneBanners($idStore: ID, $id: ID) {
  getOneBanners(idStore: $idStore, id: $id) {
    bnId
    id
    path
    bnImageFileName
    idStore
    bnState
    createAt
    updateAt
  }
}
`
export const DELETE_ONE_BANNER_STORE = gql`
mutation DeleteOneBanner($bnState: Int, $idStore: ID, $bnId: ID, $bnImage: String, $bnImageFileName: String) {
  DeleteOneBanner(bnState: $bnState, idStore: $idStore, bnId: $bnId, bnImage: $bnImage, bnImageFileName: $bnImageFileName ) {
    success
    message
    
  }
}
`