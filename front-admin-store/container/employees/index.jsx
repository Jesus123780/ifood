import React from 'react'
import Column from 'components/common/Atoms/Column'
import CreateEmployees from './CreateEmployees'
import ListEmployees from './ListEmployees'
import Row from 'components/common/Atoms/Row'
import { useFormTools } from 'components/BaseForm'
import { useMutation } from '@apollo/client'
import { CREATE_EMPLOYEE, GET_EMPLOYEES } from './queries'
import { useEmployee } from '~/hooks/useEmployee'
import { updateCache } from '~/utils'

const Employees = () => {
  // STATES
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  // QUERY
  const [createEmployee] = useMutation(CREATE_EMPLOYEE)
  const [data, { loading, error, fetchMore, setMore, more }] = useEmployee()
  // useEffect


  // HANDLESS
  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        return createEmployee({
          variables: {
            input: {
              aId: '',
              ...dataForm,
              eSalary: parseFloat(dataForm?.eSalary)
            }
          },
          update: (cache, { data: { employees } }) => {
            return updateCache({
              cache,
              query: GET_EMPLOYEES,
              nameFun: 'employees',
              dataNew: employees
            })
          }
        }).then(() => {
          // setDataValue({})
        })
      }
    })
  }
  const propsEmployeesForm = {
    dataForm,
    errorForm,
    handleChange,
    handleSubmit,
    handleForm,
    setDataValue,
    setForcedError,
    data,
    loading,
    error,
    fetchMore,
    setMore,
    more
  }
  return (
    <Column>
      <Row>
        <CreateEmployees
          {...propsEmployeesForm}
        />
        <ListEmployees
          {...propsEmployeesForm}
        />
      </Row>
    </Column>
  )
}

Employees.propTypes = {}

export default Employees