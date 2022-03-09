/* eslint-disable no-unused-expressions */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { PColor } from '../../../public/colors'
import { IconHome, IconHorario, IconLogo, IconLogout, IconPromo, IconShopping } from '../../../public/icons'
import ActiveLink from '../../common/Link'
import { Anchor, AnchorRouter, ButtonActionLink, ButtonGlobalCreate, Card, ContainerAside, CtnAnchor, Info, LeftNav, OptionButton, Router, SubMenuModules } from './styled'
import { useRouter } from 'next/router'
import { URL_BASE } from 'apollo/urls'
import { ButtonOption } from '../styled'
import { useStore } from 'components/hooks/useStore'
import { Context } from 'context/Context'
import Link from 'next/link'

const Aside = () => {
  const { client } = useApolloClient()
  const location = useRouter()
  const { error, isSession, setAlertBox, openSchedule, setOpenSchedule, countPedido } = useContext(Context)

  const [show, setShow] = useState(false)
  const onClickLogout = useCallback(async () => {
    await window
      .fetch(`${URL_BASE}auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          // window.localStorage.clear()
          location.replace('/')
        }
      })
      .catch(() => {
        console.log({
          message: 'Se ha producido un error.',
          duration: 30000,
          color: 'error'
        })
      })

  }, [client])
  const [dataStore, { loading: LoadingRes }] = useStore()
  const { storeName, idStore, uState } = dataStore || {}

  return (
    <>
      <ContainerAside>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => setShow(!show)}>
              Add new
            </ButtonGlobalCreate>
            <LeftNav show={show}>
              <Info>
                <h2>Customers</h2>
                <ActiveLink activeClassName="active" href="/sales-invoices">
                  <Anchor>Invoices</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/sales-invoices">
                  <Anchor>Sales Invoice</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Supplier</h2>
                <ActiveLink activeClassName="active" href="/bills">
                  <Anchor>Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/pay-bills">
                  <Anchor>Pay Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Purchase Orders</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Expenses</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Employees</h2>
                <ActiveLink activeClassName="active" href="/companies/dashboard">
                  <Anchor>Admin</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Home</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Productos</h2>
                <ActiveLink activeClassName="active" href="/update/products">
                  <Anchor>Productos</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/dashboard">
                  <Anchor>Panel Restaurante</Anchor>
                </ActiveLink>
              </Info>
            </LeftNav>

            <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
              <a>
                <h1 className="title_store">{storeName}</h1>
              </a>
            </Link>
           {uState == 1 && <div className="program_state">
              <IconLogo size='20px' color={PColor} />
              <h3 className="sub_title_store">En pausa programada</h3>
            </div>}
          </Info>
          <Router>
            <ActiveLink activeClassName="active" href="/dashboard">
              <AnchorRouter><IconHome size='15px' />Home</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/pedidos">
              <AnchorRouter>
                <div className="count_pedidos">{countPedido}</div>
                <IconShopping size='15px' />Pedidos
              </AnchorRouter>
            </ActiveLink>
            <ButtonActionLink onClick={() => setOpenSchedule(!openSchedule)}>
              <IconHorario size='15px' />Orarios
            </ButtonActionLink>
            <ActiveLink activeClassName="active" href="/promo">
              <AnchorRouter><IconPromo size='15px' />Promo</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/promo">
              <AnchorRouter><IconShopping size='15px' />Store</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/ventas">
              <AnchorRouter><IconShopping size='15px' />Ventas</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/promo">
              <AnchorRouter><IconShopping size='15px' />Ajustes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/promo">
              <AnchorRouter><IconShopping size='15px' />Recomendaciones</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/promo">
              <AnchorRouter><IconShopping size='15px' />Productos </AnchorRouter>
            </ActiveLink>
            <OptionButton>
              <ButtonOption space onClick={onClickLogout}>
                <IconLogout size='20px' color={PColor} />
              </ButtonOption>
            </OptionButton>
          </Router>
        </Card>

      </ContainerAside>
    </>
  )
}
export default React.memo(Aside, (prevProps, props) => {
  props.active !== prevProps.active
})

Aside.propTypes = {
  handleClickMenu: PropTypes.func,
  closeSession: PropTypes.func,
  filter: PropTypes.func,
  dataForm: PropTypes.object,
  currentUser: PropTypes.object,
  onChange: PropTypes.func,
  allCompany: PropTypes.array,
  dataCompany: PropTypes.object,
  active: PropTypes.bool,
  handleMenu: PropTypes.func
}
