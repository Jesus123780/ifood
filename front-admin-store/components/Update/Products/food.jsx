import PropTypes from 'prop-types'
import { numberFormat } from '../../../utils'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import { PColor, PVColor, TFSColor } from '../../../public/colors'
import { Container, Card, CardProduct, Img, ContentImg, Title, Text, ContentInfo, ButtonCard, ActionName, Grid } from './styled'
import { useSetState } from '../../hooks/useState'
import { AwesomeModal } from '../../AwesomeModal'
import { IconDelete, IconDollar, IconEdit, IconLove } from 'public/icons'
import FormProduct from './Form'
import { CardProducts } from 'components/CartProduct'
import { ListProducts } from './ListProducts'

export const FoodComponent = ({ search, handleChangeFilter, data, setShowMore, values, handleRegister, fetchMore, dataCategoriesProducts, dispatch, handleChange, names, loading, onTargetClick, onFileInputChange, fileInputRef, showMore, alt, product_state, src, setName, onClickClear, handleCheckEnvioGratis, state: grid, dataFree, check, ...props }) => {
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const propsForm = { handleRegister, setName, names, check, handleChange, values, dataCategoriesProducts, handleCheckEnvioGratis, ...props }
  const propsListProducts = { onClickClear, data, OPEN_MODAL_ORGANICE, dataFree, handleChangeFilter, grid, search, showMore, fetchMore, loading, setShowMore, pState: 1, ...props }
  return (<>
    <Container>
      {/* FORM */}
      <Card>
        <FormProduct {...propsForm} />
      </Card>
      {/* PREVIEW CARD PRODUCT */}
      <Card>
        <CardProducts
          ProDescription={values?.ProDescription}
          ProDescuento={values?.ProDescuento}
          ProPrice={values?.ProPrice}
          ValueDelivery={values.ValueDelivery}
          alt={alt}
          fileInputRef={fileInputRef}
          height={'500px'}
          onFileInputChange={onFileInputChange}
          onTargetClick={onTargetClick}
          pName={names}
          src={src}
        />
      </Card>
    </Container>
    {/* <Dessert /> */}
    <ListProducts {...propsListProducts} />
    {false && <AwesomeModal
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
    }
  </>
  )
}

FoodComponent.propTypes = {
  alt: PropTypes.any,
  check: PropTypes.any,
  data: PropTypes.any,
  dataCategoriesProducts: PropTypes.any,
  dataFree: PropTypes.any,
  dispatch: PropTypes.any,
  fetchMore: PropTypes.any,
  fileInputRef: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleCheckEnvioGratis: PropTypes.any,
  handleRegister: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onClickClear: PropTypes.any,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.any,
  product_state: PropTypes.shape({
    PRODUCT_EFFECTIVE: PropTypes.any,
    PRODUCT_RECOGER: PropTypes.any
  }),
  search: PropTypes.any,
  setName: PropTypes.any,
  setShowMore: PropTypes.any,
  showMore: PropTypes.any,
  src: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any
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
            {product.ProDescuento && <span discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</span>}
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
