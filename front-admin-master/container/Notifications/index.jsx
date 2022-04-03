import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CHANGE_STATE, CREATE_NOTIFICATION, GET_ALL_RESTAURANT, UPLOAD_FILE } from './queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSetState } from '../../components/hooks/useState'
import { InputFiles } from 'components/InputFilesPrev'
import { numberFormat, updateCache } from 'utils'
import { Section } from 'components/Table/styled'
import { Table } from 'components/Table'
import { Context } from 'context/Context'
import { RippleButton } from 'components/Ripple'
import InputHooks from 'components/InputHooks/InputHooks'
import { useFormTools } from 'components/BaseForm'
import { Form, Container } from 'components/common/Reusable'

export const Notification = () => {
  const { Location, setAlertBox } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [createOneNotification, { data }] = useMutation(CREATE_NOTIFICATION, {
    context: { clientName: "admin-server" },
    onCompleted: (data) => setAlertBox({ message: data.createOneNotification.message })
  })
  return (
    <Container>
      {dataForm?.message}
      <InputHooks title='message' width='30%' required error={errorForm?.message} value={dataForm?.message} onChange={handleChange} name='message' />
      <RippleButton widthButton='100%' margin='20px auto' onClick={() => createOneNotification({ variables: { message: dataForm?.message } })}>Subir</RippleButton>
    </Container>
  )
}
