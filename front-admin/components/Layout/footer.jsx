import React, { useContext, useEffect } from 'react'
import { Anchor, FooterComponent, Text } from './styled'
import ActiveLink from '../common/Link'
import { IconConfig, IconHome, IconSearch, IconUser } from '../../public/icons'
import { PColor } from '../../public/colors'
import { Context } from '../../context/Context'

export const Footer = () => {
  const { error, isSession, setAlertBox } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  }, [])
  return (
    <>
      <FooterComponent>
        <>
          <ActiveLink activeClassName="active" href="/dashboard">
            <Anchor><IconHome color={PColor} size='20px' />&nbsp;<Text>Home</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/search">
            <Anchor><IconSearch color={PColor} size='20px' />&nbsp;<Text>Explore</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/config">
            <Anchor><IconConfig color={PColor} size='20px' />&nbsp;<Text>Config</Text></Anchor>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/profile">
            <Anchor><IconUser color={PColor} size='20px' />&nbsp;<Text>Profile</Text></Anchor>
          </ActiveLink>
        </>
      </FooterComponent>
    </>
  )
}
