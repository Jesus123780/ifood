import React, { useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, CateItem, ContainerGrid, ContentCalcules, Input, OptionButton, ScrollbarProduct, Ticket, Wrapper } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardProducts } from 'container/producto/editar';
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper';
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { IconDelete, IconSales } from 'public/icons'
import { BGColor, PColor } from 'public/colors'
import { numberFormat } from 'utils'
import { RippleButton } from 'components/Ripple'
import { Loading, SpinnerColor, SpinnerColorJust } from 'components/Loading'
import { TextH2Main } from 'components/common/h2'
import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
const GenerateSales = () => {
    // STATES
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(50)
    const [search, setSearch] = useState('')
    const [delivery, setDelivery] = useState(true)
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    const [values, setValues] = useState({})
    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const initialStateInvoice = {
        PRODUCT: [],
    }
    // QUERIES
    const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
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
    // HANDLES
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
    return (
        <Wrapper>
            <AwesomeModal title="Añade el costo del envio" padding='25px' show={delivery} onHide={() => setDelivery(!delivery)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='5px' >
                <Input placeholder='costo de envio' value={values?.ValueDelivery} onChange={handleChange} name='ValueDelivery' />
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
                    <TextH2Main size='15px' color={BGColor} text={`$ ${numberFormat(totalProductPrice)}`} />
                </ContentCalcules>
            </Box>
        </Wrapper >
    )
}

GenerateSales.propTypes = {
    data: PropTypes.array
}

export default GenerateSales