import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
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
  const result = state_product_card?.PRODUCT.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || [];
    r[a.getStore?.storeName].push(a);
    return r;
  }, Object.create(null));
  const [data, setData] = useState(result);
  console.log(data)
  return (
    <div>
      <Overline show={menu === 1} onClick={() => handleMenu(1)} />
      <LateralModal show={menu === 1}>
        <RippleButton bgColor='transparent' onClick={() => handleMenu(1)}>
          <IconCancel size='15px' color={PColor} />
        </RippleButton>
        <Content>
          <div class="restaurant-cart-header">Tu pedido en</div>
          <div>
            {state_product_card?.PRODUCT?.map(x => {
              const list = result[x.getStore.storeName]
              console.log(list)
              return (
                <div key={x._id}>
                  {list.map(list => (
                    <div list={list}>
                      asduasodo
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
          {state_product_card?.PRODUCT?.length > 0 ? state_product_card.PRODUCT.map((product, idx) => (
            <CardProduct key={product.pId}>
              <Link href={`delivery/${product.getStore.city.cName?.toLocaleLowerCase()}-${product.getStore.department.dName?.toLocaleLowerCase()}/${product.getStore.storeName}/${product.getStore.idStore}`}>
                <a>
                  <Text margin={'0 0 0 10px'} color={PColor} >{product.getStore.storeName}</Text>
                </a>
              </Link>
              <div className='item-line'>

                <Text>{product.pName}</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                  <Text color={APColor}> $ {product.ProPrice}</Text>
                  <Text size='25px' margin={'0 0 0 10px'} line>$ {product.ProDescuento}</Text>
                </div>
                <div className="footer" style={{ display: 'flex' }}>
                  <Link href={`/proceso-de-compra/${product?.pId}/${product?.getStore?.idStore}/${RandomCode(20)}`}>
                    <a>
                      <Text color={PColor} >Pagar</Text>
                    </a>
                  </Link>
                  <Text margin={'0 0 0 10px'} onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>Remove</Text>
                </div>
              </div>
            </CardProduct>

          )) : <div>Carrito vacio</div>}
        </Content>
      </LateralModal>
    </div>
  );
};
