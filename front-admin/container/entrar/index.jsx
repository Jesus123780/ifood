import React from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ButtonSubmit, Content, Form, Enlace, Card, Text } from './styled'
import { RippleButton } from '../../components/Ripple'
import { APColor, EColor } from '../../public/colors'
import { useMutation } from '@apollo/client'
import ActiveLink from '../../components/common/Link'
import { URL_BASE } from '../../apollo/urls'
import { CREATE_CURRENT_SESSION } from './queries'
import fetchJson from '../../components/hooks/fetchJson'
import { useRouter } from 'next/router'

export const Login = () => {
    const router = useRouter()

    const responseFacebook = response => {
    }
    const [newRegisterUser, { loading }] = useMutation(CREATE_CURRENT_SESSION)
    const responseGoogle = async response => {
        window.localStorage.setItem('sessionGoogle', JSON.stringify(response.profileObj))
        const { name, googleId, email, imageUrl } = response?.profileObj
        const body = {
            name: 'email',
            username: 'email',
            lastName: 'email',
            email: 'email',
            password: "googleId ",
        }
        console.log(body)
        await fetchJson(`${URL_BASE}auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => {
            router.push('/dashboard')
            console.log(res)
            // if (res.success) {
            //     newRegisterUser({ variables: { input: { name: '23423', username: '3242', lastName: '3242', email: 'hola', password: googleId  } } })
            //         .then(res => {
            //             console.log(res)
            //         })
            // }
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <Content>
            <Card>
                {/* sdfasd */}
            </Card>
            <Form>
                <Text size='30px'>¡Falta poco para saciar tu hambre!</Text>
                <Text size='15px'>¿Cómo deseas continuar?</Text>
                <GoogleLogin
                    autoLoad={false}
                    clientId='58758655786-u323tp1dpi6broro865rrm488gh4mnpu.apps.googleusercontent.com'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <ButtonSubmit size='14px' colorFont='#717171' height='40px' color='2' onClick={renderProps.onClick} disabled={renderProps.disabled}>Continue with Google</ButtonSubmit>
                    )}
                />
                <FacebookLogin
                    appId="467885964900974"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={renderProps => (
                        <ButtonSubmit size='14px' height='40px' color='1' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</ButtonSubmit>
                    )}
                />
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
