import PropTypes from 'prop-types'
import { InputHook } from './Input'
import { numberFormat } from '../../../utils'
import { RippleButton } from '../../Ripple'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import { Discount } from './ViewProducts/styled'
import { LoadingBabel } from '../../Loading/LoadingBabel'
import { PColor, PVColor, TFSColor } from '../../../public/colors'
import { FoodCardPreview } from './FoodPreview'
import { Container, Card, ContainerCardProduct, CardProduct, Img, ContentImg, Title, Text, ContentInfo, ButtonCard, ActionName, ContentProducts, CardInput, CardCheckBox, CardRadioLabel, ContainerFilter, ItemFilter, Footer, WrapperProducts, Grid } from './styled'
import { useSetState } from '../../hooks/useState'
import { AwesomeModal } from '../../AwesomeModal'; import React from 'react'
import { Loading } from 'components/Loading'
import { IconDelete, IconDollar, IconEdit, IconLove } from 'public/icons'
// import { CardProducts } from 'container/producto/editar'
import FormProduct from './Form'
import { CardProducts } from 'components/CartProduct'

export const FoodComponent = ({
  features,
  search,
  handleChangeFilter,
  data,
  setShowMore,
  values,
  handleRegister,
  fetchMore,
  dataCategoriesProducts,
  dispatch,
  handleChange,
  countries,
  setRating,
  rating,
  names,
  loading,
  onTargetClick,
  onFileInputChange,
  fileInputRef,
  showMore,
  alt,
  product_state,
  src,
  setName,
  onClickClear,
  handleCheckEnvioGratis,
  state: grid,
  intPorcentaje,
  dataFree
}) => {
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const propsForm = {
    handleRegister,
    setName,
    names,
    handleChange,
    values,
    dataCategoriesProducts, handleCheckEnvioGratis
  }
  return (<>
    <Container>

      <Card>
        <FormProduct {...propsForm} />
      </Card>

      <Card>
        <CardProducts 
          ProDescription={values?.ProDescription}
          ProDescuento={values?.ProDescuento}
          ProPrice={values?.ProPrice}
          alt={alt}
          onTargetClick={onTargetClick}
          pName={names}
          src={src}
        />

        {/* <FoodCardPreview
          Country={countries}
          PCant={values?.ProUniDisponibles}
          PDescription={values?.ProDescription}
          alt={alt}
          desc={values?.ProDescuento}
          features={features}
          fileInputRef={fileInputRef}
          intPorcentaje={intPorcentaje}
          onFileInputChange={onFileInputChange}
          onTargetClick={onTargetClick}
          setRating={setRating}
          src={src}
          start={rating}
          valuesP={names}
        /> */}
      </Card>

    </Container>

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
          {!data?.length === 0 ? <SkeletonP /> : data?.map(producto => {
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
      >{loading ? <Loading /> : 'CARGAR MÁS'}</RippleButton>
    </ContentProducts>

    <AwesomeModal
      backdrop='static'
      borderRadius='10px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='100vh'
      onCancel={() => { return false }}
      onHide={() => { OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }}
      padding='25px'
      show={OPEN_MODAL_ORGANICE.state}
      size='90%'
      zIndex='9999999'
    >
      <Grid
        gridColGap='30px'
        gridColumns={3}
        gridRows={1}
        gridRowsGap='20px'
        height='100%'
      >
        <div>
          Todos los productos
          <ComponentCardProduct
            ADD_PRODUCT={'ADD_PRODUCT'}
            ADD_TO_EFFECTIVE={'ADD_TO_EFFECTIVE'}
            REMOVE={'REMOVE_PRODUCT'}
            data={data}
            dispatch={dispatch}
          />
        </div>
        <div>
          Productos para recoger
          <ComponentCardProduct
            REMOVE={'REMOVE_PRODUCT'}
            data={product_state?.PRODUCT_RECOGER}
            dispatch={dispatch}
          />
        </div>
        <div>
          Pagos en efectivo
          <ComponentCardProduct
            REMOVE={'REMOVE_EFFECTIVE'}
            data={product_state?.PRODUCT_EFFECTIVE}
            dispatch={dispatch}
          />
        </div>
      </Grid>

    </AwesomeModal >

  </>
  )
}

FoodComponent.propTypes = {
  alt: PropTypes.any,
  countries: PropTypes.any,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  dataFree: PropTypes.shape({
    length: PropTypes.any
  }),
  dispatch: PropTypes.any,
  features: PropTypes.any,
  fetchMore: PropTypes.func,
  fileInputRef: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleCheckEnvioGratis: PropTypes.any,
  handleDelete: PropTypes.any,
  handleRegister: PropTypes.any,
  intPorcentaje: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onClickClear: PropTypes.func,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.any,
  product_state: PropTypes.shape({
    PRODUCT_EFFECTIVE: PropTypes.any,
    PRODUCT_RECOGER: PropTypes.any
  }),
  rating: PropTypes.any,
  search: PropTypes.any,
  setName: PropTypes.func,
  setRating: PropTypes.func,
  setShowMore: PropTypes.func,
  showMore: PropTypes.any,
  src: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProLength: PropTypes.any,
    ProPrice: PropTypes.any,
    ProUniDisponibles: PropTypes.any,
    ProWeight: PropTypes.any,
    ValueDelivery: PropTypes.any,
    rating: PropTypes.any
  })
}

const ComponentCardProduct = ({ data, dispatch, ADD_TO_EFFECTIVE, REMOVE, ADD_PRODUCT }) => {
  return <div>
    {!data?.length ? 'No data' : data?.map((product, idx) => {
      return (
        <CardProduct grid={true} key={idx + 1} >
          <ButtonCard
            grid={true}
            onClick={() => { return dispatch({ type: REMOVE, idx }) }}
            top={'20px'}
          >
            <IconDelete color={PColor} size={20} />
            <ActionName >
              Eliminar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            delay='.1s'
            grid={true}
            top={'80px'}
          >
            <IconEdit color={PColor} size={20} />
            <ActionName>
              Editar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            delay='.1s'
            grid={true}
            onClick={() => { return dispatch({ type: ADD_PRODUCT && ADD_PRODUCT, payload: product }) }}
            top={'140px'}
          >
            <IconDollar color={TFSColor} size={30} />
            <ActionName>
              Agregar
            </ActionName>
          </ButtonCard>
          {ADD_TO_EFFECTIVE && <ButtonCard
            delay='.0s'
            grid={true}
            onClick={() => { return dispatch({ type: ADD_TO_EFFECTIVE, payload: product }) }}
            top={'200px'}
          >
            <IconLove color={PVColor} size={20} />
            <ActionName>
              Agregar a pagos en efectivo
            </ActionName>
          </ButtonCard>}
          <ContentImg grid={true}>
            {!product.ProImage ? <i>No img</i> : <Img alt={product.ProImage} src={product.ProImage} />}
          </ContentImg>
          <ContentInfo>
            {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
            <Title>{product.pName}</Title>
            <Text>{numberFormat(product.ProPrice)}</Text>
            <ContentInfo>
              {product.ProDelivery === 1 && <span>Gratis</span>}
            </ContentInfo>
          </ContentInfo>
        </CardProduct>
      )
    })}
  </div>
}

ComponentCardProduct.propTypes = {
  ADD_PRODUCT: PropTypes.any,
  ADD_TO_EFFECTIVE: PropTypes.any,
  REMOVE: PropTypes.any,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  dispatch: PropTypes.func
}

export const SkeletonP = () => {
  return <>
    <>
      {[1, 2, 3, 4].map((x, i) => {
        return (
          <CardProduct key={i + 1}>
            <Skeleton />
          </CardProduct>
        )
      })}
    </>
  </>
}
