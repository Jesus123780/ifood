import React, { useEffect, useState, useCallback } from 'react'
import Link from '../common/Link'
import styled from 'styled-components'
import { PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { ButtonOption, FloatingBoxTwo, Overline } from './styled'
import { IconLogout, IconMessageMain, IconShopping, IconUser } from '../../public/icons'
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {})

  }, [client])

  useEffect(() => {
    const body = document.body
    body.addEventListener('keyup', e => {return e.code === 'Escape' && setShow(false)})
    return () => {return body.removeEventListener('keyup', () => {return setShow})}

  }, [setShow])
  const handleClick = index => {
    setShow(index === show ? false : index)
  }
  useEffect(() => {
    setShow(false)
  }, [location])
  return (
    <ContainerOption>
      <Overline onClick={() => {return setShow(!true)}} show={show} />
      <ButtonOption>
        <Enlace href='/messages'>
          <a>
            <IconMessageMain color={PColor} size='25px' />
          </a>
        </Enlace>
      </ButtonOption>
      <ButtonOption onClick={onClickLogout}>
        <IconLogout color={PColor} size='20px' />
      </ButtonOption>
      <ButtonOption onClick={() => {return handleClick(2)}}>
        <IconShopping color={PColor} size='25px' />
      </ButtonOption>
      <ContainerOption>
        <FloatingBoxTwo show={show === 2}>
          <Option Theme={false} >
            <ButtonOption onClick={() => {return location.push('/profile/user')}} space>
              <span>Perfil</span>
              <IconUser color={PColor} size='25px' />
            </ButtonOption>
          </Option>
          <Option Theme={false} >
            <ButtonOption onClick={onClickLogout} space>
              <span>Cerrar sesión</span>
              <IconLogout color={PColor} size='20px' />
            </ButtonOption>
          </Option>
        </FloatingBoxTwo>
      </ContainerOption>
    </ContainerOption>
  )
}
const ContainerOption = styled.div`
    position: relative;
    width: ${({ width }) => {return width ? width : 'max-content'}};
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