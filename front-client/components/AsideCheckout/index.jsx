import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DELETE_ONE_ITEM_SHOPPING_PRODUCT } from '../../container/checkout/queries';
import { GET_ALL_SHOPPING_CARD } from '../../container/restaurantes/queries';
import { Context } from '../../context';
import { APColor, PColor } from '../../public/colors';
import { IconCancel } from '../../public/icons';
import { numberFormat, RandomCode, updateCache } from '../../utils';
import { Overline } from '../common/Reusable';
import { RippleButton } from '../Ripple';
import { CREATE_SHOPPING_CARD } from './querys';
import { CardProduct, Content, LateralModal, Text, ActionPay, ContentTotal, GarnishChoicesHeader } from './styled';

export const AsideCheckout = ({ menu }) => {
  const { setAlertBox, state_product_card, dispatch, setCountItemProduct, handleMenu } = useContext(Context)
  const [registerShoppingCard] = useMutation(CREATE_SHOPPING_CARD)
  const { data: dataShoppingCard, loading } = useQuery(GET_ALL_SHOPPING_CARD)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  }, []);
  const result = state_product_card?.PRODUCT.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || [];
    r[a.getStore?.storeName].push(a);
    return r;
  }, Object.create(null));
  const result2 = dataShoppingCard?.getAllShoppingCard.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || [];
    r[a.getStore?.storeName].push(a);
    return r;
  }, Object.create(null));
  const [key, setSetKey] = useState([])
  useEffect(() => {
    if (!loading && dataShoppingCard !== null) {
      const dataProduct2 = Object.keys(result2)
      setSetKey(dataProduct2)
      setCountItemProduct(dataShoppingCard?.getAllShoppingCard.length || 0)
    }
  }, [dataShoppingCard])

  const dataProduct = Object.keys(result)
  const PRODUCTS_TO_STORE = dataProduct?.map(date => result[date]?.map((x, idx) => { return parseInt(x.ProPrice) + parseInt(x.ValueDelivery) }))
  const sumProduct = (ProPrice, ProDelivery, cant) => {
    const price = parseInt(ProPrice)
    const priceFinal = cant * price
    const delivery = parseInt(ProDelivery ? ProDelivery : 0)
    return delivery ? priceFinal + delivery : priceFinal
  }
  const refs = useRef([React.createRef(), React.createRef()])
  useEffect(() => {
    refs.current = refs.current.splice(0, state_product_card?.PRODUCT?.length)
    for (let i = 0; i < state_product_card?.PRODUCT?.length; i++) {
      refs.current[i] = refs.current[i] || React.createRef()
    }
    refs.current = refs.current.map(item => item || React.createRef())
  }, [state_product_card])
  const ArrayValues = refs.current.map(item => { return { value: item?.current?.innerHTML?.replace(/\./g, '') } })
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  let total = 0
  let suma = 0
  // const sumSubTotal = arr => arr && arr?.reduce((sum, { values }) => sum + values, 0)
  useEffect(() => {
    dataShoppingCard?.getAllShoppingCard.forEach((a) => {
      const { productFood, cantProducts } = a || {}
      const { ProPrice, ValueDelivery } = productFood || {}
      const PriceFinal = cantProducts * (ProPrice + ValueDelivery)
      suma = total += PriceFinal
      setTotalProductPrice(suma)
    })
    // let sum = 0;
    // for (let i = 0; i < ArrayValues.length; i++) {
    //   const { value } = ArrayValues[i]
    //   const valueFinal = parseFloat(value)
    //   sum += valueFinal
    //   setTotalProductPrice(sum)
    // }
  }, [totalProductPrice, suma, total, dataShoppingCard])
  const [deleteOneItem] = useMutation(DELETE_ONE_ITEM_SHOPPING_PRODUCT, {
    onCompleted: data => {
      setAlertBox({ message: data?.deleteOneItem?.message })
      if (dataShoppingCard?.getAllShoppingCard.length === 1) {
        setAlertBox({ message: 'Tu carrito esta vació' })
        handleMenu(false)
      }
    }
  })
  const handleDeleteItemShopping = item => {
    deleteOneItem({
      variables: {
        cState: item.cState,
        ShoppingCard: item.ShoppingCard
      }, update: (cache, { data: { getAllShoppingCard } }) => updateCache({
        cache,
        query: GET_ALL_SHOPPING_CARD,
        nameFun: 'getAllShoppingCard',
        dataNew: getAllShoppingCard
      })
    })

  }
  return (
    <div>
      <Overline show={menu === 1} onClick={() => handleMenu(1)} />
      <LateralModal show={menu === 1}>
        <RippleButton bgColor='transparent' onClick={() => handleMenu(1)}>
          <IconCancel size='15px' color={PColor} />
        </RippleButton>
        <Content>
          <div className="restaurant-cart-header">Tu pedido en</div>
          <div>
            {key?.map(store => {
              return (
                <div>
                  <GarnishChoicesHeader>
                    <Text className='garnish-choices__title' size='30px'>{store}</Text>
                  </GarnishChoicesHeader>
                  <div key={store.store}>
                    {dataShoppingCard?.getAllShoppingCard.length > 0 ? result2[store]?.map((product, idx) => (
                      <CardProduct key={product.ShoppingCard}>
                        {/* <Link href={`delivery/${product.getStore.city.cName?.toLocaleLowerCase()}-${product.getStore.department.dName?.toLocaleLowerCase()}/${product.getStore.storeName}/${product.getStore.idStore}`}>
                          <a>
                            <Text margin={'0 0 0 10px'} color={PColor} >{product.getStore.storeName}</Text>
                          </a>
                        </Link> */}
                        <div className='item-line'>
                          <Text margin={'40px 0'} size='20px'>{product.productFood?.pName}</Text>
                          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                            <Text color={APColor}> $ {numberFormat(product.productFood?.ProPrice)}</Text>
                            <Text color={APColor}> Cantidad {numberFormat(product.cantProducts)}</Text>
                            <Text size='25px' margin={'0 0 0 10px'} line>$ {numberFormat(product.productFood?.ProDescuento)}</Text>
                          </div>
                          <div className="footer" style={{ display: 'flex' }}>
                            <Text color={PColor} >Editar</Text>
                            <Text color='#ccc' margin={'0 0 0 10px'} onClick={() => handleDeleteItemShopping(product)}>Eliminar</Text>
                            {/* <Link href={`/proceso-de-compra/${product.productFood?.pId}/${product?.getStore?.idStore}/${RandomCode(20)}`}>
                              <a>
                                <Text color={PColor} >Pagar</Text>
                              </a>
                            </Link>
                            <Text color='#ccc' margin={'0 0 0 10px'} onClick={() => dispatch({ type: 'REMOVE_PRODUCT.productFood', idx })}>Eliminar</Text> */}
                          </div>
                        </div>
                        <ContentTotal>
                          <Text margin={'0 0 0 10px'} > Subtotal</Text>
                          <Text margin={'0 0 0 10px'} >$ {numberFormat(product.productFood?.ProPrice)}</Text>
                        </ContentTotal>
                        <ContentTotal>
                          <Text margin={'0 0 0 10px'} >Costo de envio</Text>
                          {product.productFood?.ValueDelivery !== null || 0 ? <Text margin={'0 0 0 10px'} >$ {numberFormat(product.productFood?.ValueDelivery)}</Text> : <Text color={APColor}>Gratis</Text>}
                          {/* <Text margin={'0 0 0 10px'} >{numberFormat(product.productFood?.ValueDelivery)}</Text> */}
                        </ContentTotal>
                        <ContentTotal>
                          <Text margin={'0 0 0 10px'} >Costo Final</Text>
                          <Text margin={'0 0 0 10px'} ref={refs.current[idx]}>$ {numberFormat(sumProduct(product.productFood?.ProPrice, product.productFood?.ValueDelivery, product.cantProducts))}</Text>
                        </ContentTotal>
                      </CardProduct>
                    )) : <div>Carro vació</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </Content>
        <ActionPay>
          <ContentTotal>
            <Text bold='900'>Total</Text>
            <Text bold='900'>$ {numberFormat(dataShoppingCard?.getAllShoppingCard.length > 0 && totalProductPrice)}</Text>
          </ContentTotal>
          <Link href='/proceso-de-compra'>
            <a>
              <RippleButton widthButton='100%' margin={'auto'} >Eligir método de pago</RippleButton>
            </a>
          </Link>
        </ActionPay>
      </LateralModal>
    </div>
  );
};
