import { BGColor, SFVColor } from 'public/colors'
import React from 'react'
import { Card, CardPrimary, Content, Text, CircleUser, ButtonStore } from './styled'
import { useStore } from 'components/hooks/useStore'
import { useUser } from 'components/hooks/useUser'
import Link from 'next/link'
import { BannerDashboard } from './BannerDashboard'

export const Main = () => {
  const [dataUser] = useUser()
  const { email } = dataUser || {}
  const [dataStore] = useStore()
  const { storeName, idStore } = dataStore || {}
  const nameStore = storeName?.replace(/\s/g, '-').toLowerCase()
  return (
    <Content margin='0 0 100px 0' width='20%'>
      <Card bgColor={BGColor}>
        <CardPrimary bgColor={`${SFVColor}65`} padding='30px 10px'>
          <Text size='15px' >{email}</Text>
        </CardPrimary>
        <CardPrimary padding='' >
          {dataStore !== null && <Link activeClassName='active' href={`/dashboard/${nameStore}/${idStore}`}>
            <a>
              <ButtonStore
                margin='50px 0'
                padding='5px'
                size='10px'
                style={{ justifyContent: 'center' }}
                widthButton='100%'
              >Ir a la tienda</ButtonStore>
            </a>
          </Link>}
          <CircleUser>
            {email?.slice(0, 2).toUpperCase() || 'User'}
          </CircleUser>
        </CardPrimary>
      </Card>
      <BannerDashboard />
    </Content>
  )
}
