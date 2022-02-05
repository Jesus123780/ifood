import React, { useContext, useState } from 'react';
import { AsideCheckout } from '../../components/AsideCheckout';
import { AwesomeModal } from '../../components/AwesomeModal';
import { useSetState } from '../../components/hooks/useState';
import { RippleButton } from '../../components/Ripple';
import { Context } from '../../context';
import { PColor } from '../../public/colors';
import { AddPlusCircle, IconPlus } from '../../public/icons';
import { CardProduct, ContainerCardProduct, ContainerFilter, Content, ContentStores, H2, ItemCategory, ItemFilter, List } from './styled';
import Link from 'next/link'

export const Restaurant = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const OPEN_MODAL_ORGANICE = useSetState(0)

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
  return (
    <Content>
      <ContainerFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Ordenar</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Mas cercano</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Mejor precio</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Mas caro</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Envio gratis</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Promociones</ItemFilter>
        <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Descuentos</ItemFilter>
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
      <H2>Tiendas</H2>
      <ContentStores>

      </ContentStores>
    </Content>
  );
};
