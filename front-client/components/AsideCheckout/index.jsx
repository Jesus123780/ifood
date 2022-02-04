import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';
import { PColor } from '../../public/colors';
import { IconCancel } from '../../public/icons';
import { Overline } from '../common/Reusable';
import { RippleButton } from '../Ripple';
import { CardProduct, Content, LateralModal } from './styled';

export const AsideCheckout = ({ menu, handleMenu }) => {
  const { setAlertBox, state_product_card, dispatch } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: 'Habla', color: 'success' })
  }, []);
  return (
    <div>
      <Overline show={menu === 1} onClick={() => handleMenu(1)} />
      <LateralModal show={menu === 1}>
        <RippleButton bgColor='transparent' onClick={() => handleMenu(1)}>
          <IconCancel size='20px' color={PColor} />
        </RippleButton>
        <Content>
          {state_product_card?.PRODUCT?.length > 0 ? state_product_card.PRODUCT.map((product, idx) => (
            <CardProduct key={product.pId}>
              {product.pName}
              <RippleButton onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>Remove</RippleButton>
            </CardProduct>

          )) : <div>Carrito vacio</div>}
        </Content>
      </LateralModal>
    </div>
  );
};
