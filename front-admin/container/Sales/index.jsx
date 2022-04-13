import React, { useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, CateItem, ContainerGrid, ContentCalcules, ScrollbarProduct, Ticket, Wrapper } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardProducts } from 'container/producto/editar';
import { Virtual, Navigation, Pagination, Scrollbar, A11y, Parallax } from 'swiper';
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { IconDelete, IconSales } from 'public/icons'
import { PColor } from 'public/colors'
import { numberFormat } from 'utils'
const GenerateSales = () => {
    // STATES
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(50)
    const [search, setSearch] = useState('')
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    const initialStateInvoice = {
        PRODUCT: [],
    }
    // QUERIES
    const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
    // llama a los productos y espera una acción
    /* Filtro  */
    const [productFoodsAll, { data: dataProduct, fetchMore }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
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
            console.log(iframe)
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
    console.log(dataProducto)
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
    console.log(data)
    let suma = 0
    let total = 0
    useEffect(() => {
        data.PRODUCT.forEach((a) => {
            console.log(a)
            const { ProPrice, ValueDelivery } = a || {}
            suma += ProPrice
            setTotalProductPrice(Math.abs(suma))
        })
    }, [totalProductPrice, suma, total, data])
    return (
        <Wrapper>
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
                </ScrollbarProduct>
            </Box>
            <Box width='40%'>
                <ScrollbarProduct margin={'0'}>
                    <h2>Productos a vender</h2>
                    <ContainerGrid>
                        {data.PRODUCT.map((producto, idx) => (
                            <CardProducts key={idx + 1} render={<IconDelete color={PColor} size="20px" />} onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })} ProDescription={producto.ProDescription} ProPrice={producto.ProPrice} pName={producto.pName} ProImage={producto.ProImage} ValueDelivery={producto.ValueDelivery} ProDescuento={producto.ProDescuento} />
                        ))}
                    </ContainerGrid>
                </ScrollbarProduct>
                <ContentCalcules>
                    {numberFormat(suma)}
                    Hola mundo
                </ContentCalcules>
            </Box>
        </Wrapper>
    )
}

GenerateSales.propTypes = {
    data: PropTypes.array
}

export default GenerateSales