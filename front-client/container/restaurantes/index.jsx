import React, { useContext, useState } from 'react';
import { AsideCheckout } from '../../components/AsideCheckout';
import { AwesomeModal } from '../../components/AwesomeModal';
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';
import { Context } from '../../context';
import { PColor } from '../../public/colors';
import { AddPlusCircle, IconLogo, IconPlus } from '../../public/icons';
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentFilter, ContentStores, CtnBox, CtnItemFilter, H2, ItemCategory, ItemFilter, List, WrapFlex } from './styled';
import Link from 'next/link'
import Tabs from '../../components/Tabs';
import { Range } from '../../components/InputRange';
import { useQuery } from '@apollo/client';
import { GET_ALL_SHOPPING_CARD, GET_ALL_RESTAURANT, GET_ALL_CAT_STORE } from './queries';
import { Categories } from './categories';
import { PromoBannerStores } from './PromosBanner';
import { BestRestaurant } from './BestRestaurant';

export const Restaurant = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const OPEN_MODAL_FILTER = useSetState(0)
  const { data: dataRestaurant } = useQuery(GET_ALL_RESTAURANT)
  const { data: getCatStoreLOL } = useQuery(GET_ALL_SHOPPING_CARD)
  const { data: getCatStore } = useQuery(GET_ALL_CAT_STORE)
  // HANDLES
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
  const [openModal, setOpenModal] = useState(false);
  const handleOpenProducts = products => {
    setOpenModal(!openModal)
  }
  return (
    <Content>
      <ContainerFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Ordenar</ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Env??os gratis</ItemFilter>
        <ItemFilter>Promociones</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state)}>Filtros</ItemFilter>
      </ContainerFilter>
      <H2>Categor??as</H2>
      <Categories />
      {/* PRODUCT DEMO */}
      {/* BEST RESTAURANT */}
      <PromoBannerStores />
      <H2>Los mejores restaurantes para ti</H2>
      <BestRestaurant />
      <AwesomeModal zIndex='9990' padding='25px' height='60vh' show={OPEN_MODAL_ORGANICE.state} onHide={() => { OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }} onCancel={() => false} size='80%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`B??sicos`}>
            <>
              <h2>Modo de entrega</h2>
              <ContainerFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>
              </ContainerFilter>
              <h2>Ordenar por</h2>
              <ContainerFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>
              </ContainerFilter>
              <h2>Distancia</h2>
              <Range min={1962} max={5000} value={2018} label="km" />
              <RippleButton widthButton='100%'>Ver resultados </RippleButton>
            </>
          </Tabs.Panel>
          <Tabs.Panel label={`Categor??as`}>
            <WrapFlex>
              {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => <ItemFilter key={index + 1} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>)} */}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
          <Tabs.Panel label={`M??todos de pago`}>
            <h2>Pago de la app</h2>
            <WrapFlex>
              {[1, 2, 3, 4, 5].map((item, index) => <ItemFilter key={index + 1} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Amex</ItemFilter>)}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
        </Tabs>
      </AwesomeModal >
      <AwesomeModal zIndex='9990' padding='25px' height='40vh' show={OPEN_MODAL_FILTER.state} onHide={() => { OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state) }} onCancel={() => false} size='60%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
        <h2>Ordenar por </h2>
        <ContentFilter>
          {[1, 2, 3, 4, 5].map((x, i) => (
            <CtnItemFilter key={i + 1}>
              <IconLogo color={PColor} size='52px' />
            </CtnItemFilter>
          ))}
        </ContentFilter>
      </AwesomeModal >
      <H2>Tiendas</H2>
    </Content>
  );
};
