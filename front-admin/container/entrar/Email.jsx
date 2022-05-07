import React, { useState } from 'react'
import { RippleButton } from '../../components/Ripple'
import { APColor, BColor, EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import OTPInput from '../../components/OTPInputHook'
import { useMutation } from '@apollo/client'
import { IconArrowLeft } from '../../public/icons'
import { ButtonSubmit, Content, Form, Card, Text, GoBack } from './styled'
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
  const handleForm = (e, show) => {return handleSubmit({
    event: e,
    action: () => {
      if (show === 2) {
        return registerEmailLogin({
          variables: {
            input: {
              uEmail: dataForm.email
            }
          }
        })
      } else if (show === 1) {
        return fetchJson(`${URL_BASE}auth/loginConfirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }).then(res => {
          if (res.success === true) {
            window.localStorage.setItem('restaurant', res?.idStore)
            // router.push('/dashboard')
          }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        }).catch(() => {
        })
      }
    },
    actionAfterSuccess: () => {
      // setDataValue({})
    }
  })}
  return (
    <Content>
      <Card>
      </Card>
      <Form onSubmit={(e) => { handleForm(e, step === 0 ? 0 : 1) }}>
        <GoBack onClick={() => {return router.back()}}>
          <IconArrowLeft color={`${PLColor}`} size='25px' />
        </GoBack>
        <Text size='20px'>{step === 1 ? 'Ingrese el código de 6 dígitos que enviamos' : 'Infoma tu correo para continuar'}</Text>
        {step === 1 ?
          <>
            <Text color={BColor} size='19px'>{dataForm?.email}</Text>
            <OTPInput
              autoFocus
              className='otpContainer'
              inputClassName='otpInput'
              isNumberInput
              length={6}
              onChangeOTP={(otp) => {return setOTP(otp)}}
            />
          </>
          :
          <InputHooks
            email
            error={errorForm?.email}
            name='email'
            onChange={handleChange}
            required
            title='Informa tu correo.'
            value={dataForm?.email}
            width='100%'
          />
        }
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => { !!dataForm?.email?.length && setStep(1) }}
          type={dataForm?.email?.length ? 'submit' : 'button'}
          widthButton='100%'
        >{step === 1 ? 'Correo' : 'Enviar'}</RippleButton>
      </Form>
      {/* <RippleButton widthButton='100%' margin='20px auto' type='button' onClick={() => handleLogin()} bgColor={EColor}>heer Enviar</RippleButton> */}
    </Content>
  )
}
