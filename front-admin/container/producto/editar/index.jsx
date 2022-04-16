import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import styled, { css } from 'styled-components'
import InputHooks from '../../../components/InputHooks/InputHooks'
import { useFormTools } from '../../../components/BaseForm'
import { EDIT_PRODUCT, GET_ONE_PRODUCTS_FOOD } from '../queries'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_IMAGE_PRODUCT_FOOD, UPDATE_PRODUCT_FOOD } from 'container/update/Products/queries'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from 'container/dashboard/queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { numberFormat, updateCache } from 'utils'
import { RippleButton } from 'components/Ripple'
import { ExtrasProductsItems } from '../extras'
import { APColor, BColor, BGColor, PColor } from 'public/colors'
import { IconDelete, IconEdit, IconPay } from 'public/icons'
import Link from 'next/link'
import { CLIENT_URL_BASE, URL_ADMIN_SERVER } from 'apollo/urls'
import { DisRestaurant } from 'container/PedidosStore/ListPedidos'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { Context } from 'context/Context'
import { useRouter } from 'next/router'

export const ProductEdit = ({ id }) => {
    // STATES
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [modal, openModal] = useState(false)
    const { setAlertBox } = useContext(Context)
    const [{ alt, src }, setPreviewImg] = useState(initialState)
    const router = useRouter()
    const [image, setImage] = useState({})
    // QUERIES
    const [productFoodsOne, { data: dataProduct, loading, error }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
    const [ExtProductFoodsOptionalAll, { error: errorOptional, data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)
    const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
    const [editProductFoods] = useMutation(EDIT_PRODUCT)
    const [setImageProducts] = useMutation(UPDATE_IMAGE_PRODUCT_FOOD, {
        context: { clientName: "admin-server" },
        onCompleted: () => {
        }
    })
    // EFFECTS
    console.log(dataProduct)
    const { getStore, pCode, ProPrice, ProDescuento, ValueDelivery, ProDescription, ProImage, ProDelivery, pState } = dataProduct?.productFoodsOne || {}
    useEffect(() => {
        if (id) {
            productFoodsOne({ variables: { pId: id } })
            ExtProductFoodsOptionalAll({ variables: { pId: id } })
            ExtProductFoodsAll({ variables: { pId: id } })
            setDataValue({
                ...dataProduct?.productFoodsOne || {}
            })
        }
        setDataValue({
            ...dataProduct?.productFoodsOne || {}
        })
    }, [id, dataProduct, dataOptional, loading, error, errorOptional])
    // HANDLESS
    const onFileInputChange = event => {
        const { files } = event.target;
        setImage(files[0])
        setPreviewImg(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        )

    }
    const ProImage1 = `${URL_ADMIN_SERVER}static/platos/${image?.name}`
    console.log(ProImage1)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                setImageProducts({
                    variables: {
                        input: {
                            file: image,
                            pCode: pCode,
                            pId: id
                        }
                    }
                }).then(() => {
                    // setDataValue({})
                })
                const { pName, ProPrice, ProDescuento, ValueDelivery, ProUniDisponibles, ProDescription, ProProtegido, ProAssurance, ProWidth, ProHeight, ProLength, ProWeight, ProQuantity, ProOutstanding, ProDelivery, ProVoltaje, pState, sTateLogistic } = dataForm || {}
                return editProductFoods({
                    variables: {
                        input: {
                            pId: id,
                            pName,
                            ProPrice: parseFloat(ProPrice),
                            ProDescuento,
                            ValueDelivery: parseFloat(ValueDelivery),
                            ProUniDisponibles,
                            ProDescription,
                            ProProtegido,
                            ProAssurance,
                            // ...(image) && ProImage,
                            ProWidth,
                            ProHeight,
                            ProLength,
                            ProWeight,
                            ProQuantity,
                            ProOutstanding,
                            ProDelivery,
                            ProVoltaje,
                            pState,
                            sTateLogistic,
                        }
                    }, update: (cache, { data: { productFoodsOne } }) => updateCache({
                        cache,
                        query: GET_ONE_PRODUCTS_FOOD,
                        nameFun: 'productFoodsOne',
                        dataNew: productFoodsOne
                    })

                })

            }
        })
    const fileInputRef = useRef(null)
    const onTargetClick = e => {
        e.preventDefault()
        fileInputRef.current.click()
    }
    const handleDelete = () => {
        updateProductFoods({
            variables: {
                input: {
                    pId: id,
                    pState
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        productFoodsAll(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_PRODUCT_STORE, data: dataOld })
                        }
                    }
                })
                cache.modify({
                    fields: {
                        getCatProductsWithProduct(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: 'El producto ha sido eliminado', color: 'error', duration: 7000 })
            }
        }).then(() => {
            router.back();
        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
    }
    return (
        <Container>
            <>
                <Card>
                    <div className="dish-card__info">
                        <h3 className='dish-card__description'>{''}</h3>
                        <span className="description">{ProDescription}</span>
                        <span className="description">$ {numberFormat(ValueDelivery)} <IconPay size={20} color={PColor} /></span>
                        <RippleButton widthButton='100%' padding='0' margin='5px auto' onClick={() => handleDelete()}> <IconDelete size={20} color={BGColor} /></RippleButton>
                        <div className="flex-wrap">
                            <span className="price">$ {numberFormat(ProPrice)}</span>
                            <span className="price discount">$ {numberFormat(ProDescuento)}</span>
                        </div>
                    </div>
                    <div className="dish-card__container-image">
                        <img
                            className="marmita-image--responsive"
                            alt=''
                            src={ProImage}
                        />
                    </div>
                </Card>
                <ExtrasProductsItems
                    setModal={() => openModal(!modal)}
                    modal={modal}
                    dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                    dataExtra={dataExtra?.ExtProductFoodsAll || []} />
            </>
            <form onSubmit={(e) => handleForm(e)}>
                <InputHooks
                    title='Nombre del Producto'
                    width={'100%'}
                    required
                    error={errorForm?.pName}
                    value={dataForm?.pName}
                    onChange={handleChange}
                    name='pName'
                />
                <InputHooks
                    title='Precio'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
                <InputHooks
                    title='Descuento'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ProDescuento}
                    value={dataForm?.ProDescuento}
                    onChange={handleChange}
                    name='ProDescuento'
                />
                <InputHooks
                    title='Costo de envio'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ValueDelivery}
                    value={dataForm?.ValueDelivery}
                    onChange={handleChange}
                    name='ValueDelivery'
                />
                <InputHooks
                    TypeTextarea={true}
                    title='Description'
                    width='100%'
                    required
                    error={errorForm?.ProDescription}
                    value={dataForm?.ProDescription}
                    onChange={handleChange}
                    name='ProDescription'
                />
                <div>
                    {ProDelivery === 1 ? <span>Gratis</span> : <span>{numberFormat(ValueDelivery)}</span>}
                </div>
                <div>
                    {pState === 1 ? <span>Activo</span> : <span>No activo</span>}
                </div>
                {getStore &&
                    <DisRestaurant>
                        <Link href={`${CLIENT_URL_BASE}delivery/${getStore.city.cName?.toLocaleLowerCase()}-${getStore.department.dName?.toLocaleLowerCase()}/${getStore.storeName}/${getStore.idStore}`}>
                            <a target='_blank'>
                                <span margin={'0 0 0 10px'} color={PColor} >{getStore.storeName}</span>
                            </a>
                        </Link>
                    </DisRestaurant>
                }
                <ContentImage >
                    <img src={src} alt={alt} onClick={(e) => onTargetClick(e)} />
                    <Inputdeker
                        type='file'
                        ref={fileInputRef}
                        accept=".jpg, .png"
                        onChange={(event) => onFileInputChange(event)}
                        id='iFile'
                    />
                </ContentImage>
                <RippleButton widthButton='100%' margin='20px auto' type='submit'>
                    Guardar y salir
                </RippleButton>
            </form>
        </Container>
    )
}

