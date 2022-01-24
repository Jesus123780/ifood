import React, { useState } from 'react'
import { RippleButton } from '../../components/Ripple'
import { APColor, BColor, EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import OTPInput from '../../components/OTPInputHook'
import { useMutation } from '@apollo/client'
import { IconArrowLeft } from '../../public/icons'
import { ButtonSubmit, Content, Form, Enlace, Card, Text, GoBack } from './styled'
import { useRouter } from 'next/router'
import { EMAIL_SESSION } from './queries'
import { URL_BASE } from '../../apollo/urls'
import fetchJson from '../../components/hooks/fetchJson'

export const Email = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [otp, setOTP] = useState(0)
  const [step, setStep] = useState(0)
  const router = useRouter()
  const [registerEmailLogin, { loading }] = useMutation(EMAIL_SESSION)
  const body = {
    email: dataForm.email,
    otp: otp
  }
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (show === 1) {
        return registerEmailLogin({
          variables: {
            input: {
              uEmail: dataForm.email
            }
          }
        })
      } else if (show === 2) {
        return fetchJson(`${URL_BASE}auth/loginConfirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }).then(res => {
          if (res.success === true) {
            console.log(res, 'res')
            router.push('/dashboard')
          }
        }).catch(e => {
          console.log(e, 'error')
        })
      }
    },
    actionAfterSuccess: () => {
      // setDataValue({})
    }
  })
  return (
    <Content>
      <Card>
      </Card>
      <Form onSubmit={(e) => { handleForm(e, step !== 1 ? 1 : 2) }}>
        <GoBack onClick={() => router.back()}>
          <IconArrowLeft color={`${PLColor}`} size='25px' />
        </GoBack>
        <Text size='20px'>{step === 1 ? 'Digita el código de 6 dígitos que enviamos' : 'Infoma tu correo para continuar'}</Text>
        {step === 1 ?
          <>
            <Text color={BColor} size='19px'>{dataForm?.email}</Text>
            <OTPInput autoFocus length={6} isNumberInput className="otpContainer" inputClassName="otpInput" onChangeOTP={(otp) => setOTP(otp)} />
          </>
          :
          <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
        }
        <RippleButton widthButton='100%' margin='20px auto' type={!!dataForm?.email?.length ? 'submit' : 'button'} onClick={() => { !!dataForm?.email?.length && setStep(1) }} bgColor={EColor}>{step === 1 ? 'Correo' : 'Enviar'}</RippleButton>
      </Form>
      {/* <RippleButton widthButton='100%' margin='20px auto' type='button' onClick={() => handleLogin()} bgColor={EColor}>heer Enviar</RippleButton> */}
    </Content>
  )
}
