import React, { useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, CateItem, ContainerGrid, ContentCalcules, ContentCheckbox, CtnSwiper, DownLoadButton, FlipTop, Form, Input, OptionButton, ScrollbarProduct, Ticket, Toast, Wrapper } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { CardProducts } from 'container/producto/editar';
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'
import { GET_ALL_PRODUCT_STORE, GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { IconPrint, IconDelete, IconSales, IconCancel } from 'public/icons'
import { BGColor, PColor } from 'public/colors'
import { numberFormat, RandomCode } from 'utils'
import { RippleButton } from 'components/Ripple'
import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import moment from 'moment'
import { CardProducts } from 'components/CartProduct'
import { Prints } from './Printsale'
import { CREATE_MULTIPLE_ORDER_PRODUCTS } from './queries'
import { Context } from 'context/Context'
import { Range } from 'components/InputRange'
import { TextH2Main } from 'components/common/h2'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { Checkbox } from 'components/Checkbox'
const GenerateSales = () => {
  // STATES
  const { setAlertBox } = useContext(Context)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const code = RandomCode(5)
  const [dataProducto, setData] = useState([])
  const [showMore, setShowMore] = useState(50)
  const [search, setSearch] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [print, setPrint] = useState(false)
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  const [values, setValues] = useState({})
  const handleChange = e => { return setValues({ ...values, [e.target.name]: e.target.value }) }
  const [{ fromDate, toDate }, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
  const [handleChangeProducts, { dataForm, errorForm }] = useFormTools()
  const initialStateInvoice = {
    PRODUCT: []
  }

  // QUERIES
  const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
  const { data: dataMinPedido } = useQuery(GET_MIN_PEDIDO)

  const [createMultipleOrderStore] = useMutation(CREATE_MULTIPLE_ORDER_PRODUCTS, {
    onCompleted: data => {
      if (data.createMultipleOrderStore.success === true) {
        console.log('first')
      }
    }
  })
  const { checkedItems, disabledItems, handleChangeCheck } = useCheckboxState(datCat?.catProductsAll)
  const arr = []
  for (let categories of checkedItems.keys()) {
    arr.push(categories)
  }

  // llama a los productos y espera una acción
  /* Filtro  */
  const [productFoodsAll, { data: dataProduct, fetchMore, loading }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: 'network-only',
    variables:
    {
      search: search,
      gender: searchFilter?.gender,
      desc: searchFilter?.desc,
      categories: searchFilter?.speciality
    }
  })
  // EFFECTS 
  useEffect(() => {
    if (dataProduct?.productFoodsAll) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setData([...dataProduct?.productFoodsAll])
    }
  }, [dataProduct, searchFilter, search])
  useEffect(() => {
    productFoodsAll({ variables: { max: showMore, search: search } })
  }, [searchFilter, showMore, search, productFoodsAll])

  // const download = () => {
  //     window.print();
  //   };
  // eslint-disable-next-line
  const download = (elementId, uniqueIframeId) => {
    const content = document.getElementById(elementId)
    let pri
    if (document.getElementById(uniqueIframeId)) {
      pri = document.getElementById(uniqueIframeId).contentWindow
    } else {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('title', uniqueIframeId)
      iframe.setAttribute('id', uniqueIframeId)
      // iframe.setAttribute('style', 'width: 155px; position: relative;')
      document.body.appendChild(iframe)
      pri = iframe.contentWindow
    }
    pri.document.open()
    pri.document.write(content.innerHTML)
    pri.document.close()
    pri.focus()
    pri.print()
  }

  const addToCartFunc = (state, action) => {
    const productExist = state.PRODUCT.find(
      (items) => { return items.pId === action.payload.pId }
    )
    return {
      ...state,
      counter: state.counter + 1,
      totalAmount: state.totalAmount + action.payload.ProPrice,
      PRODUCT: !productExist
        ? [
          ...state.PRODUCT,
          {
            pId: action.payload.pId,
            ProQuantity: 1,
            ProPrice: action.payload.ProPrice,
            name: action.payload.name
          }
        ]
        : state.PRODUCT.map((items) => {
          return items.pId === action.payload.pId
            ? { ...items, ProQuantity: items.ProQuantity + 1 }
            : items
        }
        )
    }
  }
  const PRODUCT = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return addToCartFunc(state, action)
      case 'ADD_PRODUCT':
        return {
          ...state,
          // eslint-disable-next-line
          PRODUCT: [...state?.PRODUCT, action?.payload]
        }
      case 'REMOVE_PRODUCT':
        return {
          ...state,
          PRODUCT: state?.PRODUCT?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_PRODUCT_WALLET':
        return {
          PRODUCT_WALLET: state?.PRODUCT_WALLET?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL':
        return {
          ...state,
          PRODUCT: []
        }
      case 'TOGGLE_FREE_PRODUCT':
        return {
          ...state,
          PRODUCT: state?.PRODUCT.map((t, idx) => {
            return idx === action.idx ? {
              ...t,
              free: !t.free
            } : t
          })
        }
      case 'INCREMENT':
        return {
          ...state,
          PRODUCT: state?.PRODUCT.map((item) => {
            if (item.pId === action.id) {
              return {
                ...item,
                ProQuantity: item.ProQuantity + 1,
                ProPrice: item.ProQuantity * item.ProPrice
              }
            }
            return {
              ...item
            }

          })
        }
      case 'DECREMENT':
        return {
          ...state,
          PRODUCT: state.PRODUCT.map((item) => {
            if (item.pId === action.id && item.ProQuantity > 0) {
              return {
                ...item,
                ProQuantity: item.ProQuantity - 1,
                ProPrice: item.ProPrice - item.ProPrice
              }
            }
            return {
              ...item
            }

          })
        }
      default:
        return state
    }
  }

  const [data, dispatch] = useReducer(PRODUCT, initialStateInvoice)
  let suma = 0
  let total = 0
  useEffect(() => {
    data.PRODUCT.forEach((a) => {
      const { ProPrice } = a || {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      suma += ProPrice
      setTotalProductPrice(Math.abs(suma))
    })
    if (data.PRODUCT.length === 0) {
      setTotalProductPrice(0)
    }
  }, [totalProductPrice, suma, total, data])
  const newArray = data?.PRODUCT?.map(x => { return x })
  const handleSales = async () => {
    await createMultipleOrderStore({
      variables: {
        input: {
          setInput: newArray || [],
          change: parseInt(values?.change?.replace(/\./g, '')),
          pickUp: 1,
          totalProductsPrice: totalProductPrice,
          pCodeRef: code,
          payMethodPState: 1,
          pPRecoger: 1
        }
      }/*  update: (cache, { data: { getAllShoppingCard } }) => updateCache({
                cache,
                query: GET_ALL_SHOPPING_CARD,
                nameFun: 'getAllShoppingCard',
                dataNew: getAllShoppingCard
            }) */
    })

  }
  const [minPrice, setMinPrice] = useState(0)
  useEffect(() => {
    setMinPrice(dataMinPedido?.getMinPrice || 0)
  }, [minPrice, dataMinPedido])
  console.log(data.PRODUCT)

  return (
    <Wrapper>
      <AwesomeModal
        borderRadius='5px'
        btnCancel={true}
        btnConfirm={true}
        cancel='Guardar'
        confirm='Guardar y salir'
        footer={true}
        header={true}
        height='90vh'
        onConfirm={() => { return handleSales('confirm') }}
        onHide={() => { return setPrint(!print) }}
        padding='25px'
        show={print}
        size='medium'
        zIndex='999999'
      >
        <Prints
          change={values.change}
          code={code}
          data={data?.PRODUCT || []}
          total={`$ ${numberFormat(totalProductPrice)}`}
        />
      </AwesomeModal>
      <AwesomeModal
        borderRadius='5px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { return setDelivery(!delivery) }}
        padding='25px'
        show={delivery}
        size='small'
        title='Añade el costo del envio'
      >
        <Input
          autoComplete='off'
          name='ValueDelivery'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.stateventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='costo de envio'
          value={values?.ValueDelivery}
        />
        <Input
          autoComplete='off'
          name='change'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='Cambio'
          value={values?.change}
        />
      </AwesomeModal>
      <Box>
        <CtnSwiper>
          <Swiper
            autoplay={true}
            modules={[Virtual, Navigation, Pagination, A11y, Parallax]}
            navigation
            slidesPerView={5}
            spaceBetween={10}
            virtual
          >
            {datCat && datCat?.catProductsAll?.map((slideContent, index) => {
              const val = arr?.find(x => { return slideContent.carProId == x })
              return (
                <SwiperSlide
                  effect='fade'
                  key={slideContent.carProId}
                  virtualIndex={index}
                >

                  <CateItem border={val}>
                    <Checkbox
                      checked={checkedItems.has(slideContent.carProId)}
                      disabled={disabledItems.has(slideContent.carProId)}
                      id={slideContent.carProId}
                      label={`${index + 1}`}
                      onChange={handleChangeCheck}
                    />
                    <div className='icon'>
                      <IconSales size={30} />
                    </div>
                    <div>
                      {slideContent.pName.slice(0, 15)}
                    </div>
                  </CateItem>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {/* <Form>
            <InputHooks
              name='fromDate'
              // eslint-disable-next-line no-undef
              onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
              title='Desde'
              type='date'
              value={fromDate}
              width='30%'
            />
            <InputHooks
              name='toDate'
              // eslint-disable-next-line no-undef
              onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
              title='Hasta'
              type='date'
              value={toDate}
              width='30%'
            />
            <InputHooks
              error={errorForm?.ProPrice}
              name='ProPrice'
              onChange={handleChangeProducts}
              required
              title='Numero'
              value={dataForm?.ProPrice}
              width='30%'
            />
            <InputHooks
              error={errorForm?.ProPrice}
              name='ProPrice'
              numeric
              onChange={handleChangeProducts}
              required
              title='Nombre'
              value={dataForm?.ProPrice}
              width='30%'
            />
            <Button type='submit'>
              Mas opciones
            </Button>
            <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
          </Form> */}
          {/* <ContentCheckbox>
            <ContentCheckbox>
              <label>
                Envíos gratis
                <input type='checkbox' />
              </label>
            </ContentCheckbox>
            <ContentCheckbox>
              <label>
                Mejor precio
                <input type='checkbox' />
              </label>
            </ContentCheckbox>
            <Range
              label={`$`}
              max={13413241324}
              min={numberFormat(dataMinPedido?.getMinPrice)}
              value={32432432}
            />
          </ContentCheckbox> */}
        </CtnSwiper>
        <ScrollbarProduct>
          <ContainerGrid>
            {dataProducto.map((producto) => {
              return (
                <div key={producto.pId}>
                  <Toast open={false}>
                    {/* <span size='15px'> {checkedItems?.size} Object selected </span>
                    <DownLoadButton onClick={selectAll}>Select All</DownLoadButton>
                    <DownLoadButton onClick={clearAll}>Clear All</DownLoadButton>
                    <DownLoadButton onClick={toggleAll}>Toggle All</DownLoadButton>
                    <DownLoadButton onClick={clearAll} style={{ border: 'none' }}><IconCancel color={BGColor} size='20px' />  </DownLoadButton> */}
                  </Toast>
                  <button
                    onClick={() =>
                    {return dispatch({
                      type: 'ADD_TO_CART',
                      payload: producto
                    })}
                    }
                  >
                    Add to cart
                  </button>
                  <CardProducts
                    ProDescription={producto.ProDescription}
                    ProDescuento={producto.ProDescuento}
                    ProImage={producto.ProImage}
                    ProPrice={producto.ProPrice}
                    ProQuantity={producto.ProQuantity}
                    ValueDelivery={producto.ValueDelivery}
                    handleDecrement={() => { return dispatch({ id: producto.pId, type: 'DECREMENT' }) }}
                    handleIncrement={() => { return dispatch({ id: producto.pId, type: 'INCREMENT' }) }}

                    onClick={() => { return dispatch({ type: 'ADD_PRODUCT', payload: producto }) }}
                    pName={producto.pName}
                    render={<IconSales size='20px' />}
                    sum={true}
                  />
                </div>
              )
            })}
          </ContainerGrid>

        </ScrollbarProduct>
      </Box>
      <Box width='40%'>
        <ScrollbarProduct margin={'0'}>
          <h2>Productos a vender</h2>
          <OptionButton>
            {/* <button onClick={() => { return setDelivery(!delivery) }}> {values?.ValueDelivery ? <span>1</span> : <span className='free'>Gratis</span>}Costo de envio {numberFormat(values?.ValueDelivery)}</button>
            <button> {!!totalProductPrice && <span>1</span>} Costo total $ {numberFormat(totalProductPrice)}</button> */}
          </OptionButton>
          <ContainerGrid>
            {data?.PRODUCT?.length > 0 ? data.PRODUCT.map((producto, idx) => {
              return (
                <CardProducts
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={producto.ProPrice}
                  ProQuantity={producto.ProQuantity}
                  ValueDelivery={producto.ValueDelivery}
                  free={producto.free}
                  handleDecrement={() => { return dispatch({ id: producto.pId, type: 'DECREMENT' }) }}
                  handleFree={true}
                  handleFreeProducts={() => { return dispatch({ type: 'TOGGLE_FREE_PRODUCT', idx }) }}
                  handleIncrement={() => { return dispatch({ id: producto.pId, type: 'INCREMENT' }) }}
                  key={idx + 1}
                  onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', idx }) }}
                  pName={producto.pName}
                  render={<IconDelete color={PColor} size='20px' />}
                  sum={true}
                />
              )
            }) : <div><IconSales size={100} /></div>}
          </ContainerGrid>
        </ScrollbarProduct>
        <ContentCalcules>
          <Box display='flex' width='40%'>
            <TextH2Main
              color={BGColor}
              size='15px'
              text={`$ ${numberFormat(totalProductPrice)}`}
            />
          </Box>
          <Box display='flex' width='40%'>
            <TextH2Main
              color={BGColor}
              size='15px'
              text={`$ ${numberFormat(totalProductPrice)}`}
            />
            <FlipTop>
              <Button onClick={() => { return setPrint(!print) }} radius='50%'><IconPrint color={BGColor} size={30} /></Button>
            </FlipTop>
          </Box>
        </ContentCalcules>
      </Box>

    </Wrapper >
  )
}

GenerateSales.propTypes = {
  data: PropTypes.array
}

export default GenerateSales