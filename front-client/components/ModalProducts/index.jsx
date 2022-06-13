import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { Context } from 'context'
import { IconMiniCheck, IconPlus, IconArrowBottom } from 'public/icons'
import { numberFormat, updateCache } from 'utils'
import { useRouter } from 'next/router'
import Image from 'next/image';
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { APColor, BGColor, PColor, PLColor } from 'public/colors'
import { useFormTools } from 'components/BaseForm'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_ONE_PRODUCTS_FOOD } from 'container/queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { BtnClose, CardProductsModal, CardsComponent, ContentInfo, ContainerModal, DisRestaurant, Flex, GarnishChoicesHeader, HeadSticky, Modal, Text, BtnCloseMobile, Header } from './styled'
import Link from 'next/link'
import { CREATE_SHOPPING_CARD } from 'components/AsideCheckout/querys'
import { useSetState } from 'components/hooks/useState'
import { GET_ALL_SHOPPING_CARD } from 'container/restaurantes/queries'
import { Context } from 'context';

export const ModalProduct = () => {
    const router = useRouter()
    // STATES
    const { openProductModal, setOpenProductModal, dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
    const [handleChange, _handleSubmit, _setDataValue, { dataForm, errorForm }] = useFormTools()
    const { increase, setState, state, decrease } = useSetState(1)
    const [filter, setFilter] = useState({ subOptional: [] })
    const [searchFilter, setSearchFilter] = useState({ subOptional: [] })

    const location = useRouter()
    const { plato } = location.query
    // QUERIES
    const [productFoodsOne, { data: dataOneProduct }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
    const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const [registerShoppingCard] = useMutation(CREATE_SHOPPING_CARD)

    // EFFECTS
    useEffect(() => {
        if (openProductModal || plato) setOpenProductModal(true)
        productFoodsOne({ variables: { pId: plato } })
        ExtProductFoodsOptionalAll({ variables: { pId: plato } })
        if (!plato) setOpenProductModal(false)
    }, [plato])
    const {
        ProDescription,
        ProDelivery,
        ProImage,
        ProDescuento,
        ProLength,
        ProOutstanding,
        ProPrice,
        ProProtegido,
        ProQuantity,
        ProStar,
        ProUniDisponibles,
        ProVoltaje,
        ProWidth,
        ValueDelivery,
        carProId,
        getStore,
        ProWeight,
        pName,
        ExtProductFoodsAll,
    } = dataOneProduct?.productFoodsOne || {}
    /**
     *
     * @param {elem} food obtiene un producto del la list
     * @author {autor} Jesus Juvinao
     * @action Obtiene un producto de DB  
     */
    // HANDLES
    const handleChangeClickOnTable = e => {
        const { name, value, checked } = e.target
        !checked ? setFilter(s => ({ ...s, [name]: s[name].filter(f => f !== value) })) : setFilter({ ...filter, [name]: [...filter[name], value] })
        setSearchFilter({ ...filter })
    }
    const handleAddProducts = (food) => {
        // const { food } = elem?.productFoodsOne || {}
        const val = state_product_card.PRODUCT?.find(x => x.pId === food.pId)
        console.log(food)
        handleMenu(1)
        if (val) {
            setAlertBox({ message: `El producto ${food.pName} ya esta en la cesta` })
        } else {
            const newArray = filter?.subOptional.map(x => { return { _id: x } })
            registerShoppingCard({
                variables: {
                    input: {
                        cState: 1,
                        pId: food.pId,
                        idStore: !!food && food.getStore.idStore,
                        comments: dataForm.comments,
                        cName: 'puta madre',
                        cantProducts: state,
                        csDescription: 'csDescription',
                    },
                    idSubArray: {
                        setID: newArray || []
                    }
                }, update: (cache, { data: { getAllShoppingCard } }) => updateCache({
                    cache,
                    query: GET_ALL_SHOPPING_CARD,
                    nameFun: 'getAllShoppingCard',
                    dataNew: getAllShoppingCard
                })
            }).catch(err => setAlertBox({ message: err }));
            // dispatch({ type: 'ADD_PRODUCT', payload: result })
        }
    }
    const handleCountProducts = useCallback((ProPrice, state) => {
        const price = parseFloat(ProPrice)
        return state <= 0 ? price : numberFormat((Math.abs(state * price)))
    }, [dataOneProduct])
    const handleClose = useCallback((e) => {
        e.preventDefault()
        const val = ['/delivery/[location]/[name]/[id]'].find(x => x === location.pathname)
        if (val) {
            const { location, name, id } = router.query
            console.log(location, name, id)
            router.replace(`/delivery/${location}/${name}/${id}`)
        } else {
            router.replace(router.pathname)
        }
        setOpenProductModal(!openProductModal)
    }, [openProductModal])
    return (
        <ContainerModal showModal={openProductModal}>
            <Modal showModal={openProductModal}>
                <CardProductsModal>
                    <Header>
                        <BtnCloseMobile onMouseDown={(e) => handleClose(e)}><IconArrowBottom color={PColor} size={20} /></BtnCloseMobile>
                    </Header>
                    <ContentInfo margin='10px 0 0 0'>
                        <Image
                            width={450}
                            height={450}
                            objectFit='contain'
                            src={ProImage || '/images/hamb.jpg'}
                            alt='Picture'
                            blurDataURL='data:...'
                            placeholder='blur' />
                    </ContentInfo>
                    <div>
                        <div>
                            <BtnClose onMouseDown={(e) => handleClose(e)} ><IconArrowBottom color={PColor} size={20} /></BtnClose>
                        </div>
                        <ContentInfo>
                            <HeadSticky>
                                <Text size='1.1em'>{pName}</Text>
                                <Text size='1.1em'>Cantidad: {state} </Text>
                            </HeadSticky>
                            <Text description size='14px' margin='20px 0' color='#676464'>{ProDescription}</Text>
                            <Flex>
                                <Text margin='12px 0' size='.875rem' color={APColor}>$ {numberFormat(ProPrice)}</Text>
                                <Text margin='12px 0 0 5px' size='14px' color={PLColor} style={{ textDecoration: 'line-through' }} >$ {numberFormat(ProDescuento)}</Text>
                            </Flex>
                            <DisRestaurant>
                                <Link href={`/delivery/${getStore?.city?.cName?.toLocaleLowerCase()}-${getStore?.department?.dName?.toLocaleLowerCase()}/${getStore?.storeName}/${getStore?.idStore}`}>
                                    <a>
                                        <Text className='dish-restaurant__header' margin='12px 0' size='14px'> {getStore?.storeName}</Text>
                                    </a>
                                </Link>
                                <div className='dish-restaurant__divisor'></div>
                                <label tabIndex='0' className='dish-observation-form__label'>¿Algún comentario?</label>
                            </DisRestaurant>
                            <InputHooks required TypeTextarea errors={errorForm?.comments} value={dataForm?.comments} onChange={handleChange} name='comments' />
                            {!!ExtProductFoodsAll?.length && <GarnishChoicesHeader>
                                <div>
                                    <p className='garnish-choices__title'>Adicionales</p>
                                    <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
                                </div>
                                <IconMiniCheck size={'15px'} color={'#009b3a'} />
                            </GarnishChoicesHeader>}
                            {ExtProductFoodsAll?.length > 0 && ExtProductFoodsAll?.map(extra => (
                                <CardsComponent key={extra.exPid}>
                                    <div>
                                        <h3 className='title_card'>{extra.extraName}</h3>
                                        <h3 className='price'> $ {extra.extraPrice}</h3>
                                    </div>
                                    <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type='button' onClick={() => console.log(extra)} >
                                    </RippleButton>
                                </CardsComponent>
                            ))}
                            {dataOptional?.ExtProductFoodsOptionalAll?.map(itemOptional => (
                                <div  key={itemOptional.opExPid}>
                                    <GarnishChoicesHeader>
                                        <div>
                                            <p className='garnish-choices__title'>{itemOptional.OptionalProName}</p>
                                            <p className='garnish-choices__title-desc'>Escoge hasta {itemOptional.numbersOptionalOnly} opciones.</p>
                                        </div>
                                        <IconMiniCheck size={'15px'} color={'#009b3a'} />
                                    </GarnishChoicesHeader>
                                    {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => (
                                        <CardsComponent key={x.opSubExPid}>
                                            <div>
                                                <h3 className='title_card'>{x.OptionalSubProName}</h3>
                                            </div>
                                            <input name='subOptional' value={x?.opSubExPid}  type='checkbox' id='cat' onChange={handleChangeClickOnTable} />
                                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type='button' onClick={() => console.log(x)} >
                                            </RippleButton>
                                        </CardsComponent>
                                    ))}
                                </div>
                            ))}
                        </ContentInfo>
                    </div>
                    <div></div>
                    <Flex>
                        <div style={{ width: '50%' }}>
                            <RippleButton padding={'8px'} size='12px' color={BGColor} disabled={state <= 1} onClick={() => decrease()}>-</RippleButton>
                            <RippleButton padding={'8px'} size='12px' color={BGColor}> {handleCountProducts(ProPrice, state)}</RippleButton>
                            <RippleButton padding={'8px'} size='12px' color={BGColor} onClick={() => increase()}><IconPlus size='10px' color={BGColor} /></RippleButton>
                        </div>
                        <RippleButton padding={'8px'} size='12px' color={BGColor} onClick={() => handleAddProducts(dataOneProduct?.productFoodsOne)}>Agregar</RippleButton>
                    </Flex>
                </CardProductsModal>
            </Modal>

        </ContainerModal>
    )
}

ModalProduct.propTypes = {}
