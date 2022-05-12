/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { IconLogo, IconSales } from '../../public/icons'
import { PColor } from '../../public/colors'
import styled from 'styled-components'
import useScrollHook, { useScrollColor } from '../hooks/useScroll'
// import useWindowSize from '../hooks/useWindowSize'
import { Options } from './options'
import { Context } from 'context/Context'

export const Header = () => {
  const style = useScrollHook()
  const { setSalesOpen, salesOpen } = useContext(Context)
  const { scrollNav } = useScrollColor()
  const customTime = new Date()
  const customHours = customTime.getHours()
  // let displayMessage;
  const customColor = {
    color: ''
  }
  if (customHours < 12) {
    // displayMessage = `Good Morning`;
    customColor.color = 'red'
  } else if (customHours >= 12 && customHours < 18) {
    // displayMessage = `Good Afternoon`;
    customColor.color = 'green'
  } else {
    // displayMessage = `Good Night`;
    customColor.color = '#090c10'
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, changeTime] = useState(new Date().toLocaleTimeString())
  useEffect(function () {
    setInterval(() => {
      changeTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [])
  // const size = useWindowSize();
  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <Link href={'/dashboard'}>
        <a>
          <IconLogo color={PColor} size='80px' />
        </a>
      </Link>
      <CtnItemOps>
        <Options />
        <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }} style={style}>
          <IconSales size={30} />
          <div className='info-sales'>
            <span>Crear una venta</span>
            <span>Total de ventas hoy {10}</span>
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
  )
}

export const CtnItemOps = styled.div`
  display: flex;
  width: fit-content;
  place-content: center;
  place-items: center;
  flex-wrap: wrap;
`
export const HeaderWrapperButton = styled.div`
    display: flex;
    flex-direction: row;
    grid-column-gap: 12px;
    column-gap: 12px;
    align-items: center;
    width: max-content;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 12px;
    border-radius: 200px;
    transition: background-color .3s ease-in-out;
    border: 0;
    cursor: pointer;
    background-color: #f7f7f7;
    margin-left: 30px;
    &:hover {
      background-color: #f7f7f7;
    }
    .info-sales {
    margin: 0 0 0 6px;
    color: #717171;
    transition: background-color .3s ease-in-out;
    white-space: nowrap;
    text-align: left;
    }
    span {
    font-size: .75rem;
    line-height: 1rem;
    display: block;
    }
`
export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 1.2em;
    display: flex;
    height: 80px;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    @media (min-width: 992px) {
    }
    `