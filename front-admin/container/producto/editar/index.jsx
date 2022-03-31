import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputHooks from '../../../components/InputHooks/InputHooks'
import { useFormTools } from '../../../components/BaseForm'
import { GET_ONE_PRODUCTS_FOOD } from '../queries'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL } from 'container/update/Products/queries'
import { GET_ALL_EXTRA_PRODUCT } from 'container/dashboard/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { numberFormat } from 'utils'
import { RippleButton } from 'components/Ripple'
import { ExtrasProductsItems } from '../extras'

export const ProductEdit = ({ id }) => {
    // STATES
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [modal, openModal] = useState(false)
    const [{ alt, src }, setPreviewImg] = useState(initialState)
    // QUERIES
    const [productFoodsOne, { data: dataProduct, loading, error }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
    const [ExtProductFoodsOptionalAll, { error: errorOptional, data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
    // EFFECTS
    const { getStore, pId, carProId, sizeId, colorId, idStore, cId, caId, dId, ctId, tpId, fId, pName, ProPrice, ProDescuento, ProUniDisponibles, ProDescription, ProProtegido, ProAssurance, ProImage, ProStar, ProWidth, ProHeight, ProLength, ProWeight, ProQuantity, ProOutstanding, ProDelivery, ProVoltaje, pState, sTateLogistic, pDatCre, pDatMod } = dataProduct?.productFoodsOne || {}
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
        setPreviewImg(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        )

    }
    const fileInputRef = useRef(null)
    const onTargetClick = e => {
        e.preventDefault()
        fileInputRef.current.click()
    }
    return (
        <Container>
            <>
                <Card>
                    <div className="dish-card__info">
                        <h3 className='dish-card__description'>{pName}</h3>
                        <span className="description">{ProDescription}</span>
                        <span className="price">$ {numberFormat(ProPrice)}</span>
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
            <form>
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
                    title='Precio'
                    width='100%'
                    required
                    numeric
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
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
    max-width: 222px;
    grid-template: "image" 157px "info" 1fr;
    grid-gap: 28px;
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
        padding: 10px;
    }
    .dish-card__container-image {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
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
    font-size: 1.0025rem;
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
    }
    .price {
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: #3e3e3e;
    }
`
const Container = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    width: 90%;
    grid-gap: 19px 12px;  
`
const Inputdeker = styled.input`
    padding: 30px;
    border: 1px solid;
    display: none;
`
const Img = styled.img`
    width: 100%;
    object-fit: contain;
    height: 100%;
`
const Button = styled.button`
    background-color: red;
    border-radius: 22px;
    padding: 10px;
    margin: 5px 5px;
`
// const InputHooks = styled.input`
// margin: 5px;
// `


