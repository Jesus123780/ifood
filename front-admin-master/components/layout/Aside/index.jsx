import React, { useCallback, useContext, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { PColor } from '../../../public/colors'
import { IconLogout, IconShopping } from '../../../public/icons'
import ActiveLink from '../../common/Link'
import { Anchor, AnchorRouter, ButtonActionLink, ButtonGlobalCreate, ButtonOption, Card, ContainerAside, CtnAnchor, Info, LeftNav, OptionButton, Router, SubMenuModules } from './styled'
import { useRouter } from 'next/router'
import { URL_BASE } from 'apollo/urls'
import { Context } from 'context/Context'
import Options from 'components/Acordion/Options'

const Aside = () => {
  const { client } = useApolloClient()
  const location = useRouter()
  const { error, isSession, setAlertBox, openSchedule, setOpenSchedule, countPedido, listRoutes } = useContext(Context)

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])
  const [menu, setMenu] = useState(null)
  const handleClick = index => setMenu(index === menu ? false : index)
  const data = [
    {
      mId: 1,
      mName: 'update',
      mPath: 'update',
      subModules: [
        {
          smId: 2,
          smName: 'promos-dashboard',
          smPath: 'promos-dashboard',
        },
        {
          smId: 3,
          smName: 'kit',
          smPath: 'kit',
        },
        {
          smId: 4,
          smName: 'offers',
          smPath: 'offers',
        },
        {
          smId: 5,
          smName: 'categories',
          smPath: 'categories',
        },
        {
          smId: 6,
          smName: 'Pqr',
          smPath: 'Pqr',
        },
        {
          smId: 7,
          smName: 'stores',
          smPath: 'stores',
        },
        {
          smId: 8,
          smName: 'promos',
          smPath: 'promos',
        },
        {
          smId: 9,
          smName: 'notification',
          smPath: 'notification',
        },
        {
          smId: 10,
          smName: 'banners',
          smPath: 'banners',
        },
      ]
    },
    {
      mId: 1,
      mName: 'statistic',
      mPath: 'statistic',
      subModules: [
        {
          smId: 2,
          smName: 'statistic-dashboard',
          smPath: 'statisticdashboard',
        },
        {
          smId: 3,
          smName: 'statistic',
          smPath: 'statistic',
        },
        {
          smId: 4,
          smName: 'statistic',
          smPath: 'statistic',
        },
        {
          smId: 5,
          smName: 'statistic',
          smPath: 'statisticies',
        },
        {
          smId: 6,
          smName: 'statistic',
          smPath: 'statistic',
        },
        {
          smId: 7,
          smName: 'statistic',
          smPath: 'statistic',
        },
        {
          smId: 8,
          smName: 'statistic',
          smPath: 'statistic',
        },
        {
          smId: 9,
          smName: 'statistic',
          smPath: 'statistication',
        },
        {
          smId: 10,
          smName: 'statistic',
          smPath: 'statistic',
        },
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
           
            {data?.map((m, i) => (
              <Options
                key={m.mId}
                index={i}
                active={menu === i}
                path={m.mPath}
                label={m.mName}
                handleClick={() => handleClick(i)} >
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
