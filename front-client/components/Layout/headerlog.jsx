import React, { useContext, useEffect, useState } from 'react'
import { AdicionalComponent, Anchor, FooterComponent, Text, Time, Timer, UseSize } from './styled'
import ActiveLink from '../common/Link'
import { IconConfig, IconHome, IconLogo, IconSearch, IconUser } from '../../public/icons'
import { PColor } from '../../public/colors'
import styled from 'styled-components'
import useScrollHook, { useScrollColor, useScrollY } from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'
import { Options } from './options'
import { Map } from '../Map'
import { RippleButton } from '../Ripple'
import { Context } from '../../context'

export const HeaderMain = ({ menu, handleMenu }) => {
  const { setAlertBox } = useContext(Context)

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
  const [showModal, setShowModal] = useState(false);
  // useEffect(function () {
  //   setInterval(() => {
  //     changeTime(new Date().toLocaleTimeString());
  //   }, 1000);
  // }, []);
  const size = useWindowSize();
  return (
    <div>
      <ContentHeader>
        <HeaderMainC scrollNav={scrollNav} style={style} >
          <div style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
            <ActiveLink href={'/restaurantes'}>
              <a>
                <IconLogo size='80px' color={PColor} />
              </a>
            </ActiveLink>
          </div>
          <div>
            <InputSearch />
          </div>
          <div>
            <button onClick={() => setShowModal(!showModal)}>Open</button>
          </div>
          <Options menu={menu} handleMenu={handleMenu} />
        </HeaderMainC>
      </ContentHeader>
      <Map setShowModal={setShowModal} showModal={showModal} />
    </div>
  )
}


export const InputSearch = () => {
  return (<ContentInputSearch>
    <IconSearch size='20px' color={PColor} />
    <input placeholder='Buscar' />
  </ContentInputSearch>);
};

export const ContentHeader = styled.div`
  width: 100%;
  box-shadow: inset 0 -1px 0 #dcdcdc;
  grid-area: head;
  background-color: ${({ scrollNav }) => (scrollNav ? 'none' : 'transparent')};
`
export const ContentInputSearch = styled.div`
  display: flex;
  padding: 15px;
  border: 1px solid #dcdcdc;
  && > input {
    color: ${PColor};
    margin-left: 10px;
    outline: none;
    border: none;
  }
 `
export const HeaderMainC = styled.header`
  margin: auto;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    width: 100%;
    display: flex;
    height: 80px;
    font-family: SulSans,Helvetica,sans-serif;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1366px!important;
    & > div {
    justify-content: center;
    place-content: center;
    display: flex;
    height: fit-content;
    align-items: center;
    align-self: center;
    }
    @media (min-width: 992px) {
    }
    `