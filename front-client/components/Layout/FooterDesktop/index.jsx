import React, { useEffect, useState } from 'react'
import { PColor } from '../../../public/colors'
import { IconLogo, Facebook, IconTwitter, IconInstagram, IconYoutube } from '../../../public/icons'
import { Container, Enlace, Content, Copyright, CopyrightInformation, ContainerLogo, ContainerSocial, ContentSocial, Title } from './styled'
export const FooterDesktop = () => {
    const [year, setYear] = useState(false)
    useEffect(() => {
        const fecha = new Date()
        setYear(fecha.getFullYear())
    }, [])

    // const onClickTop = e => {
    //     e.preventDefault()
    //     window.scrollTo({ top: 0, behavior: 'smooth' })
    // }
    return (<>
        <ContainerSocial>
            <ContentSocial>
                <Title>Nosotros</Title>
                <Enlace href='/quienes-somos'>Quiénes somos</Enlace>
                <Enlace href='/ayuda'> Centro de ayuda</Enlace>
                <Enlace href='/entrar'> Registrate</Enlace>
            </ContentSocial>
            <ContentSocial>
                <Title>Descrubre</Title>
                <Enlace href='/como-comprar'>Como pedir</Enlace>
                <Enlace href='/contactanos'> Contacto</Enlace>
                <Enlace href='/entrar'> Ingresa</Enlace>
            </ContentSocial>
            <ContentSocial>
                <Title>Ayuda PQR</Title>
                <Enlace href='/preguntas-frecuentes'>Preguntas  /  frecuentes - </Enlace>
            </ContentSocial>
            <ContentSocial>
                <Title>Social</Title>
                <a target='_blank' style={{ margin: '0px 10px' }} href='https://www.ifood.com.co/lista-restaurantes' >
                    <Facebook size='40px' color={PColor} />
                </a>
                <a target='_blank' style={{ margin: '0px 10px' }} href='https://www.ifood.com.co/lista-restaurantes' >
                    <IconInstagram size='40px' color={PColor} />
                </a>
                <a target='_blank' style={{ margin: '0px 10px' }} href='https://www.ifood.com.co/lista-restaurantes' >
                    <IconTwitter size='40px' color={PColor} />
                </a>
                <a target='_blank' style={{ margin: '0px 10px' }} href='https://www.ifood.com.co/lista-restaurantes' >
                    <IconYoutube size='40px' color={PColor} />
                </a>
            </ContentSocial>
        </ContainerSocial>
        <Container grid >
            <Content grid>
                <ContainerLogo>
                    <IconLogo size='40px' color={PColor} />
                </ContainerLogo>
                <Copyright>{year} © Copyright - COME YA S.A.S. sociedad comercial identificada con NIT No. 900.666.435-</Copyright>
                <CopyrightInformation>Carrera 51B Nº 80-58 , Oficina 601, Barranquilla, Atlántico 080020, CO. </CopyrightInformation>
            </Content>
            <Content>
                {/* <button onClick={onClickTop}>TOP</button> */}
                <Enlace href='/terminos-y-condiciones'> Términos y condiciones</Enlace>
                <Enlace href='/seguridad'> Seguridad</Enlace>
                <Enlace href='/aviso-de-privacidad'> Aviso de privacidad</Enlace>
            </Content>
        </Container>
    </>
    )
}