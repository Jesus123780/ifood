import { gql } from '@apollo/client';

export const PUSH_RECOMMENDED = gql`
mutation pushOneRecommendation($input:  RecommendationInput) {
  pushOneRecommendation(input: $input) {
    id
    carProId
  }
}
`
export const PUSH_RECOMMENDED_PRODUCT_NAME = gql`
mutation pushOneRecommendationProduct($input:  RecommendationInput) {
  pushOneRecommendationProduct(input: $input) {
    id
    carProId
    
  }
}
`
export const GET_ALL_STORE_RECOMMENDED = gql`
query getAllMatchesStoreRecommended($catStore: ID, $min: Int, $max: Int){
  getAllMatchesStoreRecommended(catStore: $catStore, min: $min, max: $max) {
      idStore
      cId
      id
      ctId
    	catStore
      dId
      storeName
      Image
      city{
        ctId
        dId
        cName
      }
      department {
        dId
        cId
        dName
        
      }
      pais {
        cId
        cName
        
      }
    }
    
}
`


export const GET_ALL_PRODUCT_STORE = gql`
query productFoodsAllRecommended($search: String, $min: Int, $max: Int, $gender: [String], $desc: [String], $categories: [ID], ) {
  productFoodsAllRecommended(search: $search, min: $min, max: $max, gender: $gender, desc: $desc, categories: $categories,) {
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