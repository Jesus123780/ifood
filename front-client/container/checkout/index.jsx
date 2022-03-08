import React, { useEffect, useRef, useState } from 'react';
import { APColor, PColor } from '../../public/colors';
import { RippleButton } from '../../components/Ripple'
import { Anchor, Body, Card, CardPro, Column, ContainerAnimation, ContainerAnimationTow, ContentInfo, flex, Text, Wrapper } from './styled';
import { numberFormat, RandomCode, updateCache } from '../../utils';
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ALL_SHOPPING_CARD } from '../restaurantes/queries';
import { useFormTools } from '../../components/BaseForm'
import { useMutation, useQuery } from '@apollo/client';
import { CardProduct, ContentTotal, GarnishChoicesHeader } from '../../components/AsideCheckout/styled';
import { CREATE_MULTIPLE_ORDER_PRODUCTS, DELETE_ONE_ITEM_SHOPPING_PRODUCT } from './queries';
import { useRouter } from 'next/router';
import { CREATE_ONE_STORE_PEDIDO } from '../confirmCheckout/queries';
import { IconGoogleLocation, IconLocationMap } from '../../public/icons';

export const Checkout = ({ setAlertBox, setCountItemProduct, locationStr, setModalLocation }) => {
    // STATE
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [active, setActive] = useState(1)
    const router = useRouter()
    const [key, setSetKey] = useState([])
    const code = RandomCode(10)
    const handleClick = index => {
        setActive(index === active ? true : index)
    }
    // QUERIES
    const { data: dataShoppingCard, loading } = useQuery(GET_ALL_SHOPPING_CARD)
    const result = dataShoppingCard?.getAllShoppingCard.reduce(function (r, a) {
        r[a.getStore?.storeName] = r[a.getStore?.storeName] || [];
        r[a.getStore?.storeName].push(a);
        return r;
    }, Object.create(null));
    const [deleteOneItem] = useMutation(DELETE_ONE_ITEM_SHOPPING_PRODUCT, {
        onCompleted: data => {
            setAlertBox({ message: data?.deleteOneItem?.message })
            if (dataShoppingCard?.getAllShoppingCard.length === 1) {
                setAlertBox({ message: 'Tu carrito esta vació' })
                // router.replace('/restaurantes')
            }
        }
    })
    const [createOnePedidoStore] = useMutation(CREATE_ONE_STORE_PEDIDO)
    const [createMultipleOrderStore] = useMutation(CREATE_MULTIPLE_ORDER_PRODUCTS, {
        onCompleted: data => {
            if (data.createMultipleOrderStore.success === true) {
                router.push('/proceso-de-compra/finalizar')
            }
        }
    })
    const { department, pais, uLocationKnow, city } = locationStr || {}
    const { dName } = department || {}
    const { cName } = city || {}
    const { cName: country } = pais || {}
    const objLocation = { dName, uLocationKnow, cName, country }
    console.log(objLocation)
    const newArray = dataShoppingCard?.getAllShoppingCard.map(x => { return { ShoppingCard: x.ShoppingCard, idStore: x.getStore.idStore } })
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    const handleSubmitPedido = async e => {
        await createMultipleOrderStore({
            variables: {
                input: {
                    setInput: newArray,
                    change: parseInt(dataForm?.change?.replace(/\./g, '')),
                    pickUp: 1,
                    totalProductsPrice: totalProductPrice,
                    pCodeRef: code,
                    payMethodPState: 1,
                    pPRecoger: 1,
                    locationUser: JSON.stringify(objLocation)
                }
            }
        }).then(x => {

        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
    }
    // EFFECTS
    useEffect(() => {
        if (!loading && dataShoppingCard !== null) {
            const dataProduct2 = Object.keys(result)
            setSetKey(dataProduct2)
            setCountItemProduct(dataShoppingCard?.getAllShoppingCard.length || 0)
        }
    }, [dataShoppingCard])
    const sumProduct = (ProPrice, ProDelivery, cant) => {
        const price = parseInt(ProPrice)
        const priceFinal = cant * price

        const delivery = parseInt(ProDelivery ? ProDelivery : 0)
        return delivery ? priceFinal + delivery : priceFinal
    }
    const refs = useRef([React.createRef(), React.createRef()])
    let total = 0
    let suma = 0
    // const sumSubTotal = arr => arr && arr?.reduce((sum, { values }) => sum + values, 0)
    useEffect(() => {
        dataShoppingCard?.getAllShoppingCard.forEach((a) => {
            const { productFood, cantProducts } = a || {}
            const { ProPrice, ValueDelivery } = productFood || {}
            let PriceFinal = (ProPrice * cantProducts) + ValueDelivery
            suma += PriceFinal
            setTotalProductPrice(suma)
        })
    }, [totalProductPrice, suma, total, dataShoppingCard])
    // HANDLESS
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
        <Body>
            <Card>
                <RippleButton active={active === 1} margin='0px 5px' borderRadius='0' color="red" padding="10px" bgColor='transparent' label='Entrega' onClick={() => active !== 1 && handleClick(1)} />
                {/* <RippleButton active={active === 2} margin='0px 5px' borderRadius='0' color="red" padding="10px" bgColor='transparent' label='Recoger' onClick={() => active !== 2 && handleClick(2)} /> */}
                <ContentInfo>
                    <div className="ctn-location" onClick={() => setModalLocation(true)}>
                        <button >
                            <IconGoogleLocation color={PColor} size={70} />
                        </button>
                        <div className='delivery-location' onClick={() => setModalLocation(true)}>
                            <span ><IconLocationMap color={PColor} size={20} /> {uLocationKnow ? uLocationKnow : !!pais ? `${pais?.cName} ${department?.dName} ${city?.cName}` : null}</span>
                            <span className='sub-location'>{pais && `${pais?.cName} ${department?.dName} ${city?.cName}`}</span>
                        </div>
                    </div>
                    {active === 1 ?
                        <ContainerAnimation>
                            <InputHooks
                                title='cambio'
                                width={'100%'}
                                required
                                error={errorForm?.change}
                                value={numberFormat(dataForm?.change)}
                                onChange={handleChange}
                                name='change'
                            />
                        </ContainerAnimation> :
                        active === 2
                            ?
                            <ContainerAnimationTow>
                                <ProcessCheckoutCard

                                />
                            </ContainerAnimationTow>
                            : null}
                    <RippleButton widthButton='100%' margin='20px auto' disabled={false} onClick={() => handleSubmitPedido()}>Hacer pedido</RippleButton>
                </ContentInfo>
            </Card>
            <Card>
                <CardPro>
                    {key?.map(store => {
                        return (
                            <div>
                                <div>
                                    <Text className='garnish-choices__title' size='30px'>{store}</Text>
                                </div>
                                <div key={store.store}>
                                    {dataShoppingCard?.getAllShoppingCard.length > 0 ? result[store]?.map((product, idx) => (
                                        <CardProduct key={product.ShoppingCard}>
                                            <div className='item-line'>
                                                <Text margin={'40px 0'} size='20px'>{product.productFood?.pName}</Text>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                                                    <Text color={APColor}> $ {numberFormat(product.productFood?.ProPrice)}</Text>
                                                    <Text color={APColor}> Cantidad {numberFormat(product.cantProducts)}</Text>
                                                    <Text size='25px' margin={'0 0 0 10px'} line>$ {numberFormat(product.productFood?.ProDescuento)}</Text>
                                                </div>
                                                <div className="footer" style={{ display: 'flex' }}>
                                                    <Text color={PColor} >Editar</Text>
                                                    <button onClick={() => handleDeleteItemShopping(product)}>
                                                        <Text color='#ccc' margin={'0 0 0 10px'} >Eliminar</Text>
                                                    </button>
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
                    <Wrapper styles={flex}>

                        <Text bold='900' size='30px' >Total</Text>
                        <Text color={PColor} bold='900' size='30px' >$ {numberFormat(dataShoppingCard?.getAllShoppingCard.length > 0 && totalProductPrice)}</Text>
                    </Wrapper>
                </CardPro>

            </Card>
        </Body>
    )
};


const ProcessCheckoutCard = props => {
    return (
        <div>
            <Wrapper border>
                <Text>Estandar</Text>
            </Wrapper>
        </div>
    )
}

ProcessCheckoutCard.propTypes = {}
