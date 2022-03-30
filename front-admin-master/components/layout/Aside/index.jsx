/* eslint-disable no-unused-expressions */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { PColor } from '../../../public/colors'
import { IconHome, IconLogout, IconPromo, IconShopping } from '../../../public/icons'
import ActiveLink from '../../common/Link'
import { Anchor, AnchorRouter, ButtonActionLink, ButtonGlobalCreate, ButtonOption, Card, ContainerAside, CtnAnchor, Info, LeftNav, OptionButton, Router, SubMenuModules } from './styled'
import { useRouter } from 'next/router'
import { URL_BASE } from 'apollo/urls'
import { Context } from 'context/Context'
import Options from 'components/Acordion/Options'

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
  const [menu, setMenu] = useState(false)
  const handleClick = index => setMenu(index === menu ? false : index)
  const data = [
    {
      mId: 1,
      mName: 'update',
      mPath: 'update',
      subModules: [
        {
          smId: 1,
          smName: 'Location',
          smPath: 'location',
        },
        {
          smId: 2,
          smName: 'categoria-de-tienda',
          smPath: 'categoria-de-tienda',
        },
        {
          smId: 3,
          smName: 'PromoBannerDashboard',
          smPath: 'PromoBannerDashboard',
        }
      ]
    },

  ]
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
          </Info>
          <Router>
            <ActiveLink activeClassName="active" href="/dashboard">
              <AnchorRouter><IconHome size='15px' />Home</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/banners">
              <AnchorRouter><IconPromo size='15px' />Banners promo</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/stores">
              <AnchorRouter><IconShopping size='15px' />Store</AnchorRouter>
            </ActiveLink>
            {data?.map((m, i) => (
              <Options
                key={m.mId}
                index={i}
                active={menu === i}
                path={m.mPath}
                label={m.mName}
                handleClick={() => handleClick(i)}
              // icon={<FontAwesomeIcon icon={iconModules[x.mIcon]} color={active === i ? '#a6b0cf' : '#a6b0cf'} size='lg' />}
              >
                {!!m.subModules && m.subModules.map(sm => <ActiveLink
                  key={sm.smId}
                  onClick={e => e.stopPropagation()}
                  href={`/${m.mPath}/${sm.smPath}`}
                >
                  <AnchorRouter><IconShopping size='15px' />{sm.smName}</AnchorRouter>

                </ActiveLink>)}
              </Options>

            ))}
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
