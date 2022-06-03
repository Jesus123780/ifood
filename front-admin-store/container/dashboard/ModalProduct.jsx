import { CLIENT_URL_BASE } from 'apollo/urls'
import { ContainerFilter, ItemFilter } from 'components/Update/Products/styled'
import { OptionalExtraProducts } from 'container/producto/extras'
import { ExtrasProductsItems } from 'container/producto/extras/ExtrasProductsItems'
import Image from 'next/image'
import Link from 'next/link'
import { APColor } from 'public/colors'
import React from 'react'
import { CardProductsModal, ContentImage, ContentInfo, DisRestaurant, Flex, HeadSticky, Text } from './styled'

export const ModalProduct = ({ store,setModal, modal, ProDescription, ProImage, pName, ProPrice, dataExtra, storeName, ProDescuento, nameStore, dataOptional, pId }) => {
  return (
    <div>
      <ContainerFilter>
        <ItemFilter onClick={() => { return setModal(!modal) }}>Añadir Adicionales</ItemFilter>
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
