import { gql } from '@apollo/client';

export const UPDATE_COUNTRIES = gql`
mutation createCountry($input:  ICountry){
  createCountry(input: $input){
    cId
    cName
    cCalCod
    cState
  }
}
`

export const GET_COUNTRY = gql`
query  countries{
  countries{
    cId
    cName
    cCalCod
    cState
    cDatCre
    cDatMod
  }
}
`

export const EDIT_COUNTRIES = gql`
mutation($input: IEditCountries!){
  editCountries(input: $input){
    cId
    cName
    cCalCod
    cState
}
}
`
// No se esta usando
export const GET_ONE_COUNTRIES = gql`
query getOneCountry($c_calCod: String, $c_id: ID){
 getOneCountry(c_calCod: $c_calCod, c_id: $c_id ){
  c_name
  c_calCod
  c_state
  c_id
  
}
}
`
// No se esta usando
export const DELETE_ONE_COUNTRIES = gql`
mutation deleteCountries($input: IDeleteCountries!){
  deleteCountries(input: $input){
    cId
    cName
    cState
  }
}
`