import React from 'react'
import PropTypes from 'prop-types'
import InputHooks from 'components/InputHooks/InputHooks'
import Row from 'components/common/Atoms/Row'
import { RippleButton } from 'components/Ripple'

const CreateEmployees = ({
  dataForm,
  errorForm,
  handleForm,
  handleChange,
  setDataValue }) => {
  return (
    <Row
      as='form'
      flexWrap='wrap'
      onSubmit={(e) => {return handleForm(e)}}
      width='50%'
    >
      <InputHooks
        email={true}
        error={errorForm?.tpEmail}
        name='tpEmail'
        onChange={handleChange}
        setDataValue={setDataValue}
        title='Ingresa Email'
        value={dataForm?.tpEmail}
      />
      <InputHooks
        error={errorForm?.tpNumDoc}
        name='tpNumDoc'
        numeric
        onChange={handleChange}
        setDataValue={setDataValue}
        title='Ingresa Numero de Documento'
        value={dataForm?.tpNumDoc}
      />
      <InputHooks
        error={errorForm?.eSalary}
        name='eSalary'
        numeric={true}
        onChange={handleChange}
        title='Ingresa Salario'
        value={dataForm?.eSalary}
      />
      <InputHooks
        error={errorForm?.tpLasNam}
        name='tpLasNam'
        onChange={handleChange}
        title='Ingresa Apellido'
        value={dataForm?.tpLasNam}
      />
      <InputHooks
        error={errorForm?.tpPhone}
        name='tpPhone'
        numeric={true}
        onChange={handleChange}
        required={false}
        title='Ingresa Numero de teléfono'
        value={dataForm?.tpPhone}

      />
      <InputHooks
        error={errorForm?.typeContract}
        name='typeContract'
        onChange={handleChange}
        required
        title='Ingresa tipo de contrato'
        value={dataForm?.typeContract}
      />
      <RippleButton widthButton={'100%'}>
        <span>Registrar</span>
      </RippleButton>
    </Row>
  )
}

CreateEmployees.propTypes = {
  dataForm: PropTypes.object,
  errorForm: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  setDataValue: PropTypes.func,
  setForcedError: PropTypes.func
}

export default CreateEmployees