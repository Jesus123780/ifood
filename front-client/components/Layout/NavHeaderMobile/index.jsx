import { useApolloClient } from '@apollo/client'
import { OUR_URL_BASE } from 'apollo/urls'
import ActiveLink from 'components/common/Link'
import { useUser } from 'components/hooks/useUser'
import { PColor } from 'public/colors'
import { IconLogout, IconLove, IconUser } from 'public/icons'
import React, { useCallback, useState } from 'react'
import { CicleUser, NavHeaderMenuMobileContent, Anchor } from './styled'

export const NavHeaderMobile = ({ menuMobile, setOpenMenuMobile }) => {
  const [dataUser] = useUser()
    const { client } = useApolloClient()
    const onClickLogout = useCallback(async () => {
    localStorage.removeItem('location.data')
    await window
      .fetch(`${OUR_URL_BASE}auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
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
  return (
    <NavHeaderMenuMobileContent height={menuMobile === true ? '70%' : '0'}>
      <div>
        <CicleUser>
          {dataUser?.username?.slice(0, 2)}
        </CicleUser>
        <span>Hola, {dataUser?.username}</span>
        <div className="nav-header-menu-mobile">
          <ActiveLink activeClassName="active" href="/restaurantes">
            <Anchor><IconUser size='30px' color={'#ccc'} /> Inicio</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/historial">
            <Anchor><IconUser size='30px' color={'#ccc'} />Historial</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/favoritos">
            <Anchor><IconLove size='30px' color={'#ccc'} />favoritos</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/profile">
            <Anchor><IconUser size='30px' color={'#ccc'} />Mi cuenta </Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/ayuda">
            <Anchor><IconUser size='30px' color={'#ccc'} />Ayuda / PQR </Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/categorias">
            <Anchor><IconUser size='30px' color={'#ccc'} />Categorías </Anchor>
          </ActiveLink>
          <button onClick={() => onClickLogout()}>
            <IconLogout size='20px' color={PColor} />
          </button>
        </div>
      </div>
    </NavHeaderMenuMobileContent>
  )
}
