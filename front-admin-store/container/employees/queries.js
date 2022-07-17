import { gql } from '@apollo/client'

export const CREATE_EMPLOYEE = gql`
mutation createEmployee ($input: IEmployee!) {
  createEmployee(input: $input) {
    success
    message
  }
}
`
export const GET_EMPLOYEES = gql`
query employees {
  employees {
    eId
    idStore
    idEmployee
    eSalary
    typeContract
    tpEmail
    termContract
    eDatAdm
    eState
  }
}
`
export const GET_ONE_EMPLOYEES = gql`
query employeeStore($eId: ID){
  employeeStore(eId: $eId){
    eId
    idStore
    id
    idEmployee
    eSalary
    typeContract
    uEmail
    termContract
    eDatAdm
    eState
    tpEmail
  }
}
`
export const DELETE_ONE_EMPLOYEES = gql`
mutation deleteEmployeeStore($eId: ID, $tpId: ID) {
  deleteEmployeeStore(eId: $eId, tpId: $tpId) {
    success
    message
  }
}
`