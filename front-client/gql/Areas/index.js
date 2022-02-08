import { gql } from '@apollo/client';

export const GET_ALL_AREAS = gql`
query getAreas{
  getAreas{
    aId
    aName
  }
}
`

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