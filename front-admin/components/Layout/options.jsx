import React, { useEffect, useState, useCallback } from 'react'
import Link from '../common/Link'

import styled, { css } from 'styled-components'
import { PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { FloatingBox, ButtonOption, FloatingBoxTwo, Overline } from './styled'
import { IconLogout, IconMessageMain, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { URL_BASE } from '../../apollo/urls'

export const Options = ({ keyTheme, handleTheme }) => {
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
                    window.localStorage.clear()
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

    }, [])

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
    const [activeLogin, setActive] = useState(false)
    // activa el menu de configuraciones del perfil
    const activeSettings = () => {
        setActive(!activeLogin)
    }
    return (
        <>
            <Overline onClick={() => setShow(!true)} show={show} />
            {< >
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
            </>}
        </>
    )
}
const ContainerOption = styled.div`
    position: relative;
`
const Hr = styled.hr`
    background: #dadde1;
    border-width: 0;
    color: #dadde1;
    height: 1px;
    ${props => props.Theme === 'light' && css`
        background-color: ${({ theme }) => `${theme.BGAColor}32`} ;
    ` };

`
const Text = styled.span`
    font-family: PFont-Light;
    font-size: 14px;
    color: ${({ theme }) => `${theme.PColor}`};
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
const ButtonTheme = styled.button`
    width: 65px;
    height: 25px;
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
const Avatar = styled.img`
    width: 60px;
    min-width: 60px;
    height: 60px;
    background-color: ${({ theme }) => `${theme.BGAColor}32`} ;
    border-radius: 100%;
    border: 2px solid ${({ theme }) => `${theme.SFSColor}32`} ;
    padding: 1px;
`
const BoxUser = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
    align-items: center;
    & > span {
        font-family:  PFont-Regular;
        font-size: 12px;
        white-space: nowrap;
        display: block;
        margin-left: 25px;
    }
    & > span:first-child {
        font-family:  PFont-Bold;
    }
`
const Switch = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 50%;
    top: 1px;
    position: absolute;
    border-bottom: 1px solid ${({ theme }) => `${theme.BGAColor}32`} ;
    background-color: ${({ theme }) => `${theme.BGAColor}90`} ;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;

`