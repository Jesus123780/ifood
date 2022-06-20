import React, { useContext, useEffect, useState } from 'react'
// import { GoogleLogin } from 'react-google-login'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ButtonSubmit, Content, Form, Enlace, Card, Text } from './styled'
import { RippleButton } from '../../components/Ripple'
import { APColor, BGColor, EColor } from '../../public/colors'
import { useMutation } from '@apollo/client'
import ActiveLink from '../../components/common/Link'
import { OUR_URL_BASE, URL_BASE } from '../../apollo/urls'
import { CREATE_CURRENT_SESSION } from './queries'
import fetchJson from '../../components/hooks/fetchJson'
import { useRouter } from 'next/router'
import { Facebook, IconGoogleFullColor } from '../../public/icons'
import { Context } from '../../context'
import { getDeviceId } from '../../apollo/apolloClient'

const Login = ({ watch, settings }) => {
    const router = useRouter()
    const { setAlertBox } = useContext(Context)
    const responseFacebook = response => {
    }
    const [location, setLocation] = useState({})
    const [locationFormat, setLocationFormat] = useState('')
    const [newRegisterUser, { loading }] = useMutation(CREATE_CURRENT_SESSION)
    useEffect(() => {
        const data = window.localStorage.getItem('location')
        setLocation(JSON.parse(data))
    }, [])
    const { latitude, longitude } = location || {}
    const fetchData = async () => {
        const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude}&key=AIzaSyAy0SY1G3OFqesWSTQRHJvzyJzNgURPoN8`;
        fetch(API)
            .then(response => response.json())
            .then(response => {
                setLocationFormat(response?.results)
            })
            .catch(() => {
            })
        return locationFormat ?? locationFormat[0].formatted_address
    }
    const responseGoogle = async (response) => {
        response.preventDefault()
        // const dataLocation = await fetchData()
        // window.localStorage.setItem('sessionGoogle', JSON.stringify(response.profileObj))
        // const { name, googleId, email, imageUrl } = response?.profileObj
        // const body = {
        //     name: name,
        //     username: name,
        //     lastName: name,
        //     email: email,
        //     password: googleId,
        //     locationFormat: locationFormat[0]?.formatted_address,
        //     useragent: window.navigator.userAgent,
        //     deviceid: await getDeviceId() || '',
        // }
        const bodyfalse = {
            name: 'juvinaojesusd@gmail.com',
            username: 'juvinaojesusd@gmail.com',
            lastName: 'juvinaojesusd@gmail.com',
            email: 'juvinaojesusd@gmail.com',
            password: '113561675852804771364',
            locationFormat: locationFormat[0]?.formatted_address,
            useragent: window.navigator.userAgent,
            deviceid: '23423423432',
        }
        await fetchJson(`${OUR_URL_BASE}auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyfalse)
        }).then(res => {
            const { userId, token } = res || {}
            window.localStorage.setItem('session', token)
            window.localStorage.setItem('usuario', userId)
            setAlertBox({ message: `${res.message}`, color: 'success' })
            router.push('/restaurantes')
        }).catch(e => {
        console.log("🚀 ~ file: index.jsx ~ line 77 ~ responseGoogle ~ e", e)
        })
    }
    return (
        <Content>
            <Card>
            </Card>
            <Form>
                <Text size='30px'>¡Falta poco para saciar tu hambre!</Text>
                <Text size='15px'>¿Cómo deseas continuar?</Text>
                <button onClick={(e) => responseGoogle(e)}>Login falso</button>
                {/* <GoogleLogin
                    autoLoad={false}
                    clientId='58758655786-u323tp1dpi6broro865rrm488gh4mnpu.apps.googleusercontent.com'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <div>

                            <ButtonSubmit size='14px' colorFont='#717171' height='40px' color='2' onClick={renderProps.onClick} disabled={renderProps.disabled}><IconGoogleFullColor size='30px' /> Continue with Google<div style={{ width: 'min-content' }} /> </ButtonSubmit>
                        </div>
                    )}
                />
                <FacebookLogin
                    appId="467885964900974"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={renderProps => (
                        <ButtonSubmit type="button" size='14px' height='40px' color='1' onClick={renderProps.onClick} disabled={renderProps.disabled}><Facebook color={BGColor} size='30px' /> Login <div style={{ width: 'min-content' }} />    </ButtonSubmit>
                    )}
                /> */}
                <ActiveLink activeClassName="active" href="/entrar/email">
                    <a>
                        <RippleButton widthButton='100%' margin='20px auto' type='button' bgColor={EColor}>Correo</RippleButton>
                    </a>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/register">
                    <a>
                        <RippleButton widthButton='100%' margin='20px auto' type='button' bgColor={EColor}>Register</RippleButton>
                    </a>
                </ActiveLink>
            </Form>
        </Content>
    )
}

export default Login