ProductEdit.propTypes = {

}
export const ContentImage = styled.div`
    display: flex;
    width: 100%;
    && > img {
        height: 300px; 
        min-height: 300px; 
        object-fit: cover;
        max-height: 300px; 
        width: 100%; 
    }
`
export const InputFile = styled.input`
    /* display: none;    */
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    color: ${BColor};
    opacity: 0;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    z-index: 999; 
    top: ${({ top }) => top ? top : '20px'};
    transition-delay: ${({ delay }) => delay ? delay : 'auto'};
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => props.grid && css`
        top: ${({ top }) => top ? top : '80px'};
        `
    }
`
const Card = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgba(0,0,0,.05);
    border-radius: 4px;
    padding: 0;
    /* max-width: 222px; */
    grid-template:
     "image" 157px 
     "info-price"  1fr
     "info"  1fr;
    grid-gap: 28px;
    height: 400px;
    align-items: flex-end;
    top: 0;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    @media only screen and (min-width: 960px) {
        cursor: pointer;
    }
    .dish-card__info {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        margin: 0;
        display: grid;
        grid-area: info;
        grid-template-rows: 1fr;
        padding: 10px 20px;
        height: min-content;
        /* padding: 0 20px; */
    }
    .dish-card__container-image {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        height: 157px;
        grid-area: image;
    width: 100%;
    overflow: hidden;
    height: 100%;
    border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        position: relative;
    }
    .marmita-image--responsive {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box;
        border-style: none;
        pointer-events: none;
        align-self: flex-start;
        object-fit: cover;
        grid-area: image;
        width: 100%;
        border-radius: 4px 4px 0 0;
        height: 157px;
    }
    .dish-card__description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    line-height: 1.5rem;
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.165rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    width: 85%;
    }
    .description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    font-size: .875rem;
    line-height: 1.25rem;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    .price {
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: ${APColor};
    }
    .discount {
    color: #3e3e3e;
    text-decoration-line: line-through;
    }
    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }
    .info-price {
        display: flex;
        padding: 0 20px;
    }
