import { gql } from '@apollo/client';

export const CREATE_CAT_STORE = gql`
mutation  registerCategoryStore($input: ICatStore){
  registerCategoryStore(input: $input){
    cState
    catStore
    idUser
    cName
    cDatCre
    cDatMod
    csDescription
  }
}
`
export const GET_ALL_CAT_STORE = gql`
query getAllCatStore{
getAllCatStore{
  catStore
  idUser
  cName
  cState
  cDatCre
  cDatMod
  csDescription
  }
}
`