import { gql } from '@apollo/client'

export const CREATE_FOOD_PRODUCT = gql`
mutation  newRegisterFoodProduct($input: FoodProductInput){
  newRegisterFoodProduct(input: $input){
    success
    message
  }
}
`
export const CREATE_STORE_CALENDAR = gql`
mutation  setStoreSchedule($input: ITstoreSchedule!){
  setStoreSchedule(input: $input){
    schDay
    schHoSta
    schHoEnd
    schState
    
  }
}
`