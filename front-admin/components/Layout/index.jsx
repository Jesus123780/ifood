import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/Context'
import { Footer } from './footer'
import { gql, useSubscription } from '@apollo/client'
import { Header } from './header'
import { AlertBox } from '../AlertBox'
import styled, { css } from 'styled-components'
import Aside from './Aside'
import { usePosition } from 'components/hooks/usePosition'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'
import { LateralModal } from 'container/dashboard/styled'
import { BtnClose } from 'components/AwesomeModal/styled'
import { IconCancel } from 'public/icons'
import GenerateSales from 'container/Sales'
import { AwesomeModal } from 'components/AwesomeModal'
import { Messages } from 'container/messages'

export const Layout = ({ children, watch, settings }) => {
  const location = useRouter()
  const { error, isSession, setAlertBox, openSchedule, setOpenSchedule, salesOpen, setSalesOpen } = useContext(Context)
  const { latitude, longitude, timestamp, accuracy, speed } = usePosition(watch, settings)
  const dataLocation = usePosition(watch, settings)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
    if (latitude) {
      window.localStorage.setItem('latitude', latitude)
      window.localStorage.setItem('longitude', longitude)
      window.localStorage.setItem('location', JSON.stringify(dataLocation))
    }
  }, [latitude, longitude, timestamp, accuracy, speed])
  const NEW_NOTIFICATION = gql`
    subscription {
    newNotification
    }
    `
  const { data: dataWS } = useSubscription(NEW_NOTIFICATION, {
    // onSubscriptionData: ({ subscriptionData }) => {
    // //   console.log(subscriptionData.newNotification)
    // }
  })
  useEffect(() => {
    if (dataWS) {
      setAlertBox({ message: dataWS?.newNotification, duration: 30000 })
    }
  }, [dataWS])
  return (
    <>
      <AlertBox err={error} />
      <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => {return x === location.pathname})} >
        {!isSession && !['/login', '/', '/entrar', '/restaurante', '/entrar/email', '/entrar/email/[verify]', '/register', '/varify-email', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => {return x === location.pathname}) && <Header />}
        {!['/', '/login', '/entrar', '/entrar/email', '/register', '/terms_and_conditions', '/restaurante', '/varify-email', '/checkout/[id]', '/add-payment-method', '/teams/invite/[id]', '/forgotpassword', '/autho', '/contact-us', '/email/confirm/[code]', '/switch-options', '/contact', '/teams/invite/[id]'].find(x => {return x === location.pathname}) && (<Aside />)}
        <div style={{ gridArea: 'main', overflowY: 'auto' }}>
          {children}
          <AwesomeModal
            backdrop='static'
            borderRadius='10px'
            btnCancel={true}
            btnConfirm={false}
            footer={false}
            header={true}
            height='95vh'
            onCancel={() => {return false}}
            onHide={() => {return setSalesOpen(!salesOpen)} }
            padding={0}
            show={salesOpen}
            size='large'
            title='Crea una venta'
            zIndex='9999'
          >
            <GenerateSales />
          </AwesomeModal>
          <Messages />
        </div>
        {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => {return x === location.pathname}) && <Footer />}
        <div style={{ gridArea: 'right' }}>
          <LateralModal openSchedule={openSchedule}>
            <BtnClose onClick={() => {return setOpenSchedule(!openSchedule)}}><IconCancel size='20px' /></BtnClose>
            <ScheduleTimings />
          </LateralModal>
        </div>
      </Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}
// https://www.conferecartoes.com.br/blog/portal-do-ifood
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
        ${props => {return !props.aside &&
        css`
                /* grid-template-columns: 1fr; */
                display: flex;
                flex-direction: column;
                height: 100%;
            `} };
    }
`