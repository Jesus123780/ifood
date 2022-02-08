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
import { GET_ALL_COUNTRIES } from '../../gql/Location';

export const Restaurant = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const OPEN_MODAL_FILTER = useSetState(0)

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
      carProId: 8,
      pName: 'Jugo natural',  
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 2,
      idStore: 8,
      carProId: 8,
      pName: 'Gaeosa litro',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 3,
      idStore: 8,
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      ProDescription: 4.534
    },
    {
      pId: 4,
      idStore: 8,
      carProId: 8,
      pName: 'Perro caliente cubano',
      ProPrice: 4.534,
      ProDescuento: 4.534,
      // ProDescription: 4.534Quedamos atentos al envío de muestras de sus trabajos al correo sistemas@proyeccionhumana.org
    },
  ]
  const [openModal, setOpenModal] = useState(false);
  const handleOpenProducts = products => {
    setOpenModal(!openModal)
  }
  const { data: dataCountries } = useQuery(GET_ALL_COUNTRIES)
  console.log(dataCountries);
  
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
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map(products => (
          <Link href={`/categories/${products.StoreName}/${products.pId}`}>
            <a>
              <ItemCategory key={products.pId}>
                {/* <Img src={products.images} alt={products.pName} /> */}
              </ItemCategory>
            </a>
          </Link>
        ))}
      </List>
      {/* PRODUCT DEMO */}
      <ContainerCardProduct>
        {data?.map(products => (
          <CardProduct key={products.pId} onClick={() => handleOpenProducts(products)}>
            {products.pName}
            <RippleButton onClick={() => handleAddProduct(products)}>
              <IconPlus color={PColor} size={40} />
            </RippleButton>
          </CardProduct>
        ))}
      </ContainerCardProduct>
      {/* BEST RESTAURANT */}
      <H2>Los mejores restaurantes para ti</H2>
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map(products => (
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
