import { gql } from '@apollo/client';

export const GET_ALL_BANNERS = gql`
query getAllMasterBanners($search: String, $min: Int, $max: Int) {
  getAllMasterBanners(search: $search, min: $min, max: $max) {
    path
    BannerId
    name
    description
    BannersState
    createAt
    updateAt
  }
}
`
export const GET_ALL_BANNERS_PROMO = gql`
query getAllPromoBanners($search: String, $min: Int, $max: Int) {
  getAllPromoBanners(search: $search, min: $min, max: $max) {
    path
    bpId
    description
    createAt
    name 
    updateAt
  }
}
`