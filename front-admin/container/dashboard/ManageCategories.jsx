import React, { useEffect, useReducer, useState } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { CREATE_SCHEDULE_STORE, GET_ALL_PRODUCT_STORE, GET_CAT_OF_PRODUCTS, GET_SCHEDULE_STORE, REGISTER_CAT_OF_PRODUCTS } from './queriesStore'
import { Card, ContentAction, ContentCard, Text } from './styled'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { ButtonAction, ButtonCard } from './styledStore'
import { numberFormat, updateCache } from '../../utils'
import { DELETE_ONE_CAT_PRODUCTS, GET_ULTIMATE_CATEGORY_PRODUCTS, UPDATE_CAT_IN_PRODUCT } from './queries'
import { AddPlusCircle, IconDelete, IconEdit, IconLove } from '../../public/icons'
import { RippleButton } from '../../components/Ripple'
import { BGColor, PColor, PVColor, WColor } from '../../public/colors'
import { CardProduct, ContainerCardProduct, ContentIconFav, ContentImg, ContentInfo, Img } from '../../components/Update/Products/styled'
import { SkeletonP } from '../../components/Update/Products/food'
import { Discount, Title } from '../../components/Update/Products/ViewProducts/styled'
import { Rate } from '../../components/Rate'
import { useRouter } from 'next/router'

