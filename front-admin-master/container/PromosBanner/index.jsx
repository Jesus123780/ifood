import React, { useContext, useState } from 'react';
// import { Context } from '../../../context';
import { BannerPromo, ContainerCardProduct, Content, Img, ContainerSliderPromo, CardPromo, ImageBannerPromo, Text } from './styled';
import Link from 'next/link'
import CustomSlider from 'components/Slider';
import { SwiperSlide } from 'swiper/react'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners';
import { useQuery, useMutation } from '@apollo/client';
import { Context } from 'context/Context';
import { CLIENT_URL_BASE } from 'apollo/urls';
import { IconDelete } from 'public/icons';
import { PColor } from 'public/colors';
import { DELETE_BANNERS, DELETE_BANNERS_MASTER } from './querys';
import { updateCache } from 'utils';

export const PromosBanner = () => {
  // STATES
  const [color, setActiveColor] = useState(null)
  // HANDLES
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: "admin-server" }
  })
  const [deleteOneBannerMaster] = useMutation(DELETE_BANNERS_MASTER, {
    context: { clientName: "admin-server" }
  })
  return (
    <Content>
      <ContainerCardProduct>
        <CustomSlider spaceBetween={35} centeredSlides infinite={false} autoplay={false} slidesToShow={4} direction='horizontal' >
          {data && data?.getAllMasterBanners?.map(banner => (
            <SwiperSlide
              style={{ margin: '20px' }}
              key={banner.BannerId}>
              <CardPromo height={'200px'}>
                <div className="goto-action">
                  <Link href={`${CLIENT_URL_BASE}restaurantes/promos/${banner.name.replace(/\s/g, '-')}/${banner.BannerId}`}>
                    <a target='_blank'>
                      <BannerPromo color={color} onMouseOut={() => setActiveColor('red')} onMouseOver={() => setActiveColor('blue')} key={banner.pId}>
                        <Img src={banner.path} alt={banner.description} />
                      </BannerPromo>
                    </a>
                  </Link>
                  <button className="btn btn-delete-master-banner" onClick={() => deleteOneBannerMaster({
                    variables: { BannerId: banner.BannerId, BannersState: banner.BannersState, path: banner.name }, update: (cache, { data: { getAllMasterBanners } }) => updateCache({
                      cache,
                      query: GET_ALL_BANNERS,
                      nameFun: 'getAllMasterBanners',
                      dataNew: getAllMasterBanners
                    })
                  })}><IconDelete color={PColor} size='30px' /></button>
                </div>
              </CardPromo>
            </SwiperSlide>
          ))}
        </CustomSlider>
      </ContainerCardProduct>
    </Content >
  );
};

export const PromoBannerStores = () => {
  const [deleteOneBannerPromo] = useMutation(DELETE_BANNERS, {
    context: { clientName: "admin-server" }
  })
  const { data: datapro } = useQuery(GET_ALL_BANNERS_PROMO, {
    context: { clientName: "admin-server" }
  })
  console.log(datapro)
  const chartColor = ['rgba(1,25,71, 0.0001)', 'rgb(1,25,71)', 'rgb(255 0 0 / 0%)']
  // const final = 
  const final = `0deg, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 0%, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 100%`
  // const  dataFinal = datapro?.getAllPromoBanners.slice(0, 1)
  return (
    <ContainerSliderPromo>
      {datapro && datapro?.getAllPromoBanners?.map(pb => (
        <CardPromo final={final} key={pb.bpId}>
          <ImageBannerPromo src={pb.path} alt={pb.description} />
          <div className="goto-action">
            <Text>{pb.name}</Text>
            <button className="btn" onClick={() => deleteOneBannerPromo({
              variables: { bpId: pb.bpId, bpState: pb.bpState, path: pb.name }, update: (cache, { data: { getAllPromoBanners } }) => updateCache({
                cache,
                query: GET_ALL_BANNERS_PROMO,
                nameFun: 'getAllPromoBanners',
                dataNew: getAllPromoBanners
              })
            })}><IconDelete color={PColor} size='30px' /></button>
          </div>
        </CardPromo>
      ))}
    </ContainerSliderPromo>
  )
}
