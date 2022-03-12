import { AlertBox } from 'components/AlertBox'
import { Context } from 'context/Context'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import Aside from './Aside'
import { Header } from './header'

export const Layout = ({ children }) => {
    const location = useRouter()

    const { error, isSession, setAlertBox } = useContext(Context)

    return (
        <div>
            <Header />
            <AlertBox err={error} />
            <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)} >
                {!['/', '/login', '/entrar', '/entrar/email', '/register', '/terms_and_conditions', '/restaurante', '/varify-email', '/checkout/[id]', '/add-payment-method', '/teams/invite/[id]', '/forgotpassword', '/autho', '/contact-us', '/email/confirm/[code]', '/switch-options', '/contact', '/teams/invite/[id]'].find(x => x === location.pathname) && (<Aside />)}
                <div style={{ gridArea: 'main', overflowY: 'auto' }}>
                    {children}
                </div>
                {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <span> Footer</span>}
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
    grid-template-rows: 75px 2fr;
    grid-template-columns: 180px 1fr;
    grid-template-columns: 180px 1fr;
    grid-template-areas:
    'aside head head head'
    'aside main main right'
    'aside main main right';
    text-align: center;
    grid-gap: 0.25rem;
    /* grid-gap: 10px; */
    @media (max-width: 960px) {
        grid-template-columns: min-content 1fr;
    }
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