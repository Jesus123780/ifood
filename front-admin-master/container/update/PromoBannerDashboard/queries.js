import { gql } from '@apollo/client';

export const CREATE_BANNER_PROMO_DASHBOARD = gql`
mutation createAPromoBanner($input: IPromoStoreAdmin!) {
  createAPromoBanner(input: $input) {
    success
    message
    
  }
}
`
export const GET_BANNER_PROMO_DASHBOARD = gql`
query getPromoStoreAdmin{
getPromoStoreAdmin{
    pSoId
    comments
    mainName
    metaTags
    urlImage
    bPromoState
    createAt
    updateAt
  }
}
`
