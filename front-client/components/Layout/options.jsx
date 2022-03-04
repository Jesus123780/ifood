import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from '../common/Link'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { FloatingBox, ButtonOption, FloatingBoxTwo, Overline, Button, ButtonOptionFav } from './styled'
import { IconArrowBottom, IconLogout, IconMessageMain, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import { OUR_URL_BASE, URL_BASE } from '../../apollo/urls'

export const Options = ({ keyTheme, handleTheme, handleMenu, menu }) => {
    const { client } = useApolloClient()
    const { state_product_card, itemProducts } = useContext(Context)
    const [show, setShow] = useState(false)
    const location = useRouter()
    // const onClickLogout = () => {
    //     client?.clearStore()
    //     location.replace('/')
    // }

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
    const [openOption, setOpenOption] = useState(false)
    return (
        <>
            <Overline onClick={() => setShow(!true)} show={show} />
            <ButtonOption onClick={() => handleClick(1)}>
                <IconUser size='25px' color={PColor} />
                <LeftNav show={show === 1}>
                    <Enlace href='/profile'>
                        <a>
                            <Button type="button">
                                <IconUser size='25px' color={PColor} />
                            </Button>
                        </a>
                    </Enlace>
                    <Enlace href='/historial'>
                        <a>
                            <Button type="button">
                                <IconShopping size='25px' color={PColor} />
                            </Button>
                        </a>
                    </Enlace>
                </LeftNav>
            </ButtonOption>
            <ButtonOption onClick={onClickLogout}>
                <IconLogout size='20px' color={PColor} />
            </ButtonOption>
            <ButtonOption onClick={() => handleMenu(1)}>
                <div className="count_product">
                    {itemProducts <= 9 ? itemProducts : '+9'}
                </div>
                <IconShopping size='25px' color={PColor} />
            </ButtonOption>
            <ButtonOptionFav onMouseOut={() => setShow(0)} onMouseOver={() => setShow(2)} >
                <Enlace href='/favoritos'>
                    <a>
                        <Button type="button">
                            <IconArrowBottom size='15px' color={PColor} />
                        </Button>
                    </a>
                </Enlace>
            </ButtonOptionFav>
            <ContainerOption>
                <FloatingBoxTwo show={show === 2}>
                    sadasñlk
                </FloatingBoxTwo>
            </ContainerOption>
        </>
    )
}
export const LeftNav = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: 999;
    border-radius: 5px;
    // overflow: hidden;
    width: 200px;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 52px;
    right: -100px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }
    ${({ show }) => show
        ? css`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `
        : css`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `}
`
export const ContainerOption = styled.div`
    width: min-content;
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