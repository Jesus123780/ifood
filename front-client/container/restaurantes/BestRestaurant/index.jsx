import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import { BannerPromo, ContainerCardProduct, Content, Img, ContainerSliderPromo, CardPromo, ImageBannerPromo } from './styled';
import Link from 'next/link'
import CustomSlider from 'components/Slider';
import { SwiperSlide } from 'swiper/react'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners';
import { useQuery } from '@apollo/client';
import { ItemCategory, List } from '../styled';
import { GET_ALL_RESTAURANT } from '../queries';
import Row from 'components/common/Atoms/Row';

export const BestRestaurant = () => {
  // STATES
  const { data: dataListStore } = useQuery(GET_ALL_RESTAURANT)
  return (
    <Row maxWidth={'1766px'}>
      <ContainerCardProduct>
          {dataListStore?.getAllStoreInStore?.map((x, i) => (
            <SwiperSlide key={x + i}>
              <Link href={`/delivery/${x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${x.storeName}/${x.idStore}`}>
                <a>
                  <ItemCategory>
                    <Img src={x.path} alt={x.pName} />
                  </ItemCategory>
                </a>
              </Link>
            </SwiperSlide>
          ))}
      </ContainerCardProduct>
    </Row >
  );
};