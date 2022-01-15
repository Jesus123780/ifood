import { gql } from '@apollo/client';

export const UPDATE_ROAD = gql`
mutation createRoadMutation($input: IRoad!){
  createRoad(input: $input){
    rId
    rName
    rState
    rDatCre
    rDatMod
  }
}
`

export const GET_TYPE_ROAD = gql`
query road {
  road{
    rId
    rName
    rState
    rDatMod
    rDatCre
    
  }
}
`
export const EDIT_MUNICIPALITIES = gql`
mutation cityeditMutation($input: IEditMunicipalities!){
	editMunicipalities(input: $input){
    cId
    dId
    cName
    cState
  }
}
`