export const ManageCategories = ({ SHOW_MODAL_UPDATE_PRODUCTS }) => {
    const initialStateInvoice = {
        PRODUCT: [],
    }
    const router = useRouter()
    const [idCat, setIdCat] = useState('')
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    const [openModalProducts, setOpenModalProducts] = useState(false)
    const openModal = (carProId) => {
        setIdCat(carProId)
        setOpenModalProducts(!openModalProducts)
    }
    const [updatedProducts, { loading, error }] = useMutation(REGISTER_CAT_OF_PRODUCTS)
    const [deleteCatOfProducts] = useMutation(DELETE_ONE_CAT_PRODUCTS, {
        onError: (error) => {
            console.error({
                message: error.graphQLErrors[0].message,
                color: WColor
            })
        },
        update(cache) {
            cache.modify({
                fields: {
                    catProductsAll(dataOld = []) {
                        return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                    }
                }
            })
        }
    })
    const [updatedCatWithProducts] = useMutation(UPDATE_CAT_IN_PRODUCT, {
        onError: (error) => {
            console.error({
                message: error.graphQLErrors[0].message,
                color: WColor
            })
        },
        update(cache) {
            cache.modify({
                fields: {
                    catProductsAll(dataOld = []) {
                        return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                    }
                }
            })
        }
    })
    const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
    const [productFoodsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const SHOW_CATEGORIES = useSetState(false)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return updatedProducts({
                    variables: {
                        input: {
                            pName: dataForm?.catName,
                            ProDescription: dataForm?.catDescription,
                        }
                    },
                    update(cache) {
                        cache.modify({
                            fields: {
                                catProductsAll(dataOld = []) {
                                    return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                                }
                            }
                        })
                    }
                })
            },
            actionAfterSuccess: () => {
                setDataValue({})
                SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)
            }
        })


    useEffect(() => {
        dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
    }, [dataProduct])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMore } })
    }, [showMore])

    const productRecoger = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    PRODUCT: [...state?.PRODUCT, action?.payload]
                }
            case 'REMOVE_PRODUCT':
                return {
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    PRODUCT: []
                };
            case "TOGGLE_INVOICE":
                return {
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const [product, dispatch] = useReducer(productRecoger, initialStateInvoice)
    const handleAddProduct = elem => {
        let includes = product?.PRODUCT.includes(elem);
        if (includes) {
            console.log({ message: 'The invoice is already added to the list' })
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: elem })
        }
    }
    const handleUpdateCatInProduct = async () => {
        await updatedCatWithProducts({
            variables: {
                input: {
                    setData: product?.PRODUCT?.map(x => ({ idProduct: x.pId })),
                    idCat: idCat
                }
            }
        })
    }
    return (
        <>
            <AwesomeModal backdrop='static' zIndex='90' bgColor='transparent' padding='25px' show={SHOW_CATEGORIES.state} onHide={() => { SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <form onSubmit={(e) => handleForm(e)}>
                    <InputHooks
                        title='Nombre de la categoría'
                        width='100%'
                        required
                        error={errorForm?.catName}
                        value={dataForm?.catName}
                        onChange={handleChange}
                        name='catName'
                    />
                    <InputHooks
                        TypeTextarea
                        title='Description'
                        width='100%'
                        required
                        error={errorForm?.catDescription}
                        value={dataForm?.catDescription}
                        onChange={handleChange}
                        name='catDescription'
                    />
                    <ButtonAction type='submit'>
                        Submit
                    </ButtonAction>
                </form>
                <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}>
                    Registrar  Categorías de productos
                </ButtonAction>
            </AwesomeModal>
            <ButtonAction onClick={() => SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)}> Registrar Categorías</ButtonAction>
            <ContentCard>
                {datCat?.catProductsAll?.map(x => (
                    <Card active={x.carProId === idCat} radius='10px' margin='20px' height='300px' width='30%' key={x.carProId} onClick={() => openModal(x.carProId)}>
                        <div >
                            <Text size='20px' >{x.pName}</Text>
                            <Text size='20px' >{x.ProDescription}</Text>
                        </div>
                        <RippleButton onClick={() => deleteCatOfProducts({ variables: { idPc: x.carProId, pState: x.pState } })}>
                            <IconDelete size={20} color={BGColor} />
                        </RippleButton>
                    </Card>
                ))}
            </ContentCard>
            <AwesomeModal backdrop='static' zIndex='990' bgColor='transparent' padding='25px' show={openModalProducts} onHide={() => setOpenModalProducts(!openModalProducts)} onCancel={() => setOpenModalProducts(!openModalProducts)} size='medium' btnCancel={true} btnConfirm={true} onConfirm={() => handleUpdateCatInProduct()} header={true} footer={true} borderRadius='10px' >
                <ContainerCardProduct grid={false}>
                    {!dataProducto?.length ? <SkeletonP /> : dataProducto?.map(product => (
                        <CardProduct grid={false} key={product.carProId} >
                            <ContentImg grid={false}>
                                {!product.ProImage ? <i>No img</i> : <Img src={product.ProImage} alt={product.ProImage} />}
                            </ContentImg>
                            <ContentInfo>
                                <ContentIconFav grid={false} onClick={() => router.push(`/producto/editar/${product.carProId}`)}>
                                    <IconLove color={PVColor} size={20} />
                                </ContentIconFav>
                                <ContentIconFav right='90px' grid={false} onClick={() => handleAddProduct(product)}>
                                    <AddPlusCircle color={PVColor} size={40} />
                                </ContentIconFav>
                                {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
                                <Text size='14px'>{product.pName}</Text>
                                <Text>{numberFormat(product.ProPrice)}</Text>
                                <ContentInfo /* direction */>
                                    <Rate noHover rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                                    {product.ProDelivery === 1 && <span>Gratis</span>}
                                </ContentInfo>
                            </ContentInfo>
                        </CardProduct>
                    ))}
                </ContainerCardProduct>
                <ContainerCardProduct>
                    {product?.PRODUCT?.map((x, idx) => (
                        <Card radius='10px' margin='20px' height='300px' width='100%' key={idx.carProId}>
                            <div >
                                <Text size='20px' >{x.pName}</Text>
                                <Text size='20px' >{x.ProDescription}</Text>
                            </div>
                            <ContentAction >
                                <RippleButton onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>
                                    <IconDelete size={20} color={BGColor} />
                                </RippleButton>
                            </ContentAction>
                        </Card>
                    ))}
                </ContainerCardProduct>
                <RippleButton onClick={() => SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state)}> Subir productos</RippleButton >
            </AwesomeModal>
        </>
    )
}
