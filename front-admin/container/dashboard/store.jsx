import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { PColor, APColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Text, Wrapper, CardProductsContent, CardProductsModal, Flex, DisRestaurant, ContentInfo, HeadSticky, ContentImage, TooltipCardProduct, WrapperCard, CtnBox } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { Food } from '../update/Products/food'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from './queries'
import { ContainerFilter, ItemFilter } from '../../components/Update/Products/styled'
import { ButtonAction, WrapperOptions, ContentSearch, Title, ContainerCarrusel } from './styledStore'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ONE_PRODUCTS_FOOD } from '../producto/queries'
import { ExtrasProductsItems } from '../producto/extras'
import { ExtraProducts } from '../Extraproducts'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_PRODUCT_FOOD } from '../update/Products/queries'
import { Context } from 'context/Context'
import moment from 'moment'
import { GET_ALL_PRODUCT_STORE } from './queriesStore'
import { useStore } from 'components/hooks/useStore'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { ManageCategories } from './ManageCategories'
import { Managebanner } from './profile/Managebanner'
import { Sticky, StickyBoundary, StickyViewport } from './stickyheader'
import { IconDelete, IconEdit } from 'public/icons'
import { numberFormat } from 'utils'
import { useOnScreen } from 'components/hooks/useIntersection'

const DashboardStore = () => {
  // STATE
  const { openSchedule, setOpenSchedule, setAlertBox } = useContext(Context)
  // const StoreId = location.query?.name[1]
  // eslint-disable-next-line no-unused-vars
  const [handleChange, _handleSubmit, _setDataValue, { dataForm, errorForm }] = useFormTools()
  const SHOW_MODAL_UPDATE_PRODUCTS = useSetState(false)
  const SHOW_MANAGE_CATEGORIES = useSetState(false)
  // eslint-disable-next-line no-unused-vars
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('')
  const [table, openTable] = useState(false)
  const [dataProCat, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [showMore, setShowMore] = useState(5)
  const [modal, setModal] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [hour, setHour] = useState(null)
  const [day, setDay] = useState()
  const SET_OPEN_PRODUCT = useSetState(false)

  const containerStyle = {
    height: '100vh'
    // overflowY: 'auto',
  }
  // QUERY
  const [getCatProductsWithProduct, { data: dataProductAndCategory, loading: loadCatPro }] = useLazyQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
    fetchPolicy: 'network-only',
    variables:
    {
      search,
      gender: searchFilter?.gender,
      desc: searchFilter?.desc,
      categories: searchFilter?.speciality
    }
  })

  // QUERIES
  const [store] = useStore()
  const [productFoodsOne, { data: dataProduct, loading }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
  const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
  const router = useRouter()
  const { name } = router.query
  // HANDLE
  const handleGetOneProduct = (food) => {
    router.replace(`/dashboard/${name[0]}/${name[1]}/?modal=true`)
    try {
      SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
      productFoodsOne({ variables: { pId: food.pId } })
      ExtProductFoodsOptionalAll({ variables: { pId: food.pId } })
      ExtProductFoodsAll({ variables: { pId: food.pId } }).then(() => { return setAlertBox({ message: 'success' }) }).catch(() => { return setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }) })
    } catch (error) {
      setAlertBox({ message: 'Lo sentimos, ocurrió un error' })
    }
  }
  // eslint-disable-next-line no-unused-vars
  const { getStore, pId, pName, ProPrice, ProDescuento, ProDescription, ProImage } = dataProduct?.productFoodsOne || {}
  const { storeName } = getStore || {}
  const { storeName: nameStore } = store || {}

  const handleStuck = target => {
    target.style.BorderStyle = 'solid'
    target.style.BorderColor = '#e6e6e6'
    target.style.backgroundColor = PColor
    target.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.14)'
  }

  const handleUnstuck = () => {
    // target.style.backgroundColor = BGColor
    // target?.style?.boxShadow = ''
  }
  const handleChangeLol = ({ type }) => {
    if (type === 'stuck') {

      // target.style.backgroundColor = PColor;
      // target.style.BorderBottom = '1px solid'
    } else {
      // target?.style?.backgroundColor = BGColor
      // target?.style?.BorderBottom = '1px solid'
    }
  }
  // EFFECTS
  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    dataProductAndCategory?.getCatProductsWithProduct && setData([...dataProductAndCategory?.getCatProductsWithProduct])
  }, [dataProductAndCategory, searchFilter])
  useEffect(() => {
    getCatProductsWithProduct({ variables: { max: showMore } })
  }, [getCatProductsWithProduct, searchFilter, showMore])
  useEffect(() => {
    let date = new Date().getTime()
    let dateDay = new Date().getUTCDay()
    setDay(dateDay)
    setHour(moment(date).format('hh:mm'))
  }, [])
  // COMPONENTS
  // eslint-disable-next-line
  const stickySectionElements = Array.from(dataProCat)?.map((x, key) => {
    return (
      <div key={x.carProId}>
        <StickyBoundary
          key={key}
          onChange={handleChangeLol}
          onStuck={handleStuck}
          onUnstuck={handleUnstuck}
        >
          <Sticky
            as='h1'
            id={key}
            name={x.pName}
          >
            <ContentSearch>
              <Title size='.9em'>{x.pName}</Title>
            </ContentSearch>
          </Sticky>
          <ContainerCarrusel>
            {x.productFoodsAll?.length > 0 ? x.productFoodsAll?.map(food => {
              return (
                <CardProducts
                  food={food}
                  key={food.pId}
                  onClick={() => { return handleGetOneProduct(food) }}
                  setAlertBox={setAlertBox}
                />
              )
            }) : <Text size='15px'>No hay productos En la categoría {x.pName}</Text>}
          </ContainerCarrusel>
        </StickyBoundary>
      </div>)
  })

  return (<>
    <Wrapper>
      {(loadCatPro || loading) && <Loading />}
      <Container>
        <Managebanner />
        <WrapperOptions>
          <div>
            <ButtonAction onClick={() => { return SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }}> Subir productos</ButtonAction >
            <ButtonAction onClick={() => { return setOpenSchedule(!openSchedule) }}> Editar agenda </ButtonAction>
            <ButtonAction onClick={() => { return SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state) }}> Administrar Categorías</ButtonAction>
            <ButtonAction onClick={() => { return openTable(!table) }}> Ver sobre mesa</ButtonAction>
          </div>
        </WrapperOptions>
        <InputHooks
          errors={errorForm?.search}
          name='search'
          onChange={handleChange}
          required
          title='Buscar en el menu'
          value={dataForm?.search}
        />
        <StickyViewport as='main' style={containerStyle}>
          {stickySectionElements}
        </StickyViewport>
      </Container>
      {/* MODALS */}
      <AwesomeModal
        backdrop='static'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return false }}
        onHide={() => { SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state) }}
        show={SET_OPEN_PRODUCT.state}
        size='large'
        zIndex='999'
      >
        <CardProductsModal>
          <ContentImage>
            <Image
              alt={ProDescription || 'img'}
              blurDataURL='data:...'
              className='store_image'
              height={450}
              objectFit='contain'
              placeholder='blur'
              src={ProImage || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
              width={450} // Optional blur-up while loading
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
        <ContainerFilter>
          <ItemFilter onClick={() => { return setModal(!modal) }}>Añadir Adicionales</ItemFilter>
        </ContainerFilter>
        {/* <OptionalExtraProducts
          dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
          pId={pId}
        /> */}
      </AwesomeModal>
      <AwesomeModal
        backdrop='static'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return false }}
        onHide={() => { SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }}
        show={SHOW_MODAL_UPDATE_PRODUCTS.state}
        size='large'
      >
        {SHOW_MODAL_UPDATE_PRODUCTS.state && <Food />}
      </AwesomeModal>
      <AwesomeModal
        backdrop='static'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return false }}
        onHide={() => { return openTable(!table) }}
        padding='20px'
        show={table}
        size='large'
        zIndex='99390'
      >
        {table && <ExtraProducts />}
      </AwesomeModal>
      <AwesomeModal
        backdrop='static'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return false }}
        onHide={() => { SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state) }}
        padding='25px'
        show={SHOW_MANAGE_CATEGORIES.state}
        size='100%'
        zIndex='9990'
      >
        {SHOW_MANAGE_CATEGORIES.state && <ManageCategories SHOW_MODAL_UPDATE_PRODUCTS={SHOW_MODAL_UPDATE_PRODUCTS} />}
      </AwesomeModal>
    </Wrapper>
  </>
  )
}

