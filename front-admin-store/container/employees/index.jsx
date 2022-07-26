import React, { useContext } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useFormTools } from 'components/BaseForm'
import Column from 'components/common/Atoms/Column'
import Row from 'components/common/Atoms/Row'
import { AwesomeModal } from '~/components/AwesomeModal'
import { Context } from '~/context/Context'
import { useEmployee } from '~/hooks/useEmployee'
import { useSetState } from '~/hooks/useState'
import { updateCache } from '~/utils'
import CreateEmployees from './CreateEmployees'
import { EmployeeProfile } from './EmployeeProfile'
import ListEmployees from './ListEmployees'
import { CREATE_EMPLOYEE, DELETE_ONE_EMPLOYEES, GET_EMPLOYEES, GET_ONE_EMPLOYEES } from './queries'
import AuthPassthrough from '../services/auth'
import { RippleButton } from '~/components/Ripple'

const Employees = () => {
  // STATES
  const { setAlertBox } = useContext(Context)
  const OPEN_MODAL_EMPLOYEE = useSetState(false)
  const OPEN_MODAL_AUTH = useSetState(false)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  // QUERY
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: res => {
      setAlertBox({ message: res.createEmployee.message })
      if (res?.createEmployee?.message === 'el numero de documento ya se encuentra registrado') {
        setForcedError({ ...errorForm, tpNumDoc: true })
      }
    }
  })
  const [employeeStore, { data: dataOneEmployee }] = useLazyQuery(GET_ONE_EMPLOYEES, {
    onError: e => {
      setAlertBox({ message: e.message })
    }
  })
  // MUTATION
  const [deleteEmployeeStore] = useMutation(DELETE_ONE_EMPLOYEES, {
    onCompleted: response => {
      setAlertBox({ message: response.deleteEmployeeStore.message })
    },
    onError: err => {
      setAlertBox({ message: err.message })
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
  const handleEmployee = ({ employee }) => {
    try {
      const { eId } = employee || {}
      OPEN_MODAL_EMPLOYEE.setState(!OPEN_MODAL_EMPLOYEE.state)
      employeeStore({
        variables: {
          eId
        }
      })

    } catch (errors) {
      setAlertBox({ message: errors.message })
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

    } catch (e) {
      setAlertBox({ message: e.message })
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
    handleEmployee,
    handleDeleteEmployee,
    handleForm
  }

  return (
    <Column
      margin={'0 auto'}
      maxWidth={'1366px'}
      width={'100%'}
    >
      <RippleButton onClick={() => { return OPEN_MODAL_AUTH.setState(!OPEN_MODAL_AUTH.state) }}>
        Abrir
      </RippleButton>
      <Row>

        <CreateEmployees
          {...propsEmployeesForm}
        />
        <ListEmployees
          {...propsEmployeesForm}
        />
        <AwesomeModal
          footer={false}
          onHide={() => { return OPEN_MODAL_EMPLOYEE.setState(false) }}
          show={OPEN_MODAL_EMPLOYEE.state}
          title='Crear Empleado'
          zIndex={'9999'}
        >
          <EmployeeProfile {...dataOneEmployee?.employeeStore} />
        </AwesomeModal>
      </Row>
      <AwesomeModal
        footer={false}
        header={false}
        height={'500px'}
        onHide={() => { return OPEN_MODAL_AUTH.setState(false) }}
        show={OPEN_MODAL_AUTH.state}
        size='400px'
        zIndex={'9999'}
      >
        <AuthPassthrough />
      </AwesomeModal>

    </Column>
  )
}

Employees.propTypes = {}

export default Employees