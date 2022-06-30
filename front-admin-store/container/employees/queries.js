import { gql } from '@apollo/client'

export const CREATE_EMPLOYEE = gql`
mutation createEmployee ($input: IEmployee!) {
  createEmployee(input: $input) {
    success
    message
  }
}
`