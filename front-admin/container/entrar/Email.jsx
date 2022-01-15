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

export const Email = () => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const router = useRouter()
    const [registerEmailLogin, { loading }] = useMutation(EMAIL_SESSION)

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
          }
        },
        actionAfterSuccess: () => {
          setDataValue({})
        }
      })
    return (
        <Content>
            <Card>
            </Card>
            <Form  onSubmit={(e) => handleForm(e, 1)}>
                <GoBack onClick={() => router.back()}>
                    <IconArrowLeft color={`${PLColor}`} size='25px' />
                </GoBack>
                <Text size='20px'>{step === 1 ? 'Digita el código de 6 dígitos que enviamos' : 'Infoma tu correo para continuar'}</Text>
                {step === 1 && dataForm?.email && <Text color={BColor} size='19px'>{dataForm?.email}</Text>}
                {step === 1 ?
                    <OTPInput autoFocus length={6} isNumberInput className="otpContainer" inputClassName="otpInput" onChangeOTP={(otp) => console.log("String OTP: ", otp)} />
                    :
                    <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
                }
                <RippleButton widthButton='100%' margin='20px auto' type='submit' onClick={() => setStep(1)} bgColor={EColor}>{step !== 1 ? 'Correo' : 'Enviar'}</RippleButton>
            </Form>
        </Content>
    )
}
