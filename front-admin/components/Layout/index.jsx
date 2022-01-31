import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Context } from '../../context'
import { Footer } from './footer'
import { Header } from './header'
import { AlertBox } from '../AlertBox'
import styled, { css } from 'styled-components'
import Aside from './Aside'
import { GET_ALL_FOOD_PRODUCTS } from '../../container/update/Products/queries'

export const Layout = ({ keyTheme, handleTheme, children }) => {
    const location = useRouter()
    const { error, isSession, setAlertBox } = useContext(Context)
    useEffect(() => {
        setAlertBox({ message: '', color: 'success' })
    }, [])
    // const { data: dataProduct2 } = useQuery(GET_ALL_FOOD_PRODUCTS)
    return (
        <>
            <AlertBox err={error} />
            <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)} >
                {!isSession && !['/login', '/', '/entrar', '/restaurante', '/entrar/email', '/entrar/email/[verify]', '/register', '/varify-email', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Header />}
                {!['/', '/login', '/entrar', '/entrar/email', '/register', '/terms_and_conditions', '/restaurante', '/varify-email', '/checkout/[id]', '/add-payment-method', '/teams/invite/[id]', '/forgotpassword', '/autho', '/contact-us', '/email/confirm/[code]', '/switch-options', '/contact', '/teams/invite/[id]'].find(x => x === location.pathname) && (<Aside />)}
                {/* {!isSession
                ? <Header />
            : 'public'} */}
                <div style={{ gridArea: 'main', overflowY: 'auto' }}>
                    {children}
                </div>
                {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Footer />}
                <div style={{ gridArea: 'right' }}>
                </div>
            </Main>
        </>
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
        'aside head head head'
        'aside main main right'
        'aside main main right';
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