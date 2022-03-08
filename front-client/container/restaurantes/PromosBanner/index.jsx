import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import { BannerPromo, ContainerCardProduct, Content, Img } from './styled';
import Link from 'next/link'
import CustomSlider from 'components/Slider';
import { SwiperSlide } from 'swiper/react'

export const PromosBanner = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [color, setActiveColor] = useState(null)
  // HANDLES
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
  const data = [
    {
      pId: 1,
      idStore: 8,
      StoreName: 'Remo comida',
      carProId: 8,
      images: 'images/DEFAULTBANNER.png',
      pName: 'Jugo natural',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 2,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Gaeosa litro',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 3,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 4,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 5,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 6,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 7,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 8,
      idStore: 8,
      StoreName: 'Remo comida',
      images: 'images/DEFAULTBANNER.png',
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
  ]
  return (
    <Content>
      <ContainerCardProduct>
        <CustomSlider
          spaceBetween={35}
          centeredSlides
          infinite={true}
          autoplay={true}
          slidesToShow={4}
          direction='horizontal' >
          {data?.map(products => (
            <SwiperSlide
              style={{ margin: '20px' }}
              key={products.pId}>
              <Link href={`/restaurantes/promos/${products.StoreName}/${products.pId}`}>
                <a>
                  <BannerPromo color={color} onMouseOut={() => setActiveColor('red')} onMouseOver={() => setActiveColor('blue')} key={products.pId}>
                    <Img src={products.images} alt={products.pName} />
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
