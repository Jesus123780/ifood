import React from 'react'
import { GET_BANNER_PROMO_DASHBOARD } from './queries'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import styled from 'styled-components'
import { PColor } from '../../public/colors'

export const BannerDashboard = () => {
  const { data } = useQuery(GET_BANNER_PROMO_DASHBOARD, {
    variables: {
      min: 3,
      max: 3,
    }
  })
  return (
    <ContainerBanner>
      {!!data && data?.getPromoStoreAdmin.map((x, i) => {return (
        <div className='wrapper' key={i + 1}>
          <Image
            alt={'Picture of the author'}
            blurDataURL='/app/images/DEFAULTBANNER.png'
            height={100}
            layout='fixed'
            objectFit='cover'
            placeholder='blur'
            src={'/app/images/bannerdashboard.jpg'}
            width={1000}
          />
        </div>
      )})}
    </ContainerBanner>
  )
}

const ContainerBanner = styled.div`
    
    .wrapper {
    width: 100%;
    box-shadow: 0px 0px 14px #00000017;
    background-color: ${PColor};
    border: none;
    position: relative;
    border-radius: 10px;
    overflow: hidden;   
    color: #3f3e3e;
    cursor: pointer;
    height: 100px;
    color: #3f3e3e;
    font-family: PFont-Light;
    margin-bottom: 10px;
    word-break: break-word;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    span {
        width: 1021px !important;
    }
    }
`