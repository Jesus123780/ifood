import { gql } from '@apollo/client'

export const CREATE_FEATURES = gql`
mutation createFeature($input: IFeature){
  createFeature(input: $input){
    fId
    thpId
    hpqrQuestion
  }
}		
`
export const CREATE_TYPE_FEATURES = gql`
mutation createFeatureType($input: ITypeFeature){
  createFeatureType(input: $input){
    thpId
    thpName
    thpIcon
  }
}
`
export const GET_TYPE_FEATURES = gql`
query typeFeatures{
  typeFeatures{
    thpId
    thpName
    thpIcon
  }
}
`
export const GET_ALL_FEATURES_ON_PARENT = gql`
query features{
  features{
    thpId
    fId
    hpqrState
    hpqrQuestion
    typeFeature{
      thpId
      thpName
      thpIcon
    }
  }
}
`