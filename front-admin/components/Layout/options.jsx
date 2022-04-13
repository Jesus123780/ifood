import React, { useEffect, useState, useCallback } from 'react'
import Link from '../common/Link'
import styled from 'styled-components'
import { PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { ButtonOption, FloatingBoxTwo, Overline } from './styled'
import { IconLogout, IconMessageMain, IconShopping, IconUser, IconSales } from '../../public/icons'
import { useRouter } from 'next/router'
import { URL_BASE } from '../../apollo/urls'

export const Options = () => {
    const { client } = useApolloClient()
    const [show, setShow] = useState(false)
    const location = useRouter()
    // const onClickLogout = () => {
    //     client?.clearStore()
    //     window.localStorage.clear()
    //     location.replace('/')
    // }
    // Cerrar sesión
    const onClickLogout = useCallback(async () => {
        await window
            .fetch(`${URL_BASE}auth/logout/`, {})
            .then(res => {
                if (res) {
                    client?.clearStore()
                    // window.localStorage.clear()
                    location.replace('/entrar')
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

    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
        return () => body.removeEventListener('keyup', () => setShow)

    }, [setShow])
    const handleClick = index => {
        setShow(index === show ? false : index)
    }
    useEffect(() => {
        setShow(false)
    }, [location]);
    return (
        <ContainerOption>
            <Overline onClick={() => setShow(!true)} show={show} />
            <ButtonOption>
                <Enlace href='/messages'>
                    <a>
                        <IconMessageMain size='25px' color={PColor} />
                    </a>
                </Enlace>
            </ButtonOption>
            <ButtonOption onClick={onClickLogout}>
                <IconLogout size='20px' color={PColor} />
            </ButtonOption>
            <ButtonOption onClick={() => handleClick(2)}>
                <IconShopping size='25px' color={PColor} />
            </ButtonOption>
            <ContainerOption>
                <FloatingBoxTwo show={show === 2}>
                    <Option Theme={false} >
                        <ButtonOption space onClick={() => location.push('/profile/user')}>
                            <span>Perfil</span>
                            <IconUser size='25px' color={PColor} />
                        </ButtonOption>
                    </Option>
                    <Option Theme={false} >
                        <ButtonOption space onClick={onClickLogout}>
                            <span>Cerrar sesión</span>
                            <IconLogout size='20px' color={PColor} />
                        </ButtonOption>
                    </Option>
                </FloatingBoxTwo>
            </ContainerOption>
        </ContainerOption>
    )
}
const ContainerOption = styled.div`
    position: relative;
    width: ${({ width }) => width ? width : 'max-content'};
`
const Enlace = styled(Link)`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #1b18181a;
    }
    `
const Option = styled.div`
    padding: 15px 0px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:hover{
        background-color: #ffffff1a;
    }
`