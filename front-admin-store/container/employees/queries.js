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
    id
    idEmployee
    eSalary
    typeContract
    uEmail
    termContract
    eDatAdm
    eState
  }
}
`