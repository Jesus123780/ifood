/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_DEVICES } from 'container/profile/queries'
import styled from 'styled-components'
import moment from 'moment'

export const Devices = () => {
  const { data: dataDevice } = useQuery(GET_ALL_DEVICES)
  const [deviceId, setDeviceId] = useState(false)
  useEffect(() => {
    setDeviceId(window.localStorage.getItem('deviceid'))
  }, [])
  return (
    <div>
      {dataDevice?.getDeviceUsers?.map(x => {return (
        <CardDevice key={x.dId}>
          <span className='device__icon'>
            {x.short_name === 'WIN' ?
              <svg
                fill='none'
                height='24'
                viewBox='0 0 24 24'
                width='24'
              ><rect
                  height='15.5'
                  rx='3.25'
                  stroke='#3E3E3E'
                  strokeWidth='1.5'
                  width='20.5'
                  x='1.75'
                  y='0.75'
              ></rect><path
                  d='M5 13L19 13'
                  stroke='#3E3E3E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
              ></path><path
                  d='M8 22C8 20.343 9.79133 19 12 19C14.2087 19 16 20.343 16 22H8Z'
                  stroke='#3E3E3E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
              ></path><path
                  d='M12 17L12.0017 19'
                  stroke='#3E3E3E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
              ></path></svg>
              : <svg
                fill='none'
                height='24'
                viewBox='0 0 24 24'
                width='24'
              ><rect
                  height='22.5'
                  rx='3.25'
                  stroke='#3E3E3E'
                  strokeWidth='1.5'
                  width='12.5'
                  x='5.75'
                  y='0.75'
              ></rect><path
                  d='M10 4H14'
                  stroke='#3E3E3E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
              ></path><path
                  d='M11 21H13'
                  stroke='#3E3E3E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
              ></path></svg>}
          </span>
          <div className='device__info'>
            <div className='device__description-wrapper'>
              <span className='device__description'> {x.deviceName} - {x.platform} </span>
              {deviceId === x.deviceId && <span className='device__current'>Current device </span>}
            </div>
            <span className='device__localization' tabIndex='0'> {x.short_name}</span>
            <span className='device__localization' tabIndex='0'> {x.locationFormat}</span>
            <span className='device__localization' tabIndex='0'> {moment(x.DatCre).format('YYYY-MM-DD')} </span>
          </div>
        </CardDevice>
      )})}
    </div>
  )
}

export const CardDevice = styled.div`
    align-items: center;
    display: flex;
    min-height: 69px;
    padding: 0.9375rem 1.25rem;
    position: relative;
    text-align: left;
    background: none;
    border: 0;
    border: 1px solid #ccc;
    width: 100%;
    border-radius: 5px;
    .device__icon{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__info{
      margin-left: 1.3125rem;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__description-wrapper{
      align-items: baseline;
      display: flex;
    }
    .device__description{
      color: #3e3e3e;
    margin-right: 0.5rem;
    font-size: 1rem;
    line-height: 1.375rem;
    }
    .device__current{
      color: #50a773;
      font-size: .75rem;
    line-height: 1rem;
    font-weight: 500;
    }
    .device__localization {
      color: #717171;
      font-size: .875rem;
    line-height: 1.25rem;
    }
`