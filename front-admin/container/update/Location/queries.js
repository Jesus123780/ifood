import { gql } from '@apollo/client'

export const GET_ONE_PQR = gql`
query product{
  product{
    id
    ProName
    ProDatMod
    ProDatCre
    ProPrice
    ProDescuento
    ProImage
    ProWidth
    ProHeight
    ProLength
    ProQuantity
    ProDatMod
    ProDatCre
    ProDelivery
    ProState
    ProOutstanding
    ProUniDisponibles
  }
}
`
export const REGISTER_ONE_PRODUCT = gql`
	mutation createProductsMutations($input: IProduct!){
    createProduct(input: $input){
    id
    ProName
    ProDatMod
    ProDatCre
    ProPrice
    ProDescuento
    ProImage
    ProWidth
    ProHeight
    ProLength
    ProQuantity
    ProDatMod
    ProDatCre
    ProDelivery
    ProState
    ProOutstanding
    ProUniDisponibles
    ProDescription
    }
  }  
`