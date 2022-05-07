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
    deviceid: '234232342423423asdasd'
  }
  const handleForm = (e) => {return handleSubmit({
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
  })}
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
      <Form onSubmit={(e) => {return handleForm(e)}}>
        <GoBack onClick={() => {return router.back()}}>
          <IconArrowLeft color={`${PLColor}`} size='25px' />
        </GoBack>
        {email !== '' &&
                    <div>
                      <h2>quieres iniciar session nuevamente con :</h2>
                      <span>{email && hiddenEmail(email)}</span>
                    </div>
        }
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Informa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        <InputHooks
          error={errorForm?.pass}
          name='pass'
          onChange={handleChange}
          required
          title='Informa Contraseña.'
          value={dataForm?.pass}
          width='100%'
        />
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return setStep(1)}}
          type='submit'
          widthButton='100%'
        >Correo</RippleButton>
      </Form>
    </Content>
  )
}
