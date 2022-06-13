import React, { useContext, useEffect, useState } from 'react'
import { AdicionalComponent, Anchor, FooterComponent, Text, Time, Timer, UseSize } from './styled'
import ActiveLink from '../common/Link'
import { IconConfig, IconHome, IconLocationMap, IconLogo, IconSearch, IconUser } from '../../public/icons'
import { PColor } from '../../public/colors'
import styled, { css } from 'styled-components'
import useScrollHook, { useScrollColor, useScrollY } from '../hooks/useScroll'
import useWindowSize from '../hooks/useWindowSize'
import { Options } from './options'
import { Map } from '../Map'
import { RippleButton } from '../Ripple'
import { Context } from '../../context'
import { InputSearch } from 'container/InputSearch'

export const HeaderMain = ({ menu, handleMenu }) => {
  const { setAlertBox, modalLocation, setModalLocation, setLocationString, locationStr, stateLocation } = useContext(Context)
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
  // const [locationData, setLocationData] = useState(false);
  // useEffect(function () {
  //   setInterval(() => {
  //     changeTime(new Date().toLocaleTimeString());
  //   }, 1000);
  // }, []);
  const size = useWindowSize();
  useEffect(() => {
    let location = localStorage.getItem('location.data')
    setLocationString(JSON.parse(location))
  }, [])
  const { department, pais, uLocationKnow, city } = locationStr || {}
  return (
    <div>
      <ContentHeader>
        <HeaderMainC>
          <ItemHeader style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
            <ActiveLink href={'/restaurantes'}>
              <a>
                <IconLogo size='80px' color={PColor} />
              </a>
            </ActiveLink>
          </ItemHeader>
          <ItemHeader width='70%'>
            <InputSearch />
          </ItemHeader>
          <ItemHeader display={'none'}>
            <div className='delivery-location' onClick={() => setModalLocation(!modalLocation)}>
              <button ><IconLocationMap color={PColor} size={20} /> {uLocationKnow ? uLocationKnow : !!pais ? `${pais?.cName} ${department?.dName} ${city?.cName}` : null}</button>
              <span className='sub-location'>{pais && `${pais?.cName} ${department?.dName} ${city?.cName}`}</span>
            </div>
          </ItemHeader>
          <Options menu={menu} handleMenu={handleMenu} />
        </HeaderMainC>
      </ContentHeader>
      {/* {modalLocation && <Map setShowModal={setModalLocation} showModal={modalLocation} />} */}
    </div>
  )
}
export const ContentHeader = styled.div`
  width: 100%;
  box-shadow: inset 0 -1px 0 #dcdcdc;
  grid-area: head;
  justify-content: center;
  display: flex;
  height: fit-content;
  align-items: center;
  align-self: center;
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
export const ItemHeader = styled.div`
  justify-content: center;
  display: flex;
  height: fit-content;
  align-items: center;
  align-self: center;
   @media only screen and (max-width: 960px){
    width: ${({ width }) => width || '30%'};
    display: ${({ display }) => display};
    }
    
`
export const HeaderMainC = styled.header`
    width: 100%;
    display: flex;
    height: 80px;
    font-family: SulSans,Helvetica,sans-serif;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1366px;
    .delivery-location {
    font-family: PFont-Light;
    font-size: 100%;
    line-height: 1.15;
    width: 80%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    align-self: center;
    @media(max-width: 768px){
      display: none;
    }
      & button {
        background-color: transparent;
      }
      .sub-location {
        font-family: PFont-Light;
        font-size: 10px;
      }
    }
    `