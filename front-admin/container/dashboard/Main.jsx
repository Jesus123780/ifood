import { BGColor, SFVColor } from 'public/colors'
import React from 'react'
import { Avatar, Card, CardPrimary, Container, Content, Text, Wrapper, WrapperRow, CardOverFloW, CircleCompany, CircleUser, ButtonTheme, SwitchButton, ContentToggle, OlList, FeedItem, ItemTeam, ItemInf, CardDevice, MediaValue, ButtonStore, ContentGrid } from './styled'
import { useStore } from 'components/hooks/useStore'
import { useUser } from 'components/hooks/useUser'
import Link from 'next/link'
import { BannerDashboard } from './BannerDashboard'

export const Main = () => {
    const [dataUser, { loading: loUser }] = useUser()
    const { email } = dataUser || {}
    const [dataStore, { loading: LoadingRes }] = useStore()
    const { storeName, idStore } = dataStore || {}

    return (
        <Content margin='0 0 100px 0' width="20%">
            <Card bgColor={BGColor}>
                <CardPrimary bgColor={`${SFVColor}65`} padding='30px 10px'>
                    <Text size='15px' >{email}</Text>
                </CardPrimary>
                <CardPrimary padding='' >
                    {dataStore !== null && <Link activeClassName="active" href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
                        <a>
                            <ButtonStore style={{ justifyContent: 'center' }} margin='50px 0' widthButton='100%' size='10px' padding='5px'>Ir a la tienda</ButtonStore>
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
