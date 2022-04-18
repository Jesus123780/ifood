import React, { useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, CateItem, ContainerGrid, ContentCalcules, FlipTop, Input, OptionButton, ScrollbarProduct, Ticket, Wrapper } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react';
// import { CardProducts } from 'container/producto/editar';
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper';
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { IconPrint, IconDelete, IconSales } from 'public/icons'
import { BGColor, PColor } from 'public/colors'
import { numberFormat, RandomCode } from 'utils'
import { RippleButton } from 'components/Ripple'
import { TextH2Main } from 'components/common/h2'
import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import { CardProducts } from 'components/CartProduct'
import { Prints } from './Printsale'
import { CREATE_MULTIPLE_ORDER_PRODUCTS } from './queries'
import { Context } from 'context/Context'
const GenerateSales = () => {
    // STATES
    const { setAlertBox } = useContext(Context)
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    const code = RandomCode(5)
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(50)
    const [search, setSearch] = useState('')
    const [delivery, setDelivery] = useState(false)
    const [print, setPrint] = useState(false)
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    const [values, setValues] = useState({})
    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const initialStateInvoice = {
        PRODUCT: [],
    }
    // QUERIES
    const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
    const [createMultipleOrderStore] = useMutation(CREATE_MULTIPLE_ORDER_PRODUCTS, {
        onCompleted: data => {
            if (data.createMultipleOrderStore.success === true) {
                console.log('first')
            }
        }
    })
    // llama a los productos y espera una acción
    /* Filtro  */
    const [productFoodsAll, { data: dataProduct, fetchMore, loading }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
        fetchPolicy: 'network-only',
        variables:
        {
            search: search,
            gender: searchFilter?.gender,
            desc: searchFilter?.desc,
            categories: searchFilter?.speciality,
        }
    })
    // EFFECTS 
    useEffect(() => {
        if (dataProduct?.productFoodsAll) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            setData([...dataProduct?.productFoodsAll])
        }
    }, [dataProduct, searchFilter, search])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMore, search: search } })
    }, [searchFilter, showMore, search])

    // const download = () => {
    //     window.print();
    //   };
    // eslint-disable-next-line
    const download = (elementId, uniqueIframeId) => {
        const content = document.getElementById(elementId)
        let pri
        if (document.getElementById(uniqueIframeId)) {
            pri = document.getElementById(uniqueIframeId).contentWindow
        } else {
            const iframe = document.createElement('iframe')
            iframe.setAttribute('title', uniqueIframeId)
            iframe.setAttribute('id', uniqueIframeId)
            // iframe.setAttribute('style', 'width: 155px; position: relative;')
            document.body.appendChild(iframe)
            pri = iframe.contentWindow
        }
        pri.document.open()
        pri.document.write(content.innerHTML)
        pri.document.close()
        pri.focus()
        pri.print()
    }
    const PRODUCT = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    // eslint-disable-next-line
                    PRODUCT: [...state?.PRODUCT, action?.payload]
                }
            case 'REMOVE_PRODUCT':
                return {
                    ...state,
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_PRODUCT_WALLET':
                return {
                    PRODUCT_WALLET: state?.PRODUCT_WALLET?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    ...state,
                    PRODUCT: []
                };
            case "TOGGLE_INVOICE":
                return {
                    ...state,
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const [data, dispatch] = useReducer(PRODUCT, initialStateInvoice)
    let suma = 0
    let total = 0
    useEffect(() => {
        data.PRODUCT.forEach((a) => {
            const { ProPrice } = a || {}
            suma += ProPrice
            setTotalProductPrice(Math.abs(suma))
        })
        if (data.PRODUCT.length === 0) {
            setTotalProductPrice(0)
        }
    }, [totalProductPrice, suma, total, data])
    const newArray = data?.PRODUCT?.map(x => { return x })

    console.log(newArray)
    const handleSales = async (bool) => {
        await createMultipleOrderStore({
            variables: {
                input: {
                    setInput: newArray || [],
                    change: parseInt(values?.change?.replace(/\./g, '')),
                    pickUp: 1,
                    totalProductsPrice: totalProductPrice,
                    pCodeRef: code,
                    payMethodPState: 1,
                    pPRecoger: 1,
                }
            },/*  update: (cache, { data: { getAllShoppingCard } }) => updateCache({
                cache,
                query: GET_ALL_SHOPPING_CARD,
                nameFun: 'getAllShoppingCard',
                dataNew: getAllShoppingCard
            }) */

        }).then(() => {
            if (bool) {
                console.log('first')
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))

    }
    return (
        <Wrapper>

            <AwesomeModal height='100vh' padding='25px' size='small' cancel='Guardar' confirm='Guardar y salir' show={print} onHide={() => setPrint(!print)} onConfirm={() => handleSales('confirm')} /* onCancel={() => handleSales()} */ btnCancel={true} btnConfirm={true} header={true} footer={true} borderRadius='5px' >
                <Prints code={code} change={values.change} data={data?.PRODUCT || []} total={`$ ${numberFormat(totalProductPrice)}`} />
            </AwesomeModal>
            <AwesomeModal title="Añade el costo del envio" padding='25px' show={delivery} onHide={() => setDelivery(!delivery)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='5px' >
                <Input autoComplete='off' placeholder='costo de envio' value={values?.ValueDelivery} onChange={handleChange} name='ValueDelivery'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.target.blur()
                            setDelivery(!delivery)
                        }
                    }}
                />
                <Input autoComplete='off' placeholder='Cambio' value={values?.change} onChange={handleChange} name='change'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.target.blur()
                            setDelivery(!delivery)
                        }
                    }}
                />
            </AwesomeModal>
            <Box>
                <Swiper
                    slidesPerView={6}
                    navigation
                    autoplay={true}
                    infinite={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    modules={[Virtual, Navigation, Pagination, /* Scrollbar, */ A11y, Parallax]}
                    spaceBetween={10}
                    virtual>
                    {datCat && datCat?.catProductsAll?.map((slideContent, index) => (
                        <SwiperSlide key={slideContent.carProId} virtualIndex={index} effect="fade">
                            <CateItem>
                                {slideContent.pName}
                            </CateItem>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <ScrollbarProduct>
                    <ContainerGrid>
                        {dataProducto.map((producto) => (
                            <CardProducts render={<IconSales size="20px" />} onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: producto })} key={producto.pId} ProDescription={producto.ProDescription} ProPrice={producto.ProPrice} pName={producto.pName} ProImage={producto.ProImage} ValueDelivery={producto.ValueDelivery} ProDescuento={producto.ProDescuento} />
                        ))}
                    </ContainerGrid>
                    <div>
                        <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                            setShowMore(s => s + 5)
                            fetchMore({
                                variables: { max: showMore, min: 0 },
                                updateQuery: (prevResult, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prevResult
                                    return {
                                        productFoodsAll: [...fetchMoreResult.productFoodsAll]

                                    }
                                }
                            })
                        }}>{loading ? 'Cargando' : 'CARGAR MÁS'}</RippleButton>

                    </div>
                </ScrollbarProduct>
            </Box>
            <Box width='40%'>
                <ScrollbarProduct margin={'0'}>
                    <h2>Productos a vender</h2>
                    <OptionButton>
                        <button onClick={() => setDelivery(!delivery)}> {values?.ValueDelivery ? <span>1</span> : <span className='free'>Gratis</span>}Costo de envio {numberFormat(values?.ValueDelivery)}</button>
                        <button> {!!totalProductPrice && <span>1</span>} Costo total $ {numberFormat(totalProductPrice)}</button>
                    </OptionButton>
                    <ContainerGrid>
                        {data?.PRODUCT?.length > 0 ? data.PRODUCT.map((producto, idx) => (
                            <CardProducts key={idx + 1} render={<IconDelete color={PColor} size="20px" />} onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })} ProDescription={producto.ProDescription} ProPrice={producto.ProPrice} pName={producto.pName} ProImage={producto.ProImage} ValueDelivery={producto.ValueDelivery} ProDescuento={producto.ProDescuento} />
                        )) : <div><IconSales size={100} /></div>}
                    </ContainerGrid>
                </ScrollbarProduct>
                <ContentCalcules>
                    <Box display='flex' width='60%'>
                        <TextH2Main size='15px' color={BGColor} text={`$ ${numberFormat(totalProductPrice)}`} />
                    </Box>
                    <Box display='flex' width='40%'>
                        <TextH2Main size='15px' color={BGColor} text={`$ ${numberFormat(totalProductPrice)}`} />
                        <FlipTop>
                            <Button onClick={() => setPrint(!print)} radius='50%'><IconPrint size={30} color={BGColor} /></Button>
                        </FlipTop>
                    </Box>
                </ContentCalcules>
            </Box>
        </Wrapper >
    )
}

GenerateSales.propTypes = {
    data: PropTypes.array
}

export default GenerateSales