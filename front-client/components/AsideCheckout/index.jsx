import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../context';
import { APColor, PColor } from '../../public/colors';
import { IconCancel } from '../../public/icons';
import { RandomCode } from '../../utils';
import { Overline } from '../common/Reusable';
import { RippleButton } from '../Ripple';
import { CardProduct, Content, LateralModal, Text } from './styled';
// 1007595323.
export const AsideCheckout = ({ menu, handleMenu }) => {
  const { setAlertBox, state_product_card, dispatch } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  }, []);
  console.log(state_product_card?.PRODUCT)

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
              <Text>{product.pName}</Text>
              <div style={{ display: 'flex' }}>
                <Text color={APColor}>{product.ProPrice}</Text>
                <Text margin={'0 0 0 10px'} line>{product.ProDescuento}</Text>
              </div>
              <div className="footer" style={{ display: 'flex' }}>
                <Text onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>Remove</Text>
                <Link href={`/proceso-de-compra/${product?.pId}/${product?.getStore?.idStore}/${RandomCode(20)}`}>
                  <a>
                    <Text margin={'0 0 0 10px'} color={PColor} >Pagar</Text>
                  </a>
                </Link>
              </div>
            </CardProduct>

          )) : <div>Carrito vacio</div>}
        </Content>
      </LateralModal>
    </div>
  );
};
