import PropTypes from "prop-types"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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
  const initialState = { alt: '/images/DEFAULTBANNER.png', src: '/images/DEFAULTBANNER.png' }
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
    context: { clientName: 'admin-server' }
  })
  // EFFECTS
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
    const { files } = event.target
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
  {return handleSubmit({
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
            ProWidth,
            ProHeight,
            ProLength,
            ProWeight,
            ProQuantity,
            ProOutstanding,
            ProDelivery,
            ProVoltaje,
            pState,
            sTateLogistic
          }
        }, update: (cache, { data: { productFoodsOne } }) => {return updateCache({
          cache,
          query: GET_ONE_PRODUCTS_FOOD,
          nameFun: 'productFoodsOne',
          dataNew: productFoodsOne
        })}

      })

    }
  })}
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
      router.back()
    }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
  }
  return (
    <Container>
      <>
        <Card>
          <div className='dish-card__info'>
            <h3 className='dish-card__description'>{''}</h3>
            <span className='description'>{ProDescription}</span>
            <span className='description'>$ {numberFormat(ValueDelivery)} <IconPay color={PColor} size={20} /></span>
            <RippleButton
              margin='5px auto'
              onClick={() => {return handleDelete()}}
              padding='0'
              widthButton='100%'
            > <IconDelete color={BGColor} size={20} /></RippleButton>
            <div className='flex-wrap'>
              <span className='price'>$ {numberFormat(ProPrice)}</span>
              <span className='price discount'>$ {numberFormat(ProDescuento)}</span>
            </div>
          </div>
          <div className='dish-card__container-image'>
            <img
              alt=''
              className='marmita-image--responsive'
              src={ProImage}
            />
          </div>
        </Card>
        <ExtrasProductsItems
          dataExtra={dataExtra?.ExtProductFoodsAll || []}
          dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
          modal={modal}
          setModal={() => {return openModal(!modal)}}
        />
      </>
      <form onSubmit={(e) => {return handleForm(e)}}>
        <InputHooks
          error={errorForm?.pName}
          name='pName'
          onChange={handleChange}
          required
          title='Nombre del Producto'
          value={dataForm?.pName}
          width={'100%'}
        />
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          numeric
          onChange={handleChange}
          required
          title='Precio'
          value={dataForm?.ProPrice}
          width='100%'
        />
        <InputHooks
          error={errorForm?.ProDescuento}
          name='ProDescuento'
          numeric
          onChange={handleChange}
          required
          title='Descuento'
          value={dataForm?.ProDescuento}
          width='100%'
        />
        <InputHooks
          error={errorForm?.ValueDelivery}
          name='ValueDelivery'
          numeric
          onChange={handleChange}
          required
          title='Costo de envio'
          value={dataForm?.ValueDelivery}
          width='100%'
        />
        <InputHooks
          TypeTextarea={true}
          error={errorForm?.ProDescription}
          name='ProDescription'
          onChange={handleChange}
          required
          title='Description'
          value={dataForm?.ProDescription}
          width='100%'
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
                          <span color={PColor} margin={'0 0 0 10px'} >{getStore.storeName}</span>
                        </a>
                      </Link>
                    </DisRestaurant>
        }
        <ContentImage >
          <img
            alt={alt}
            onClick={(e) => {return onTargetClick(e)}}
            src={src}
          />
          <Inputdeker
            accept='.jpg, .png'
            id='iFile'
            onChange={(event) => {return onFileInputChange(event)}}
            ref={fileInputRef}
            type='file'
          />
        </ContentImage>
        <RippleButton
          margin='20px auto'
          type='submit'
          widthButton='100%'
        >
                    Guardar y salir
        </RippleButton>
      </form>
    </Container>
  )
}

ProductEdit.propTypes = {
  id: PropTypes.string
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
    top: ${({ top }) => {return top ? top : '20px'}};
    transition-delay: ${({ delay }) => {return delay ? delay : 'auto'}};
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
    ${props => {return props.grid && css`
        top: ${({ top }) => {return top ? top : '80px'}};
        `}
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

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const CardProducts = ({ pName, del, edit, key, ProDescription, ValueDelivery, pId, ProPrice, render = null, onClick = () => { }, handleDelete = () => { }, ProDescuento, ProImage, widthButton }) => {
  const router = useRouter()
  return (
    <Card key={key}>
      {del && <ButtonCard grid={false} onClick={handleDelete}>
        <IconDelete color={PColor} size={20} />
        <ActionName >
                    Eliminar
        </ActionName>
      </ButtonCard>}
      {edit && <ButtonCard
        delay='.1s'
        grid={false}
        onClick={() => {return router.push(`/producto/editar/${pId}`)}}
        top={'80px'}
      >
        <IconEdit color={PColor} size={20} />
        <ActionName>
                    Editar
        </ActionName>
      </ButtonCard>}
      <div className='dish-card__info'>
        {ValueDelivery && <span className='description'>Domicilio $ {numberFormat(ValueDelivery || 0)}</span>}

        <div className='flex-wrap'>
          <span className='price'>$ {ProPrice ? numberFormat(ProPrice) : 'Gratis'}</span>
          {ProDescuento !== 0 && <span className='price discount'>{`${numberFormat(ProDescuento)}`}</span>}
        </div>
      </div>
      <div className='info-price'>
        <span>
          <h3 className='dish-card__description'>{pName}</h3>
          <span className='description'>{ProDescription}</span>
        </span>
        <ContainerActions>
          {render && <RippleButton
            bgColor={BGColor}
            margin='5px auto'
            onClick={() => {return onClick()}}
            padding='0'
            widthButton={widthButton}
          >{render}</RippleButton>}
        </ContainerActions>
      </div>
      <div className='dish-card__container-image'>
        <Image
          alt={pName}
          blurDataURL='/images/DEFAULTBANNER.png'
          className='store_image'
          height={157}
          layout='fill'
          objectFit='cover'
          src={ProImage || '/images/dish-image-placeholder.png'}
          width={157}
        />
      </div>
    </Card>
  )
}

CardProducts.propTypes = {
  ProDescription: PropTypes.string,
  ProDescuento: PropTypes.number,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.number,
  ValueDelivery: PropTypes.number,
  del: PropTypes.bool,
  edit: PropTypes.bool,
  handleDelete: PropTypes.func,
  key: PropTypes.string || PropTypes.number,
  onClick: PropTypes.func,
  pId: PropTypes.string,
  pName: PropTypes.string,
  render: PropTypes.any,
  widthButton: PropTypes.string || PropTypes.number
}
