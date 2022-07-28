import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useLazyQuery, useMutation } from '@apollo/client'
import { PColor, APColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import { useRouter } from 'next/router'
import { Container, Wrapper, CardProductsContent, TooltipCardProduct, WrapperCard, CtnBox } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { Food } from '../update/Products/food'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from './queries'
import { WrapperOptions, ContentSearch, Title, ContainerCarrusel } from './styledStore'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ONE_PRODUCTS_FOOD } from '../producto/queries'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_PRODUCT_FOOD } from '../update/Products/queries'
import { Context } from 'context/Context'
import moment from 'moment'
import { GET_ALL_PRODUCT_STORE } from './queriesStore'
import { useStore } from 'components/hooks/useStore'
import { ManageCategories } from './ManageCategories'
import { Managebanner } from './profile/Managebanner'
import { Sticky, StickyBoundary, StickyViewport } from './stickyheader'
import { IconDelete, IconEdit } from 'public/icons'
import { numberFormat } from '../../utils'
import { Skeleton } from 'components/Skeleton'
import { useOnScreen } from 'hooks/useIntersection'
import { Product } from './Product'
import { ItemFilter } from 'components/Update/Kit/styled'

const DashboardStore = () => {
  // STATE
  const { openSchedule, setOpenSchedule, setAlertBox } = useContext(Context)
  // const StoreId = location.query?.name[1]
  // eslint-disable-next-line
  const [handleChange, _handleSubmit, _setDataValue, { dataForm, errorForm }] = useFormTools()
  const SHOW_MODAL = useSetState(false)
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line
  const [search, setSearch] = useState('')
  // eslint-disable-next-line
  const [catProduct, setValueCatPorducts] = useState({})
  const [OptionCatProduct, setOpenOptionCatProducts] = useState(false)
  const [table, openTable] = useState(false)
  const [dataProCat, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line
  const [showMore, setShowMore] = useState(5)
  const [modal, setModal] = useState(false)
  const [modalStore, setModalStore] = useState(false)
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line
  const [hour, setHour] = useState(null)
  // eslint-disable-next-line
  const [day, setDay] = useState()
  const SET_OPEN_PRODUCT = useSetState(false)

  const containerStyle = {
    height: '100vh'
    // overflowY: 'auto',
  }
  const router = useRouter()
  const { name, plato } = router.query
  const formatRouter = `/dashboard/${name[0]}/${name[1]}`
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
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)


  // HANDLE
  const handleGetOneProduct = (food) => {
    try {
      router.replace(`/dashboard/${name[0]}/${name[1]}/?plato=${food.pId}`)
      setModalStore(!modalStore)
      SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
      productFoodsOne({ variables: { pId: food.pId || plato } })
      ExtProductFoodsOptionalAll({ variables: { pId: food.pId || plato } })
      ExtProductFoodsAll({ variables: { pId: food.pId || plato } }).then(() => { return setAlertBox({ message: '' }) }).catch(() => { return setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }) })
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

  const handleUnstuck = (target) => {
    target.style.backgroundColor = ''
    // target.style.boxShadow = 'blue'
  }
  const handleChangeLol = (elem) => {
    const { type, target } = elem
    if (type === 'unstuck') {
      // target.style.backgroundColor = 'red'
      target.style.BorderBottom = '1px solid'
    } else {
      target.style.backgroundColor = 'blue'

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

  const stickySectionElements = dataProCat?.map((x, key) => {
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
            onClick={() => { return setOpenOptionCatProducts(x.carProId) }}
          >

            <ContentSearch>
              {OptionCatProduct === x.carProId ?
                <input
                  autoFocus={true}
                  placeholder={x.pName}
                  type='text'
                // value={'' || x.pName}
                /> :
                <Title size='.9em'>{x.pName} ({x.productFoodsAll?.length || 0})</Title>
              }
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
            }) : <Skeleton height={200} numberObject={2} />}
          </ContainerCarrusel>
        </StickyBoundary>
      </div>)
  })

  const handleHidden = () => {
    router.replace(formatRouter)
    setModalStore(!modalStore)
  }
  const handleOpenModal = (option) => {
    if (option) {
      router.replace(`${formatRouter}/update/${option}`)
      setModalStore(!modalStore)
    }
  }
  useEffect(() => {
    if (plato) {
      setModalStore(true)
      productFoodsOne({ variables: { pId: plato } })
      try {
        productFoodsOne({ variables: { pId: plato } })
        ExtProductFoodsOptionalAll({ variables: { pId: plato } })
        ExtProductFoodsAll({ variables: { pId: plato } }).then(() => { return setAlertBox({ message: '' }) }).catch(() => { return setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }) })
      } catch (error) {
        setAlertBox({ message: 'Lo sentimos, ocurrió un error' })
      }
    }
    if (name[3]) {
      SHOW_MODAL.setState(true)
    }
    // eslint-disable-next-line
  }, [plato])
  const component = {
    food: name[3] === 'food' && <Food />,
    categories: name[3] === 'categories' && <ManageCategories />,
    plato: plato && <h1>Hola</h1>
  }
  const handleDelete = product => {
    const { pId, pState, pName } = product || dataProduct?.productFoodsOne
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
  const buttons = () => {
    return (
      <WrapperOptions>
        <ItemFilter
          onClick={() => { return handleOpenModal('food') }}
          padding={'10px'}
        > Subir productos</ItemFilter >
        <ItemFilter
          onClick={() => { return setOpenSchedule(!openSchedule) }}
          padding={'10px'}
          radius={'19px'}
        > Editar agenda </ItemFilter>
        <ItemFilter
          onClick={() => { return handleOpenModal('categories') }}
          padding={'10px'}
          radius={'19px'}
        > Administrar Categorías</ItemFilter>
        {/* <ItemFilter
          onClick={() => { return openTable(!table) }}
          padding={'10px'}
          radius={'19px'}
        > Ver sobre mesa</ItemFilter> */}
      </WrapperOptions>
    )
  }
  return (<>
    <Wrapper>
      {(loadCatPro || loading) && <Loading />}
      <Container>
        <Managebanner />
        {buttons()}

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
      {(modalStore || name[3]) && <AwesomeModal
        backdrop='static'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return handleHidden() }}
        onHide={() => { handleHidden() }}
        show={modalStore}
        size='large'
        zIndex='999'
      >
        {(plato && modalStore) ? <Product
          ProDescription={ProDescription}
          ProDescuento={ProDescuento}
          ProImage={ProImage}
          ProPrice={ProPrice}
          dataExtra={dataExtra}
          dataOptional={dataOptional}
          handleDelete={handleDelete}
          modal={modal}
          nameStore={nameStore}
          pId={pId}
          pName={pName}
          setModal={setModal}
          store={store}
          storeName={storeName}

        /> : component[name[3]]}
      </AwesomeModal>}
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
  return (
    <div ref={setRef}>
      {<WrapperCard>
        {/* {da}     */}
        <TooltipCardProduct>
          <button onClick={() => { return router.push(`/update/products/editar/${food.pId}`) }}>
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

