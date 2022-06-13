import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import { BannerPromo, ContainerCardProduct, Content, Img, ContainerSliderPromo, CardPromo, ImageBannerPromo } from './styled';
import Link from 'next/link'
import Image from 'next/image';
import CustomSlider, { CustomArrow } from 'components/Slider';
import { SwiperSlide } from 'swiper/react'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners';
import { useQuery } from '@apollo/client';
import Slider from "react-slick";
import { IconArrowLeft, IconArrowRight } from 'public/icons';
import { PColor } from 'public/colors';
import { useRouter } from 'next/router'

export const Banner = () => {
  const location = useRouter()
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [color, setActiveColor] = useState(null)
  // HANDLES
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: "admin-server" }
  })

  // console.log(datapro.getAllPromoBanners)
  const handleAddProduct = elem => {
    handleMenu(1)
    let includes = state_product_card?.PRODUCT.includes(elem);
    console.log(includes)
    if (includes) {
      setAlertBox({ message: 'El producto ya esta en la lista' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }
  }
  return (
    <Content>
      {data && data?.getAllMasterBanners?.map(banner => (
        <Link
          key={banner.BannerId}
          prefetch={true}
          href={`/restaurantes/promos/${banner.name.replace(/\s/g, '-')}/${banner.BannerId}`}>
          <a>
            <BannerPromo color={color} onMouseOut={() => setActiveColor('red')} onMouseOver={() => setActiveColor('blue')} key={banner.pId}>
              <Img src={banner.path} alt={banner.description} />

            </BannerPromo>
          </a>
        </Link>
      ))}
      {/* <ContainerCardProduct>
        <CustomSlider 
        spaceBetween={35} centeredSlides infinite={false} autoplay={false} slidesToShow={4} direction='horizontal' >
          {data && data?.getAllMasterBanners?.map(banner => (
            <SwiperSlide
              style={{ margin: '20px' }}
              key={banner.BannerId}>
              <Link
                prefetch={true}
                href={`/restaurantes/promos/${banner.name.replace(/\s/g, '-')}/${banner.BannerId}`}>
                <a>
                  <BannerPromo color={color} onMouseOut={() => setActiveColor('red')} onMouseOver={() => setActiveColor('blue')} key={banner.pId}>
                    <Img src={banner.path} alt={banner.description} />
                  </BannerPromo>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </CustomSlider>
      </ContainerCardProduct> */}
    </Content >
  );
};
