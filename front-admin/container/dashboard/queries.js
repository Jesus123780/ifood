import { gql } from '@apollo/client'

export const CREATE_FOOD_PRODUCT = gql`
  mutation  newRegisterFoodProduct($input: FoodProductInput){
    newRegisterFoodProduct(input: $input){
      success
      message
    }
  }
`
export const GET_BANNER_PROMO_DASHBOARD = gql`
query getPromoStoreAdmin{
getPromoStoreAdmin{
    pSoId
    comments
    mainName
    metaTags
    urlImage
    bPromoState
    createAt
    updateAt
  }
}
`

export const CREATE_STORE_CALENDAR = gql`
mutation  setStoreSchedule($input: ITstoreSchedule!){
  setStoreSchedule(input: $input){
    message
    success
  }
}
`
export const DELETE_ONE_CAT_PRODUCTS = gql`
  mutation  deleteCatOfProducts($idPc: ID!, $pState: Int){
  deleteCatOfProducts(idPc: $idPc, pState: $pState){
    success
    message
  }
}
`
export const DELETE_ONE_CAT_PRODUCTS_FINAL = gql`

mutation  deleteCatFinalOfProducts($idPc: ID){
  deleteCatFinalOfProducts(idPc: $idPc){
    success
    message
  }
}
`
export const DELETE_EXTRA_PRODUCTS = gql`
  mutation  deleteextraproductfoods($id: ID, $state: Int){
    deleteextraproductfoods(id: $id, state: $state){
      success, 
      message
  }
}
`
export const EDIT_EXTRA_PRODUCTS = gql`
mutation editExtProductFoods($input: InputExtProductFood!) {
  editExtProductFoods(input: $input) {
    success
    message
  }
}
`
export const DELETE_CAT_EXTRA_PRODUCTS = gql`
  mutation  DeleteExtProductFoodsOptional($opExPid: ID, $state: Int){
    DeleteExtProductFoodsOptional(opExPid: $opExPid, state: $state){
      success, 
      message
  }
}
`
export const DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS = gql`
  mutation  DeleteExtFoodSubsOptional($opSubExPid: ID, $state: Int){
    DeleteExtFoodSubsOptional(opSubExPid: $opSubExPid, state: $state){
      success, 
      message
  }
}
`
export const UPDATE_CAT_IN_PRODUCT = gql`
mutation  updatedCatWithProducts($input: LineItemsIdPro){
  updatedCatWithProducts(input: $input){
    success
    message
  }
}
`
export const GET_ULTIMATE_CATEGORY_PRODUCTS = gql`
query catProductsAll($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  catProductsAll(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
    carProId
    idStore
    pName
    ProDescription
    ProImage
    pState
    pDatCre
    pDatMod
    
  }
}
`
export const GET_ALL_EXTRA_PRODUCT = gql`
query ExtProductFoodsAll($search: String, $min: Int, $max: Int, $pId: ID) {
  ExtProductFoodsAll(search: $search, min: $min, max: $max, pId: $pId) {
    pId
    exPid
    exState
    extraName
    extraPrice
    state
    pDatCre
    pDatMod
  }
}
`
export const GET_ALL_CATEGORIES_WITH_PRODUCT = gql`
query getCatProductsWithProduct($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  getCatProductsWithProduct(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
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