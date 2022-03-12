import { gql } from '@apollo/client';

export const UPDATE_SIZE = gql`
mutation createSize($input: ISizeEdit){
	create(input: $input){
    sizeId
    sizeName
    sizeState
    cDatCre
    cDatMod
  }
}
`
export const GET_ALL_SIZE = gql`
query getSizes {
  getSizes{
    sizeId
    sizeName
    sizeState
    
  }
}
`