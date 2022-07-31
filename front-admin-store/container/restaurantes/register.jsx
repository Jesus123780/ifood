import React, { useState } from 'react'
import { RippleButton } from '../../components/Ripple'
import { APColor, BColor, EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import { useRouter } from 'next/router'
import { ButtonSubmit, Content, Form, Enlace, Card, Text, GoBack } from './styled'

export const RegisterRestaurant = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [step, setStep] = useState(0)
  const router = useRouter()
  return (
    <Content>
      <Form>
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Informa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return setStep(1)}}
          type='button'
          widthButton='100%'
        >Correo</RippleButton>
      </Form>
    </Content>
  )
}
