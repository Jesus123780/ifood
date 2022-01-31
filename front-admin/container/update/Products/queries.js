import { gql } from '@apollo/client';

export const GET_ALL_PQR = gql`
query getOnePqr($hpqrId: ID, $thpId: ID){
  getOnePqr(hpqrId: $hpqrId, thpId: $thpId ){
    hpqrId
    thpId
    hpqrQuestion
  }
}
`
export const GET_ONE_COLOR = gql`
query getAllColor{
  getAllColor{
    colorId
    colorName
    colorState
  }
}
`
export const UPDATE = gql`
mutation updateProducts($input: InputProduct){
  updateProducts(input: $input){
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
	  ProStar
	  pState
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
	  ProDelivery
	  ProVoltaje
  }
}
`
export const UPDATE_PRODUCT_FOOD = gql`
mutation updateProductFoods($input: InputProductFood){
  updateProductFoods(input: $input){
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
	  ProStar
	  pState
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
	  ProDelivery
	  ProVoltaje
  }
}
`
export const DELETE_ONE_PRODUCT = gql`
mutation deleteProducts($input: IDeleteProduct){
  deleteProducts(input: $input){
    pId
  }
}
`
export const GET_ALL_PRODUCTS = gql`
query productsAll($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  productsAll(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
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
	  ProStar
    sTateLogistic
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
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
// QUERY -- Busca a todos los usuarios
export const SEARCH_PRODUCTS = gql`
query searchProduct($searchProduct: String, $min: Int, $max: Int){
  searchProduct(searchProduct:  $search, min: $min, max: $max){
    pName
    ProPrice
    ProDescription
  }
}  		
`
export const GET_ALL_FOOD_PRODUCTS = gql`
query getFoodAllProduct($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
 getFoodAllProduct(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
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