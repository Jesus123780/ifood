import { gql } from '@apollo/client';

export const UPDATE_COLOR = gql`
mutation createColor($input: IColor){
  createColor(input: $input){
    colorId
    colorName
    colorState
    colorDatCre
    colorDatMod
  }
}
`
export const GET_ALL_COLOR = gql`
query  getAllColor{
  getAllColor{
    colorId
    colorName
    colorState
    colorDatMod
    colorDatCre
  }
}
`