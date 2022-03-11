import React, { useState, useContext, useEffect } from 'react'
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
import { Context } from '../../context/Context'
import fetchJson from '../../components/hooks/fetchJson'
import { URL_BASE } from '../../apollo/urls'
import { decodeToken, hiddenEmail } from 'utils'

export const RegisterUser = () => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const router = useRouter()
    const [newRegisterUser, { loading }] = useMutation(CREATE_USER_SESSION)
    const [locationFormat, setLocationFormat] = useState('')
    const { setAlertBox } = useContext(Context)
    const body = {
        name: dataForm?.email,
        username: dataForm.email,
        lastName: dataForm.email,
        email: dataForm.email,
        password: dataForm.pass,
        locationFormat: 'galapa',
        useragent: 'window.navigator.userAgent',
        deviceid: '234232342423423asdasd',
    }
    const handleForm = (e) => handleSubmit({
        event: e,
        action: () => {
            return fetchJson(`${URL_BASE}auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => {
                setAlertBox({ message: `${res.message}`, color: 'success' })
                const decode = decodeToken(res?.token)
                localStorage.setItem('userlogin', JSON.stringify(decode))
                console.log(decode)
                if (res?.storeUserId) {
                    const { idStore, id } = res?.storeUserId
                    localStorage.setItem('restaurant', idStore)
                    localStorage.setItem('usuario', id)
                    localStorage.setItem('session', res.token)
                    router.push('/dashboard')
                } else {
                    router.push('/restaurante')
                }
            }).catch(e => {
            })

        },
        actionAfterSuccess: () => {
            setDataValue({})
        }
    })
    const [email, setEmail] = useState('')
    useEffect(() => {
        const dataLocalStorage = localStorage.getItem('userlogin')
        const dataUser = JSON.parse(dataLocalStorage) || {}
        setEmail(dataUser.username)
    }, [email])
    return (
        <Content>
            <Card>
            </Card>
            <Form onSubmit={(e) => handleForm(e)}>
                <GoBack onClick={() => router.back()}>
                    <IconArrowLeft color={`${PLColor}`} size='25px' />
                </GoBack>
                {email !== '' &&
                    <div>
                        <h2>quieres iniciar session nuevamente con :</h2>
                        <span>{email && hiddenEmail(email)}</span>
                    </div>
                }
                <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
                <InputHooks title='Informa Contraseña.' width='100%' required error={errorForm?.pass} value={dataForm?.pass} onChange={handleChange} name='pass' />
                <RippleButton widthButton='100%' margin='20px auto' type='submit' onClick={() => setStep(1)} bgColor={EColor}>Correo</RippleButton>
            </Form>
        </Content>
    )
}
