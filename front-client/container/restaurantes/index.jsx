import React, { useContext, useState } from 'react';
import { AsideCheckout } from '../../components/AsideCheckout';
import { AwesomeModal } from '../../components/AwesomeModal';
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';
import { Context } from '../../context';
import { PColor } from '../../public/colors';
import { AddPlusCircle, IconLogo, IconPlus } from '../../public/icons';
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentFilter, ContentStores, CtnItemFilter, H2, ItemCategory, ItemFilter, List, WrapFlex } from './styled';
import Link from 'next/link'
import Tabs from '../../components/Tabs';
import { Range } from '../../components/InputRange';
import { useQuery } from '@apollo/client';
import { GET_ALL_SHOPPING_CARD, GET_ALL_RESTAURANT, GET_ALL_CAT_STORE } from './queries';
import Image from 'next/image';

export const Restaurant = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const OPEN_MODAL_FILTER = useSetState(0)
  const { data: dataRestaurant } = useQuery(GET_ALL_RESTAURANT)
  const { data: getCatStoreLOL } = useQuery(GET_ALL_SHOPPING_CARD)
  console.log(getCatStoreLOL)
  const { data: getCatStore } = useQuery(GET_ALL_CAT_STORE)
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
  const [openModal, setOpenModal] = useState(false);
  const handleOpenProducts = products => {
    setOpenModal(!openModal)
  }
  return (
    <Content>
      <ContainerFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Ordenar</ItemFilter>
        <ItemFilter>Mas cercano</ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Mas caro</ItemFilter>
        <ItemFilter>Envíos gratis</ItemFilter>
        <ItemFilter>Promociones</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state)}>Filtros</ItemFilter>
      </ContainerFilter>
      {/* CATEGORIES */}
      <H2>Categorías</H2>
      <List>
        {getCatStore?.getAllCatStore?.map(cat => (
          <Link href={`/categories/${cat.StoreName}/${cat.pId}`}>
            <a>
              <ItemCategory key={cat.pId}>
                <Image
                  objectFit='contain'
                  width={90}
                  height={90}
                  src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                  alt="Picture of the author"
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading

                />
              </ItemCategory>
              <h2 className="title-cat">{cat.cName}</h2>
            </a>
          </Link>
        ))}
      </List>
      {/* PRODUCT DEMO */}
      {/* BEST RESTAURANT */}
      <H2>Los mejores restaurantes para ti</H2>
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(products => (
          <Link href={`/categories/${products.StoreName}/${products.pId}`}>
            <a>
              <ItemCategory key={products.pId}>
                {/* <Img src={products.images} alt={products.pName} /> */}
              </ItemCategory>
            </a>
          </Link>
        ))}
      </List>
      <AwesomeModal zIndex='9990' padding='25px' height='60vh' show={OPEN_MODAL_ORGANICE.state} onHide={() => { OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }} onCancel={() => false} size='80%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`Básicos`}>
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
          <Tabs.Panel label={`Categorías`}>
            <WrapFlex>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => <ItemFilter key={item._id} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Entrega a domicilio</ItemFilter>)}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
          <Tabs.Panel label={`Métodos de pago`}>
            <h2>Peso promedio</h2>
            <WrapFlex>
              {[1, 2, 3, 4, 5].map((item, index) => <ItemFilter key={item._id} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>$$$$$</ItemFilter>)}
            </WrapFlex>
            <h2>Pago de la app</h2>
            <WrapFlex>
              {[1, 2, 3, 4, 5].map((item, index) => <ItemFilter key={item._id} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Amex</ItemFilter>)}
            </WrapFlex>
            <h2>Pago contra entrega</h2>
            <WrapFlex>
              {[1, 2, 3, 4, 5].map((item, index) => <ItemFilter key={item._id} onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Amex</ItemFilter>)}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
        </Tabs>
      </AwesomeModal >
      <AwesomeModal zIndex='9990' padding='25px' height='40vh' show={OPEN_MODAL_FILTER.state} onHide={() => { OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state) }} onCancel={() => false} size='60%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
        <h2>Ordenar por </h2>
        <ContentFilter>
          {[1, 2, 3, 4, 5].map(x => (
            <CtnItemFilter key={x._id}>
              <IconLogo color={PColor} size='52px' />
            </CtnItemFilter>
          ))}
        </ContentFilter>
      </AwesomeModal >
      <H2>Tiendas</H2>
    </Content>
  );
};
