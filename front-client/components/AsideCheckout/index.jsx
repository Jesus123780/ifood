import React from 'react';
import { PColor } from '../../public/colors';
import { IconCancel } from '../../public/icons';
import { LateralModal } from './styled';

export const AsideCheckout = ({ menu, handleMenu }) => {
  console.log(menu, 'JESUS');
  return <LateralModal show={menu}>
    <button onClick={() => handleMenu(1)}>
      <IconCancel size='20px' color={PColor} />
    </button>
    Tu carrito está vacío
  </LateralModal>;
};
