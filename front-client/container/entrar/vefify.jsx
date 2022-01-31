import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ButtonSubmit, Content, Form, Enlace, Card, Text } from './styled'
import { RippleButton } from '../../components/Ripple'
import { APColor, EColor } from '../../public/colors'
import ActiveLink from '../../components/common/Link'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import OTPInput from '../../components/OTPInputHook'
import { useRouter } from 'next/router'
import { decodeToken, getTokenState } from '../../utils'

export const EmailVerifyCode = ({ code }) => {
    const router = useRouter()
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const tokenState = getTokenState(code)
    const decode = decodeToken(code)
    let str = decode?.code.toString();
    let arr = Object.assign([], str);
    const array = arr
    if (tokenState?.needRefresh === true) {
        return <span>The link has expired</span>
    } else if (!tokenState?.valid) {
        return <span>The link is not valid</span>
    } else if (!tokenState) {
        return router.push('/entrar')
    } else return (
        <Content>
            <Card>
            </Card>
            <Form>
                <Text size='15px'>Hola {decode?.uEmail}</Text>
                <OTPInput
                    autoFocus
                    length={6}
                    arrayCode={array}
                    isNumberInput
                    className="otpContainer"
                    inputClassName="otpInput"
                    onChangeOTP={(otp) => console.log("String OTP: ", otp)}
                />
                <RippleButton widthButton='100%' margin='20px auto' type='button' onClick={() => setStep(1)} bgColor={EColor}>Continuar</RippleButton>
                <Text size='15px'>No recibí mi código</Text>
            </Form>
        </Content>
    )
}

