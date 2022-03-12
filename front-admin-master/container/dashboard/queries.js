import { gql } from '@apollo/client'

export const CREATE_BANNER_MAIN = gql`
  mutation setBanners($input: IMasterBanners) {
  setBanners(input: $input){
    path
    description
    BannersState
    name
    
  }
}
`
export const CREATE_BANNER_PROMO = gql`
    mutation setPromoBanners($input: IPromoBanners) {
  setPromoBanners(input: $input){
    path
    description
    bpState
    name    
  }
}
`
