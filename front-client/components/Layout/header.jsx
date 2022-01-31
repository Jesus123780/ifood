import React, { useEffect, useState } from 'react'
import { AdicionalComponent, Anchor, FooterComponent, Text, Time, Timer, UseSize } from './styled'
import ActiveLink from '../common/Link'
import { IconConfig, IconHome, IconLogo, IconSearch, IconUser } from '../../public/icons'
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
      <>
        <div style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
          <ActiveLink href={'/'}>
            <IconLogo size='80px' color={PColor} />
          </ActiveLink>
        </div>
        <AdicionalComponent>
          {/* <Time>
            <Timer>
            {time}
            </Timer>
            <Timer style={customColor}>
            {displayMessage}
            </Timer>
          </Time> */}
          {/* <UseSize>
            <Text>W:{size.width}px</Text>
            <Text>H:{size.height}px</Text>
          </UseSize> */}
        </AdicionalComponent>
        {/* <Options /> */}
      </>
    </HeaderC>
  )
}

export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => (scrollNav ? 'none' : 'transparent')};
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    height: 80px;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    padding: 0;
    @media (min-width: 992px) {
    }
    `