import ActiveLink from 'components/common/Link'
import { useUser } from 'components/hooks/useUser'
import { IconLove, IconUser } from 'public/icons'
import React from 'react'
import { CicleUser, NavHeaderMenuMobileContent, Anchor } from './styled'

export const NavHeaderMobile = ({ menuMobile, setOpenMenuMobile }) => {
  console.log(menuMobile)
  const [dataUser, { loading: loUser }] = useUser()

  return (
    <NavHeaderMenuMobileContent>
      {menuMobile && <div>
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
        </div>
      </div>}
    </NavHeaderMenuMobileContent>
  )
}
