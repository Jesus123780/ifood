import React from 'react'
import PropTypes from 'prop-types'
import { ContainerCardProduct, ContainerFilter, ContentProducts, ItemFilter, Text, WrapperProducts } from './styled'
import { CardProducts } from 'components/CartProduct'
import { Skeleton } from 'components/Skeleton'
import { InputHook } from './Input'
import { RippleButton } from 'components/Ripple'

export const ListProducts = ({ onClickClear, data, OPEN_MODAL_ORGANICE, dataFree, handleChangeFilter, grid, search, showMore, fetchMore, loading, setShowMore }) => {
  return (
    <div>
      <ContentProducts>
        <Text size='30px'>Lista de productos registrados</Text>
        <ContainerFilter>
          <ItemFilter onClick={() => { return OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }}>Ordenar</ItemFilter>
          <ItemFilter onClick={() => { return onClickClear() }}>Limpio</ItemFilter>
          <ItemFilter>{data.length ? `${data.length} Productos` : 'No hay productos'}</ItemFilter>
          <ItemFilter>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
        </ContainerFilter>
        <Text size='30px'>Filtrar productos</Text>
        <InputHook
          label='Busca tus productos'
          name='search'
          onChange={handleChangeFilter}
          range={{ min: 0, max: 20 }}
          type='text'
          value={search}
        />
        <WrapperProducts className='filter'>
          <ContainerCardProduct grid={grid}>
            {!data?.length === 0 ? <Skeleton numberObject={50} /> : data?.map(producto => {
              return (
                <CardProducts
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={producto.ProPrice}
                  ValueDelivery={producto.ValueDelivery}
                  del={true}
                  edit={true}
                  key={producto.pId}
                  pId={producto.pId}
                  pName={producto.pName}
                />
              )
            })}
          </ContainerCardProduct>
        </WrapperProducts>
        <RippleButton
          margin='20px auto'
          onClick={() => {
            setShowMore(s => { return s + 5 })
            fetchMore({
              variables: { max: showMore, min: 0 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult
                return {
                  productFoodsAll: [...fetchMoreResult.productFoodsAll]

                }
              }
            })
          }}
          widthButton='100%'
        >{loading ? 'Cargando...' : 'CARGAR MÁS'}</RippleButton>
      </ContentProducts>
    </div>
  )
}

ListProducts.propTypes = {}
