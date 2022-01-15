import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
mutation createDepartments ($input: IDepartment){
  createDepartments(input: $input){
    dId
    cId
    dName
    dState
  }
}
`
// Obtiene los departamentos con los paises
export const GET_DEPARTMENT = gql`
query  departments{
  department{
    dId
    cId
    dName
    dState
  }
}
`
export const GET_DEPARTMENT_ALL = gql`
query department{
  department{
    dId
    cId
    dName
  }
}
`
export const EDIT_DEPARTMENT = gql`
mutation($input: IEditDepartments!){
editDepartments(input: $input){
  dId
    cId
    dName
    dState
}
}
`