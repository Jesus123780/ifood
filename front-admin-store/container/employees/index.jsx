import React from 'react'
import Column from 'components/common/Atoms/Column'
import CreateEmployees from './CreateEmployees'
import ListEmployees from './ListEmployees'
import Row from 'components/common/Atoms/Row'
import { useFormTools } from 'components/BaseForm'
import { useMutation } from '@apollo/client'
import { CREATE_EMPLOYEE } from './queries'

const Employees = () => {
  // STATES
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  // QUERY
  const [createEmployee] = useMutation(CREATE_EMPLOYEE)
  // useEffect


  // HANDLESS
  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        return createEmployee({
          variables: {
            input: {
              ...dataForm
            }
          }
          // update: (cache, { data: { getAllClients } }) => {
          //   return updateCache({
          //     cache,
          //     query: GET_ALL_CLIENTS,
          //     nameFun: 'getAllClients',
          //     dataNew: getAllClients
          //   })
          // }
        }).then(() => {
          setDataValue({})
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
    setForcedError
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