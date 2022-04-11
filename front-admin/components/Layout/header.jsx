import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconLogo } from '../../public/icons'
import { PColor } from '../../public/colors'
import styled from 'styled-components'
import useScrollHook, { useScrollColor, useScrollY } from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'
import { Options } from './options'

export const Header = () => {
  const style = useScrollHook();
  const { offsetY } = useScrollY();
  const { scrollNav } = useScrollColor();
  const customTime = new Date();
  const customHours = customTime.getHours();
  let displayMessage;
  const customColor = {
    color: ''
  };
  if (customHours < 12) {
    displayMessage = `Good Morning`;
    customColor.color = 'red';
  } else if (customHours >= 12 && customHours < 18) {
    displayMessage = `Good Afternoon`;
    customColor.color = 'green';
  } else {
    displayMessage = `Good Night`;
    customColor.color = '#090c10';
  }
  const [time, changeTime] = useState(new Date().toLocaleTimeString());
  useEffect(function () {
    setInterval(() => {
      changeTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  const size = useWindowSize();
  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <div style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
        <Link className='' href={'/dashboard'}>
          <a >
            <IconLogo size='80px' color={PColor} />
          </a>
        </Link>
        {time}
      </div>
      <Options />
    </HeaderC>
  )
}

export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => (scrollNav ? 'none' : 'transparent')};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    display: flex;
    height: 60px;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    padding: 0px 80px;
    @media (min-width: 992px) {
    }
    `