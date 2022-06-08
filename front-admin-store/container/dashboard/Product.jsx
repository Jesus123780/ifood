import PropTypes from 'prop-types'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { ContainerFilter, ItemFilter } from 'components/Update/Products/styled'
import { OptionalExtraProducts } from 'container/producto/extras'
import { ExtrasProductsItems } from 'container/producto/extras/ExtrasProductsItems'
import Image from 'next/image'
import Link from 'next/link'
import { APColor } from 'public/colors'
import React from 'react'
import { CardProductsModal, ContentImage, ContentInfo, DisRestaurant, Flex, HeadSticky, Text } from './styled'
import { useRouter } from 'next/router'

export const Product = ({ store,setModal, modal, ProDescription, ProImage, pName, ProPrice, dataExtra, storeName, ProDescuento, nameStore, dataOptional, handleDelete, pId, ...props }) => {
console.log("🚀 ~ file: Product.jsx ~ line 13 ~ Product ~ pId", pId)
const router = useRouter()
  return (
    <div {...props}>
      <ContainerFilter>
        <ItemFilter onClick={() => { return setModal(!modal) }}>Añadir Adicionales</ItemFilter>
        <ItemFilter onClick={() => { return router.push(`/update/products/editar/${pId}`) }} >Editar</ItemFilter>
        <ItemFilter onClick={() => { return handleDelete() }} >Eliminar</ItemFilter>
      </ContainerFilter>
      <CardProductsModal>
        <ContentImage>
          <Image
            alt={ProDescription || 'img'}
            blurDataURL='data:...'
            className='store_image'
            height={440}
            objectFit='contain'
            placeholder='blur'
            src={ProImage || '/app/images/DEFAULTBANNER.png'}
            width={440}
          />
        </ContentImage>
        <ContentInfo>
          <HeadSticky>
            <Text size='1.1em'>{pName}</Text>
          </HeadSticky>
          <Text
            color='#676464'
            margin='20px 0'
            size='14px'
          >{ProDescription}</Text>
          <Flex>
            <Text
              color={APColor}
              margin='12px 0'
              size='.875rem'
            >$ {ProPrice}</Text>
            <Text margin='12px 0 0 5px' size='14px'>$ {ProDescuento}</Text>
          </Flex>
          <DisRestaurant>
            {store && !!nameStore && <Link
              href={!!store && {
                pathname: `${CLIENT_URL_BASE}delivery/${store?.city?.cName?.toLocaleLowerCase()}-${store?.department?.dName?.toLocaleLowerCase()}/${nameStore?.replace(/\s/g, '-')?.toLocaleLowerCase()}/${store.idStore}`,
                query: { shared: '' }
              }}
              passHref
              replace
              shallow
            >
              <a target='_blank'>
                <Text margin='12px 0 0 5px' size='19px'>$ {storeName}</Text>
              </a>
            </Link>}
            <div className='dish-restaurant__divisor'></div>
            <label className='dish-observation-form__label' tabIndex='0' >¿Algún comentario?</label>
          </DisRestaurant>
          <ExtrasProductsItems
            dataExtra={dataExtra?.ExtProductFoodsAll || []}
            dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
            modal={modal}
            pId={pId}
            setModal={setModal}
          />
        </ContentInfo>
      </CardProductsModal>

      <OptionalExtraProducts
        dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
        pId={pId}
      />
    </div>
  )
}

Product.propTypes = {
  ProDescription: PropTypes.string,
  ProDescuento: PropTypes.any,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.any,
  dataExtra: PropTypes.shape({
    ExtProductFoodsAll: PropTypes.array
  }),
  dataOptional: PropTypes.shape({
    ExtProductFoodsOptionalAll: PropTypes.array
  }),
  modal: PropTypes.any,
  nameStore: PropTypes.shape({
    replace: PropTypes.func
  }),
  pId: PropTypes.any,
  pName: PropTypes.any,
  setModal: PropTypes.func,
  store: PropTypes.shape({
    city: PropTypes.shape({
      cName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    department: PropTypes.shape({
      dName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    idStore: PropTypes.any
  }),
  storeName: PropTypes.any
}