export const CardProducts = ({ food, onClick, setAlertBox }) => {
  const router = useRouter()
  const [setRef, isVisible] = useOnScreen()
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)
  const handleDelete = product => {
    const { pId, pState, pName } = product || {}
    updateProductFoods({
      variables: {
        input: {
          pId,
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
        setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  // const da = HookMouse()
  return (
    <div ref={setRef}>
      {<WrapperCard>
        {/* {da}     */}
        <TooltipCardProduct>
          <button onClick={() => { return router.push(`/producto/editar/${food.pId}`) }}>
            <IconEdit color={PColor} size={20} />
          </button>
        </TooltipCardProduct>
        <TooltipCardProduct left='50px'>
          <button onClick={() => { return handleDelete(food) }}>
            <IconDelete color={PColor} size={20} />
          </button>
        </TooltipCardProduct>
        <CardProductsContent onClick={onClick} >
          <CtnBox>
            {isVisible === true && <h3 className='card__description'>{food.pName}</h3>}
            {isVisible === true && <h3 className='card__description'>{food.ProDescription}</h3>}
            {isVisible === true && <div className='footer'>
              <span className='card__price'>$ {numberFormat(food.ProPrice)}</span>
              <span className='card__des' style={{ color: APColor }}>$ {numberFormat(food.ProDescuento)}</span>
            </div>}
          </CtnBox>
          <CtnBox>
            {isVisible === true && <Image
              alt={food.ProDescription || 'img'}
              // width={150}
              // height={150}
              blurDataURL='/images/DEFAULTBANNER.png'
              layout='fill'
              objectFit='cover'
              src={food.ProImage}
            />}
          </CtnBox>
        </CardProductsContent>
      </WrapperCard>}
    </div>
  )
}

CardProducts.propTypes = {
  food: PropTypes.shape({
    ProDescription: PropTypes.string,
    ProDescuento: PropTypes.any,
    ProImage: PropTypes.any,
    ProPrice: PropTypes.any,
    pId: PropTypes.any,
    pName: PropTypes.any
  }),
  onClick: PropTypes.any,
  setAlertBox: PropTypes.func
}
DashboardStore.propTypes = {

}

export default DashboardStore

