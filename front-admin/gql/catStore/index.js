import { gql } from '@apollo/client'

export const CREATE_CAT_STORE = gql`
mutation  registerCategoryStore($input: ICatStore){
  registerCategoryStore(input: $input){
    cState
    cName
    cPathImage
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
  cPathImage
  cDatMod
  csDescription
  }
}
`
export const SET_DES_CAT = gql`
    mutation desCategoryStore($catStore: ID, $cState: Int) {
      desCategoryStore(catStore: $catStore, cState: $cState)
    }
`