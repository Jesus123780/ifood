/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, CateItem, ContainerGrid, ContentCalcules, CtnSwiper, FlipTop, Warper, Input, ScrollbarProduct, Wrapper } from './styled'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'
import { GET_ALL_PRODUCT_STORE, GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { IconPrint, IconDelete, IconSales } from 'public/icons'
import { BGColor, PColor } from 'public/colors'
import { numberFormat, RandomCode } from 'utils'
import { RippleButton } from 'components/Ripple'
import { AwesomeModal } from 'components/AwesomeModal'
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
import { Skeleton } from 'components/Skeleton'
import { LoadingBabel } from 'components/Loading/LoadingBabel'
import { InputHook } from 'components/Update/Products/Input'
const GenerateSales = () => {
  // STATES
  const arr = []
  let suma = 0
  let total = 0
  const { setAlertBox } = useContext(Context)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const code = RandomCode(5)
  const [search, setSearch] = useState('')
  const [showMore, setShowMore] = useState(50)
  const [inputValue, setInputValue] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [print, setPrint] = useState(false)
  const [values, setValues] = useState({})
  const handleChange = e => { return setValues({ ...values, [e.target.name]: e.target.value }) }
  const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
  const onChangeInput = (e) => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }
  // QUERIES
  const { data: dataProduct, loading, fetchMore } = useQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: 'network-only',
    variables:
    {
      search: search,
      toDate: valuesDates?.toDate,
      fromDate: valuesDates?.fromDate,
      min: 0,
      max: showMore,
      gender: [],
      desc: [],
      categories: arr || []
    }
  })
  const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
  const { checkedItems, disabledItems, handleChangeCheck } = useCheckboxState(datCat?.catProductsAll)
  const { data: dataMinPedido } = useQuery(GET_MIN_PEDIDO)
  const max = dataProduct?.productFoodsAll?.reduce(function (a, b) {
    return Math.max(a, b?.ProPrice || 0)
  }, 0)
  const initialStateInvoice = {
    PRODUCT: [],
    totalPrice: 0,
    sortBy: null,
    itemsInCart: 0,
    priceRange: max || 0,
    counter: 0,
    totalAmount: 0
  }
  const [createMultipleOrderStore] = useMutation(CREATE_MULTIPLE_ORDER_PRODUCTS, {
    onCompleted: data => {
      if (data.createMultipleOrderStore.success === true) {
        setAlertBox({ message: 'success' })
      }
    }
  })


  // EFFECTS 
  for (let categories of checkedItems.keys()) {
    arr.push(categories)
  }
  // HANDLES

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
            pName: action.payload.pName,
            ProImage: action.payload.ProImage
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
  const removeFunc = (state, action) => {
    return {
      ...state,
      counter: state.counter - 1,
      totalAmount: state.totalAmount - action.payload.ProPrice,
      PRODUCT:
        action.payload.ProQuantity > 1
          ? state.PRODUCT.map((items) => {
            return items.pId === action.payload.pId
              ? {
                ...items,
                pId: action.payload.pId,
                ProQuantity: items.ProQuantity - 1
              }
              : items
          }
          )
          : state.PRODUCT.filter((items) => { return items.pId !== action.payload.pId })
    }
  }
  const getSortedProduct = (data, sortBy) => {
    if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
      return data.sort((a, b) => { return b['ProPrice'] - a['ProPrice'] })
    }
    if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
      return data.sort((a, b) => { return a['ProPrice'] - b['ProPrice'] })
    }
    return data
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
        return removeFunc(state, action)
      case 'REMOVE_PRODUCT_':
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
      case 'PRICE_RANGE':
        return {
          ...state,
          priceRange: action.payload
        }
      case 'SORT':
        return { ...state, sortBy: action.payload }
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

  // FILTER PRODUCT DATA
  const PriceRangeFunc = (products, price) => { return products.filter((items) => { return items.ProPrice >= price }) }
  const [data, dispatch] = useReducer(PRODUCT, initialStateInvoice)
  // eslint-disable-next-line
  const [_, setFilteredList] = useState([])
  const sortedProduct = getSortedProduct(data.PRODUCT, data.sortBy)
  const finalFilter = PriceRangeFunc(sortedProduct, data.priceRange)

  const handleList = (text) => {
    let inputText = text.toLowerCase()
    let dataList = []
    dataList = finalFilter.filter((item) => { return item.pName.toLowerCase().includes(inputText) })
    return dataList
  }
  const searchedInput = (words) => {
    setInputValue(words)
    let n = words.split(' ')
    if (n.length !== 0) {
      if (n[n.length - 1] === '') {
        n.pop()
      }
      return n[n.length - 1]
    } return ''
  }
  const handleChangeFilterProduct = (e) => {
    let text = searchedInput(e.target.value)
    if (text === undefined || text === '') {
      return
    }
    let filteredData = handleList(text)
    setFilteredList(filteredData)
  }
  // FILTER PRODUCT DATA_DB
  const handleChangeFilter = e => { setSearch(e.target.value) }


  // EFFECTS
  useEffect(() => {
    data.PRODUCT.forEach((a) => {
      const { ProPrice } = a || {}
      // eslint-disable-next-line
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
      }
    })

  }

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
        onConfirm={() => { return handleSales() }}
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
                  // effect='fade'
                  key={slideContent.carProId}
                  virtualIndex={index}
                >

                  <CateItem border={val}>
                    <Checkbox
                      checked={checkedItems.has(slideContent.carProId)}
                      disabled={disabledItems.has(slideContent.carProId)}
                      id={slideContent.carProId}
                      onChange={handleChangeCheck}
                    />
                    <div className='icon'>
                      <IconSales size={30} />
                    </div>
                    <div>
                      {slideContent?.pName?.slice(0, 15)}
                    </div>
                  </CateItem>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <Warper>
            <InputHooks
              name='fromDate'
              onChange={onChangeInput}
              required
              title='Desde'
              type='date'
              value={valuesDates?.fromDate}
              width={'20%'}
            />
            <InputHooks
              name='toDate'
              onChange={onChangeInput}
              required
              title='Hasta'
              type='date'
              value={valuesDates?.toDate}
              width='20%'
            />
            <InputHooks
              name='search'
              onChange={handleChangeFilter}
              range={{ min: 0, max: 20 }}
              title='Busca tus productos'
              type='text'
              value={search}

              width='30%'
            />
          </Warper>
        </CtnSwiper>
        <ScrollbarProduct>
          <ContainerGrid>
            {(loading && loading && dataProduct?.productFoodsAll?.length <= 0) ? <Skeleton height={400} numberObject={50} /> : dataProduct?.productFoodsAll?.map((producto) => {
              return (
                <div key={producto.pId}>
                  <CardProducts
                    ProDescription={producto.ProDescription}
                    ProDescuento={producto.ProDescuento}
                    ProImage={producto.ProImage}
                    ProPrice={producto.ProPrice}
                    ProQuantity={producto.ProQuantity}
                    ValueDelivery={producto.ValueDelivery}
                    onClick={() => { return dispatch({ type: 'ADD_TO_CART', payload: producto }) }}
                    pName={producto.pName}
                    render={<IconSales size='20px' />}
                  />
                </div>
              )
            })}
          </ContainerGrid>
        </ScrollbarProduct>
        <RippleButton
          margin='0px auto'
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
        >{loading ? <LoadingBabel /> : 'CARGAR MÁS'}</RippleButton>
      </Box>
      <Box width='40%'>
        <ScrollbarProduct margin={'0'}>
          <h2>Productos a vender</h2>
          <Warper>
            <label>
              <input
                checked={data.sortBy && data.sortBy === 'PRICE_HIGH_TO_LOW'}
                name='sort'
                onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_HIGH_TO_LOW' }) }}
                type='checkbox'
              />
            </label>
            <label>
              <input
                checked={data.sortBy && data.sortBy === 'PRICE_LOW_TO_HIGH'}
                name='sort'
                onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_LOW_TO_HIGH' }) }}
                type='checkbox'
              />
            </label>
            <Range
              label='Rango de precio'
              max={max || 0}
              min={dataMinPedido?.getMinPrice || 0}
              onChange={(e) => {
                return dispatch({
                  type: 'PRICE_RANGE',
                  payload: e.target.value
                })
              }
              }
              value={data.priceRange}
            />
          </Warper>
          <InputHook
            id='myInput'
            name='myInput'
            onChange={(e) => {return handleChangeFilterProduct(e) }}
            placeholder='Search for the data..'
            required={true}
            type='text'
            value={inputValue}
          />
          <ContainerGrid>
            {data?.PRODUCT?.length > 0 ? finalFilter.map((producto, idx) => {
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
                  onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
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