`
const Container = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    width: 90%;
    grid-gap: 19px 12px;  
`
const ContainerActions = styled.button`
    position: absolute;
    width: max-content;
    right: 25px;
    background-color: transparent;
    border-radius: 50%;
`
const Inputdeker = styled.input`
    padding: 30px;
    border: 1px solid;
    display: none;
`
// const InputHooks = styled.input`
// margin: 5px;
// `

export const CardProducts = ({ pName, del, edit, key, ProDescription, ValueDelivery, pId, ProPrice, render = null, onClick = () => { }, handleDelete = () => { }, ProDescuento, ProImage, widthButton }) => {
    const router = useRouter()
    return (
        <Card key={key}>
            {del && <ButtonCard grid={false} onClick={handleDelete}>
                <IconDelete size={20} color={PColor} />
                <ActionName >
                    Eliminar
                </ActionName>
            </ButtonCard>}
            {edit && <ButtonCard grid={false} delay='.1s' top={'80px'} onClick={() => router.push(`/producto/editar/${pId}`)}>
                <IconEdit size={20} color={PColor} />
                <ActionName>
                    Editar
                </ActionName>
            </ButtonCard>}
            <div className="dish-card__info">
                {ValueDelivery && <span className="description">Domicilio $ {numberFormat(ValueDelivery || 0)}</span>}

                <div className="flex-wrap">
                    <span className="price">$ {ProPrice ? numberFormat(ProPrice) : 'Gratis'}</span>
                    {ProDescuento !== 0 && <span className="price discount">{`${numberFormat(ProDescuento)}`}</span>}
                </div>
            </div>
            <div className='info-price'>
                <span>
                    <h3 className='dish-card__description'>{pName}</h3>
                    <span className="description">{ProDescription}</span>
                </span>
                <ContainerActions>
                    {render && <RippleButton bgColor={BGColor} widthButton={widthButton} padding='0' margin='5px auto' onClick={() => onClick()}>{render}</RippleButton>}
                </ContainerActions>
            </div>
            <div className="dish-card__container-image">
                <Image
                    className='store_image'
                    objectFit='cover'
                    height={157}
                    width={157}
                    layout='fill'
                    src={ProImage || '/images/dish-image-placeholder.png'}
                    alt={pName}
                    blurDataURL="/images/DEFAULTBANNER.png"
                />
            </div>
        </Card>
    )
}
