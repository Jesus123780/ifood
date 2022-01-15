import { gql } from '@apollo/client'

export const CREATE_FOOD_PRODUCT = gql`
mutation  newRegisterFoodProduct($input: FoodProductInput){
  newRegisterFoodProduct(input: $input){
    success
    message
  }
}
`