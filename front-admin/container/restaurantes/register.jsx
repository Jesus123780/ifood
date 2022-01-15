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
                <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
                <RippleButton widthButton='100%' margin='20px auto' type='button' onClick={() => setStep(1)} bgColor={EColor}>Correo</RippleButton>
            </Form>
        </Content>
    )
}
