import React, { useContext } from 'react'
import { CREATE_NOTIFICATION } from './queries'
import { useMutation } from '@apollo/client'
import { Context } from 'context/Context'
import { RippleButton } from 'components/Ripple'
import InputHooks from 'components/InputHooks/InputHooks'
import { useFormTools } from 'components/BaseForm'
import { Container } from 'components/common/Reusable'
import { Column, Row, Text } from 'components/common/Atoms'

export const Notification = () => {
  const { Location, setAlertBox } = useContext(Context)
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ Notification ~ Location", Location)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [createOneNotification, { data }] = useMutation(CREATE_NOTIFICATION, {
    context: { clientName: 'admin-server' },
    onCompleted: (data) => setAlertBox({ message: data.createOneNotification.message })
  })
  console.log("🚀 ~ file: index.jsx ~ line 18 ~ Notification ~ data", data)
  const sendNotification = () => {
    dataForm?.message?.length >= 0 &&
      createOneNotification(
        {
          variables: { message: dataForm?.message }
        }
      ).then(() => (
        setAlertBox({ message: 'Lo sentimos  a ocurrido un error' })
      ))
    setDataValue({})
  }
  return (
    <Column>
    <Text> {dataForm?.message}</Text>
      <Row margin='20px 0'>
        <InputHooks title='mensaje de notificaciones' required error={errorForm?.message} value={dataForm?.message} onChange={handleChange} name='message' />
        <RippleButton disabled={dataForm?.message?.length <= 0} widthButton='70%' padding='30px' onClick={() => sendNotification()}>Subir</RippleButton>
      </Row>
    </Column>
  )
}
