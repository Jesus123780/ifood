import React, { useContext } from 'react'
import Column from 'components/common/Atoms/Column'
import CreateEmployees from './CreateEmployees'
import ListEmployees from './ListEmployees'
import Row from 'components/common/Atoms/Row'
import { useFormTools } from 'components/BaseForm'
import { useMutation, useLazyQuery } from '@apollo/client'
import { CREATE_EMPLOYEE, DELETE_ONE_EMPLOYEES, GET_EMPLOYEES, GET_ONE_EMPLOYEES } from './queries'
import { useEmployee } from '~/hooks/useEmployee'
import { updateCache } from '~/utils'
import { Context } from '~/context/Context'
import { AwesomeModal } from '~/components/AwesomeModal'
import { useSetState } from '~/hooks/useState'
import { EmployeeProfile } from './EmployeeProfile'

const Employees = () => {
  // STATES
  const { setAlertBox } = useContext(Context)
  const OPENMODALEMPLOYEE = useSetState(false)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  // QUERY
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: (data) => {
      setAlertBox({ message: data.createEmployee.message })
      if (data?.createEmployee?.message === 'el numero de documento ya se encuentra registrado') {
        setForcedError({ ...errorForm, tpNumDoc: true })
      }
    }
  })
  const [employeeStore, { data: dataOneEmployee }] = useLazyQuery(GET_ONE_EMPLOYEES, {
    onError: (error) => {
      setAlertBox({ message: error.message })
    }
  })
  // MUTATION
  const [deleteEmployeeStore] = useMutation(DELETE_ONE_EMPLOYEES, {
    onCompleted: (data) => {
      setAlertBox({ message: data.deleteEmployeeStore.message })
    },
    onError: (error) => { 
      setAlertBox({ message: error.message })
    }
  })
  const [data, { loading, error, fetchMore, setMore, more }] = useEmployee()

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
        }).then((res) => {
          if (res?.data?.createEmployee?.success === true) {
            setDataValue({})
          }
        })
      }
    })
  }
  // EFFECTS
  const hamdleEmployee = ({ employee }) => {
    try {
      const { eId } = employee || {}
      OPENMODALEMPLOYEE.setState(!OPENMODALEMPLOYEE.state)
      employeeStore({
        variables: {
          eId
        }
      })

    } catch (error) {
      setAlertBox({ message: error.message })
    }
  }
  const handleDeleteEmployee = ({ employee }) => {
    try {
      deleteEmployeeStore({
        variables: {
          eId: employee.eId
        }, update: (cache, { data: { deleteOneEmployee } }) => {
          return updateCache({
            cache,
            query: GET_EMPLOYEES,
            nameFun: 'employees',
            dataNew: deleteOneEmployee
          })
        }
      })

    } catch (error) {
      setAlertBox({ message: error.message })
    }
  }
  const propsEmployeesForm = {
    dataForm,
    errorForm,
    handleChange,
    handleSubmit,
    setDataValue,
    setForcedError,
    data,
    loading,
    error,
    fetchMore,
    setMore,
    more,
    hamdleEmployee,
    handleDeleteEmployee,
    handleForm
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
        <AwesomeModal
          footer={false}
          onHide={() => { return OPENMODALEMPLOYEE.setState(false) }}
          show={OPENMODALEMPLOYEE.state}
          title='Crear Empleado'
          zIndex={'9999'}
        >
          <EmployeeProfile {...dataOneEmployee?.employeeStore} />
        </AwesomeModal>
      </Row>
    </Column>
  )
}

Employees.propTypes = {}

export default Employees