import React from 'react'
import { Anchor, FooterComponent, Text } from './styled'
import ActiveLink from '../common/Link'
import { IconConfig, IconHome, IconSearch, IconUser } from '../../public/icons'
import { PColor } from '../../public/colors'

export const Footer = () => {
  return (
    <>
      <FooterComponent>
        <>
          <ActiveLink activeClassName="active" href="/restaurantes">
            <Anchor><IconHome color={PColor} size='20px' />&nbsp;<Text>Inicio</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/search">
            <Anchor><IconSearch color={PColor} size='20px' />&nbsp;<Text>Explorar</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/config">
            <Anchor><IconConfig color={PColor} size='20px' />&nbsp;<Text>Config de cuenta</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/profile">
            <Anchor><IconUser color={PColor} size='20px' />&nbsp;<Text>Perfil</Text></Anchor>
          </ActiveLink>
        </>
      </FooterComponent>
    </>
  )
}
