import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import { BannerPromo, ContainerCardProduct, Content, Img, ContainerSliderPromo, CardPromo, ImageBannerPromo } from './styled';
import Link from 'next/link'
import CustomSlider from 'components/Slider';
import { SwiperSlide } from 'swiper/react'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners';
import { useQuery } from '@apollo/client';

export const PromosBanner = () => {
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
      setAlertBox({ message: 'The invoice is already added to the list' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }
  }
  return (
    <Content>
      <ContainerCardProduct>
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
      </ContainerCardProduct>
    </Content >
  );
};

export const PromoBannerStores = () => {
  const { data: datapro } = useQuery(GET_ALL_BANNERS_PROMO, {
    context: { clientName: "admin-server" }
  })
  const chartColor = ['rgba(1,25,71, 0.0001)', 'rgb(1,25,71)', 'rgb(255 0 0 / 0%)']
  // const final = 
  const final = `0deg, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 0%, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 100%`
  const dataFinal = datapro?.getAllPromoBanners?.slice(0, 3)
  return (
    <ContainerSliderPromo>
      {datapro && dataFinal?.map(pb => (
        <CardPromo final={final} key={pb.bpId}>
          <ImageBannerPromo src={pb.path} alt={pb.description} />
          <div className="goto-action">
            <span className="text">{pb.name}</span>
          </div>
        </CardPromo>
      ))}
    </ContainerSliderPromo>
  )
}
