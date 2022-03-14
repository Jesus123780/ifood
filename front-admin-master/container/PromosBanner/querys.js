import { gql } from '@apollo/client';

export const DELETE_BANNERS = gql`
  mutation deleteOneBannerPromo($bpId: ID, $bpState: Int, $path: String) {
  deleteOneBannerPromo(bpId: $bpId, bpState: $bpState,  path: $path){
    success
    message
    
  }
}
`
export const DELETE_BANNERS_MASTER = gql`
  mutation deleteOneBannerMaster($BannerId: ID, $BannersState: Int, $path: String) {
  deleteOneBannerMaster(BannerId: $BannerId, BannersState: $BannersState, path: $path){
    success
    message
    
  }
}
`
