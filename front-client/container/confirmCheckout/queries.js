import { gql } from '@apollo/client'

export const CREATE_ONE_STORE_PEDIDO = gql`
mutation createOnePedidoStore($input: InputStorePedidos) {
  createOnePedidoStore(input: $input){
    success
    message
  }
}
`
