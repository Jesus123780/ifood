import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { Footer } from './footer'
import { Header } from './header'
import { AlertBox } from '../AlertBox'
import styled, { css } from 'styled-components'
import Aside from './Aside'
import { HeaderMain } from './headerlog'
import { AsideCheckoutC } from '../../container/AsideCheckout'

export const Layout = ({ keyTheme, handleTheme, children }) => {
    const location = useRouter()
    const { error, isSession, setAlertBox, setCollapsed, collapsed, handleMenu, menu } = useContext(Context)
    // console.log(isSession)
    useEffect(() => {
        setAlertBox({ message: '', color: 'success' })
    }, [])
    return (
        <div>

            <AlertBox err={error} />
            <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)} >
                {!isSession && !['/login', '/', '/entrar', '/restaurantes', '/entrar/email', '/entrar/email/[verify]', '/register', '/varify-email', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact', '/delivery/[location]/[name]/[id]',].find(x => x === location.pathname) && <Header />}
                {!isSession && !['/login', '/', '/entrar/email', '/entrar', '/contact'].find(x => x === location.pathname) && <HeaderMain handleMenu={handleMenu} menu={menu} />}
                {!isSession && !['/login', '/', '/entrar/email',  '/entrar','/delivery/[location]/[name]/[id]', '/contact'].find(x => x === location.pathname) && <AsideCheckoutC handleMenu={handleMenu} menu={menu} />}
                <div style={{ gridArea: 'main' , overflowY: 'auto' }}>
                    {children}
                </div>
                {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Footer />}
                <div style={{ gridArea: 'right' }}>
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
    grid-gap: 0.25rem;
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
