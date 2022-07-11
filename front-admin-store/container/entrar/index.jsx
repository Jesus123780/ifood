import React, { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Content, Form, Card, Text, ButtonSubmit } from './styled'
import { RippleButton } from '../../components/Ripple'
import { BGColor, EColor } from '../../public/colors'
import ActiveLink from '../../components/common/Link'
import fetchJson from '../../components/hooks/fetchJson'
import { useRouter } from 'next/router'
import { getDeviceId } from 'apollo/apolloClient'
import { Context } from 'context/Context'
import Portal from 'components/portal'
import { Facebook, IconGoogleFullColor } from '@/public/icons'

export const Login = () => {
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  const [location, setLocation] = useState({})
  const [locationFormat, setLocationFormat] = useState('')
  useEffect(() => {
    const data = window.localStorage.getItem('location')
    setLocation(JSON.parse(data))
  }, [])
  const { latitude, longitude } = location || {}
  const fetchData = async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude}&key=AIzaSyAy0SY1G3OFqesWSTQRHJvzyJzNgURPoN8`
    fetch(API)
      .then(response => { return response.json() })
      .then(response => {
        setLocationFormat(response?.results)
      })
      .catch(() => { return })
    return locationFormat ?? locationFormat[0].formatted_address
  }

  const responseGoogle = async (response) => {
    // e.preventDefault()
    await fetchData()
    const device = await getDeviceId()
    window.localStorage.setItem('sessionGoogle', JSON.stringify(response.profileObj))
    const { name, googleId, email, imageUrl } = response?.profileObj || {}
    const body = {
      name: name,
      username: name,
      lastName: name,
      email: email,
      password: googleId,
      locationFormat: locationFormat[0]?.formatted_address,
      useragent: window.navigator.userAgent,
      deviceid: device,
      imageUrl: imageUrl
    }
    await fetchJson(`${process.env.URL_BASE}api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => {
      setAlertBox({ message: `${res.message}`, color: 'success' })
      const { storeUserId, token } = res
      const { idStore, id } = storeUserId || {}
      if (storeUserId) {
        localStorage.setItem('restaurant', idStore)
        localStorage.setItem('usuario', id)
        localStorage.setItem('usuario', token)
        localStorage.setItem('session', token)
        router.push('/restaurante/getDataVerify')
      } else {
        router.push('/restaurante/getDataVerify')
      }
    }).catch(() => {
      setAlertBox({ message: 'Lo sentimos ha ocurrido un error', color: 'error' })
    })
  }
  return (
    <Portal selector={'portal'}>
      <Content>
        <Card>
        </Card>
        <Form>
          <Text size='30px'>¡Falta poco para saciar tu hambre!</Text>
          <Text size='15px'>¿Cómo deseas continuar?</Text>
          <ButtonSubmit
            color='1'
            // disabled={renderProps.disabled}
            height='40px'
            onClick={responseGoogle}
            size='14px'
            type='button'
          ><Facebook color={BGColor} size='30px' /> Login <div style={{ width: 'min-content' }} />    </ButtonSubmit>
          <ButtonSubmit
            color='2'
            colorFont='#717171'
            // disabled={renderProps.disabled}
            height='40px'
            onClick={responseGoogle}
            size='14px'
          ><IconGoogleFullColor size='30px' /> Continue with Google false<div style={{ width: 'min-content' }} /> </ButtonSubmit>
          <GoogleLogin
            autoLoad={false}
            clientId='58758655786-u323tp1dpi6broro865rrm488gh4mnpu.apps.googleusercontent.com'
            cookiePolicy={'single_host_origin'}
            onFailure={responseGoogle}
            onSuccess={responseGoogle}
            render={renderProps => {
              return (
                <div>

                  <ButtonSubmit
                    color='2'
                    colorFont='#717171'
                    disabled={renderProps.disabled}
                    height='40px'
                    onClick={renderProps.onClick}
                    size='14px'
                  ><IconGoogleFullColor size='30px' /> Continue with Google<div style={{ width: 'min-content' }} /> </ButtonSubmit>
                </div>
              )
            }}
          />
          {/* <FacebookLogin
          appId='467885964900974'
          autoLoad={false}
          callback={responseFacebook}
          fields='name,email,picture'
          render={renderProps => {
            return (
              <ButtonSubmit
                color='1'
                disabled={renderProps.disabled}
                height='40px'
                onClick={renderProps.onClick}
                size='14px'
                type='button'
              ><Facebook color={BGColor} size='30px' /> Login <div style={{ width: 'min-content' }} />    </ButtonSubmit>
            )
          }}
        /> */}
          <ActiveLink activeClassName='active' href='/entrar/email'>
            <a>
              <RippleButton
                bgColor={EColor}
                margin='20px auto'
                type='button'
                widthButton='100%'
              >Correo</RippleButton>
            </a>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/register'>
            <a>
              <RippleButton
                bgColor={EColor}
                margin='20px auto'
                type='button'
                widthButton='100%'
              >Register</RippleButton>
            </a>
          </ActiveLink>
        </Form>
      </Content>

    </Portal>
  )
}
