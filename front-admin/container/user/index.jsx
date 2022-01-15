import React, { useState, useContext } from 'react'
import { RippleButton } from '../../components/Ripple'
import { APColor, BColor, EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import OTPInput from '../../components/OTPInputHook'
import { useMutation } from '@apollo/client'
import { IconArrowLeft } from '../../public/icons'
import { useRouter } from 'next/router'
import { ButtonSubmit, Content, Form, Enlace, Card, Text, GoBack } from './styled'
import { CREATE_USER_SESSION } from './queries'
import { Context } from '../../Context'
import fetchJson from '../../components/hooks/fetchJson'
import { URL_BASE } from '../../apollo/urls'

export const RegisterUser = () => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const router = useRouter()
    const [newRegisterUser, { loading }] = useMutation(CREATE_USER_SESSION)
    const setAlertBox = useContext(Context)
    // console.log(setAlertBox)
    const body = {
        name: dataForm?.email,
        username: dataForm.email,
        lastName: dataForm.email,
        email: dataForm.email,
        password: dataForm.pass,
    }
    const handleForm = (e, show) => handleSubmit({
        event: e,
        action: () => {
            return fetchJson(`${URL_BASE}auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => {
                router.push('/dashboard')
                console.log(res)
            }).catch(e => {
                console.log(e)
            })

        },
        actionAfterSuccess: () => {
            setDataValue({})
        }
    })
    return (
        <Content>
            <Card>
            </Card>
            <Form onSubmit={(e) => handleForm(e)}>
                <GoBack onClick={() => router.back()}>
                    <IconArrowLeft color={`${PLColor}`} size='25px' />
                </GoBack>
                <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
                <InputHooks title='Informa Contraseña.' width='100%' required error={errorForm?.pass} value={dataForm?.pass} onChange={handleChange} name='pass' />
                <RippleButton widthButton='100%' margin='20px auto' type='submit' onClick={() => setStep(1)} bgColor={EColor}>Correo</RippleButton>
            </Form>
        </Content>
    )
}
