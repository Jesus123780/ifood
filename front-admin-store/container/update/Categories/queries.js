import { gql } from '@apollo/client'

export const UPDATE_CATEGORIES = gql`
mutation updateCategoryProducts($input: ICategoryProduct){
  updateCategoryProducts(input: $input){
    caId
    cpName
    cpImage
    cpState
  }
}
`
export const GET_ALL_CATEGORIES = gql`
query CategoryProductsAll($search: String, $min: Int, $max: Int) {
  CategoryProductsAll(search: $search, min: $min, max: $max) {
    caId
    cpName
    cpImage
    cpState
    DatCre
    DatMod
    
  }
}
`