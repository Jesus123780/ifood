import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { Footer } from './footer'
import { Header } from './header'
import { AlertBox } from '../AlertBox'
import styled, { css } from 'styled-components'
import { HeaderMain } from './headerlog'
import { ModalProduct } from '../../components/ModalProducts'
import { AsideCheckout } from '../AsideCheckout'
import { usePosition } from '../hooks/usePosition'
import { FooterDesktop } from './FooterDesktop'
import { NavHeaderMobile } from './NavHeaderMobile'
import { Messages } from 'container/messages'

export const Layout = ({ keyTheme, handleTheme, children, watch, settings }) => {
    const location = useRouter()
    const { error, isSession, setAlertBox, handleMenu, menu, setOpenMenuMobile, menuMobile } = useContext(Context)
    useEffect(() => {
        setAlertBox({ message: '', color: 'success' })
    }, [])
    const { latitude, longitude, timestamp, accuracy, speed, error: _err } = usePosition(watch, settings);
    const dataLocation = usePosition(watch, settings);
    useEffect(() => {
        setAlertBox({ message: '', color: 'success' })
        if (latitude) {
            window.localStorage.setItem('latitude', latitude)
            window.localStorage.setItem('longitude', longitude)
            window.localStorage.setItem('location', JSON.stringify(dataLocation));
            if (_err) setAlertBox({ message: `Lo sentimo ocurrió un error${_err}`, color: '' })
        }
    }, [latitude, longitude, timestamp, accuracy, speed])
    const val = !['/delivery/[location]/[name]/[id]'].find(x => x === location.pathname)
    const message = ['/proceso-de-compra/finalizar', '/restaurantes'].find(x => x === location.pathname)
    return (
        <div>
            <AlertBox err={error} />
            <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)} >
                <AsideCheckout handleMenu={handleMenu} menu={menu} />
                {!isSession && !['/login', '/', '/entrar/email', '/entrar', '/contact'].find(x => x === location.pathname) && <HeaderMain handleMenu={handleMenu} menu={menu} />}
                <div style={{ gridArea: 'main', overflowY: 'auto' }}>
                    {<NavHeaderMobile setOpenMenuMobile={setOpenMenuMobile} menuMobile={menuMobile} />}
                    {children}
                    {val && <FooterDesktop />}
                    <ModalProduct />
                </div>
                {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Footer />}
                <div style={{ gridArea: 'right' }}>
                    {(message || !val) && <Messages />}
                </div>
            </Main>
        </div>
    )
}

const Main = styled.main`
    display: grid;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    grid-template-rows: 80px 2fr;
    grid-template-columns: min-content 1fr;
    grid-template-areas:
        'head head head head'
        'main main main right'
        'main main main right';
    text-align: center;
    grid-gap: 0;
    /* grid-gap: 10px; */
    @media (min-width: 960px) {
        ${props => !props.aside &&
        css`
                /* grid-template-columns: 1fr; */
                display: flex;
                flex-direction: column;
                height: 100%;
            ` };
    }
`
