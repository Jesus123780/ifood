import { gql } from '@apollo/client'

export const CREATE_ONE_DYNAMIC_PASS = gql`
mutation registerDynamicPassword($input: IDynamicPassword) {
  registerDynamicPassword(input: $input) {
    success
    message
  }
}
`
export const GET_ONE_DYNAMIC_PASS = gql`
query getAOneDynamicPassword {
  getAOneDynamicPassword {
    dPassId
    id
    idStore
    keyPassDynamic
    deviceName
    dState
    DatCre
    DatMod
  }
    
}
`
