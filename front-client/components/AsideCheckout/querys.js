import { gql } from '@apollo/client'

export const CREATE_SHOPPING_CARD = gql`
mutation  registerShoppingCard($input: IShoppingCard, $idSubArray: IID_SUB_ITEMS){
    registerShoppingCard(input: $input, idSubArray: $idSubArray){
      ShoppingCard
      id
      pId
      subProductsId
      ShoppingCardRefCode
      uuid
      discountCardProduct
      idUser
      cName
      idStore
      cState
      cDatCre
      cDatMod
      csDescription
      cantProducts
      comments
      # idSubArray
  }
}
`