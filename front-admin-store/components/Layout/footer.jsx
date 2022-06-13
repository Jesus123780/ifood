import React, { useContext, useEffect } from 'react'
import { Context } from '../../context/Context'
import { PColor } from '../../public/colors'
import { IconConfig, IconHome, IconSearch, IconUser } from '../../public/icons'
import ActiveLink from '../common/Link'
import { Anchor, FooterComponent, Text } from './styled'

export const Footer = () => {
  const { setAlertBox } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  }, [setAlertBox])
  return (
    <>
      <FooterComponent>
        <>
          <ActiveLink activeClassName='active' href='/dashboard'>
            <Anchor><IconHome color={PColor} size='20px' />&nbsp;<Text>Home</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/search'>
            <Anchor><IconSearch color={PColor} size='20px' />&nbsp;<Text>Explore</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/config'>
            <Anchor><IconConfig color={PColor} size='20px' />&nbsp;<Text>Config</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/profile/user'>
            <Anchor><IconUser color={PColor} size='20px' />&nbsp;<Text>Profile</Text></Anchor>
          </ActiveLink>
        </>
      </FooterComponent>
    </>
  )
}
