import PropTypes from 'prop-types'
import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import React, { useContext } from 'react'
import { RandomCode } from 'utils'
import { CREATE_PROVIDERS, GET_ALL_PROVIDERS } from './queries'
import { useMutation } from '@apollo/client'
import { RippleButton } from 'components/Ripple'
import { Context } from 'context/Context'

export const ProvidersCreate = ({ show, setShow }) => {
  const { setAlertBox } = useContext(Context)

  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [registerProviders] = useMutation(CREATE_PROVIDERS, {
    onCompleted: (data) => {
      setAlertBox({ message: `${data.registerProviders.message}` })
    }
  })
  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      // if (!TotalDeuda, !PrMail) {
      //     setForcedError({ ...errorForm, prName: true, PrNit: true, PrMail: true })
      // }
      const { TotalDeuda, PrMail } = dataForm
      return registerProviders({
        variables: {
          input: {
            ...dataForm,
            PrMail,
            PrCode: RandomCode(9),
            TotalDeuda: parseInt(TotalDeuda)
          }
        }, update(cache) {
          cache.modify({
            fields: {
              getAllProviders(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_PROVIDERS, data: dataOld })
              }
            }
          })
        }
      }).then(() => {
        // setDataValue({})
      })
    }
  })}
  return (
    <AwesomeModal
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      onCancel={() => {return false}}
      onHide={() => {return setShow()}}
      padding='25px'
      show={show}
      size='medium'
      zIndex='9999'
    >
      <form onSubmit={(e) => {return handleForm(e)}}>
        <InputHooks
          email={false}
          error={errorForm?.prName}
          name='prName'
          onChange={handleChange}
          required
          title='Nombre'
          value={dataForm?.prName}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.PrNit}
          name='PrNit'
          numeric
          onChange={handleChange}
          required
          title='Nit del proveedor'
          value={dataForm?.PrNit}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.PrNumberPhone}
          name='PrNumberPhone'
          numeric
          onChange={handleChange}
          title='Numero Teléfono'
          type='text'
          value={dataForm?.PrNumberPhone}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.TotalDeuda}
          name='TotalDeuda'
          numeric
          onChange={handleChange}
          title='¿ Alguna deuda Anterior ?'
          value={dataForm?.TotalDeuda}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.PrNumberIdentity}
          name='PrNumberIdentity'
          numeric
          onChange={handleChange}
          title='Numero de indentidad'
          value={dataForm?.PrNumberIdentity}
          width={'50%'}
        />
        <InputHooks
          dataForm={dataForm}
          email={true}
          error={errorForm?.PrMail}
          name='PrMail'
          onChange={handleChange}
          required
          setDataValue={setDataValue}
          title='Dirección email'
          value={dataForm?.PrMail}
          width={'50%'}
        />
        <RippleButton type='submit' widthButton='100%' >Crear Proveedor</RippleButton>
      </form>
    </AwesomeModal>
  )
}

ProvidersCreate.propTypes = {
  setShow: PropTypes.func,
  show: PropTypes.any
}
