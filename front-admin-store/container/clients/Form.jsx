import React, { useState } from 'react'
import { useFormTools } from '~/components/BaseForm'
import { CREATE_CLIENTS, GET_ALL_CLIENTS } from './queries'
import { useMutation } from '@apollo/client'
import { updateCache } from '~/utils'
import InputHooks from '~/components/InputHooks/InputHooks'
import { RippleButton } from '~/components/Ripple'
import Column from '~/components/common/Atoms/Column'
import { Checkbox } from '~/components/Checkbox'

export const FormClients = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, errorSubmit }] = useFormTools()
  const [createClients] = useMutation(CREATE_CLIENTS)
  const [setCheck, setChecker] = useState({
    gender: 1
  })
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
  }
  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        if (!errorSubmit) {
          return createClients({
            variables: {
              input: {
                ...dataForm,
                gender: setCheck.gender
              }
            },
            update: (cache, { data: { getAllClients } }) => {
              return updateCache({
                cache,
                query: GET_ALL_CLIENTS,
                nameFun: 'getAllClients',
                dataNew: getAllClients
              })
            }
          }).then(() => {
            setDataValue({})
          })

        }
      }
    })
  }
  return (
    <>
      <Column position='relative'>
        <>
          <Checkbox
            checked={!!setCheck?.gender && setCheck?.gender === 1}
            disabled={false}
            id='gender'
            label={setCheck?.gender === 1 ? 'Femenino' : 'Masculino'}
            name='gender'
            onChange={(e) => { return handleCheck(e) }}
            value={setCheck?.gender}
          />
          <input
            name='gender'
            onChange={(e) => { return handleCheck(e) }}
            style={{ backgroundColor: 'transparent', opacity: '0', border: '1px solid', position: 'absolute', top: '5px'}}
            type='checkbox'
            value={setCheck.gender}
          />
        </>
      </Column>
      <Column
        as='form'
        display='flex'
        flexWrap='wrap'
        onSubmit={(e) => { return handleForm(e) }}
      >
        <InputHooks
          error={errorForm?.clientName}
          name='clientName'
          onChange={handleChange}
          required
          title='Nombre'
          value={dataForm?.clientName}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.clientLastName}
          name='clientLastName'
          onChange={handleChange}
          required
          title='Apellido'
          value={dataForm?.clientLastName}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.ClientAddress}
          name='ClientAddress'
          onChange={handleChange}
          required
          title='Dirección'
          value={dataForm?.ClientAddress}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.ccClient}
          name='ccClient'
          numeric
          onChange={handleChange}
          required
          title='# Identidad'
          value={dataForm?.ccClient}
          width={'50%'}

        />
        <InputHooks
          error={errorForm?.clientNumber}
          name='clientNumber'
          numeric
          onChange={handleChange}
          required
          title='Numero de celular'
          value={dataForm?.clientNumber}
          width={'50%'}
        />
        <RippleButton type='submit' widthButton='100% ' >Guardar</RippleButton>
      </Column>
    </>
  )
}
