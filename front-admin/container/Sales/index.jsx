/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { GET_ALL_PRODUCT_STORE, GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { IconSales } from 'public/icons'
import { RippleButton } from 'components/Ripple'
import moment from 'moment'
import { CardProducts } from 'components/CartProduct'
import { CREATE_MULTIPLE_ORDER_PRODUCTS } from './queries'
import { Context } from 'context/Context'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { Skeleton } from 'components/Skeleton'
import { LoadingBabel } from 'components/Loading/LoadingBabel'
import { useStore } from 'components/hooks/useStore'
import { ModalSales } from './ModalSales'
import { RandomCode } from 'utils'
import { SwiperSliderCategory } from './SlideCategories'
import { Box, ContainerGrid, ScrollbarProduct, Wrapper } from './styled'
import { FormFilterSales } from './formFilterSales'
import { BoxProductSales } from './BoxProductSales'
import { CREATE_SHOPPING_CARD_TO_USER_STORE } from 'container/clients/queries'

const GenerateSales = () => {
  // STATES
  const arr = []
  let suma = 0
  let total = 0
  const { setAlertBox } = useContext(Context)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const [search, setSearch] = useState('')
  const [showMore, setShowMore] = useState(50)
  const [inputValue, setInputValue] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [print, setPrint] = useState(false)
  const [values, setValues] = useState({})
  const handleChange = e => { return setValues({ ...values, [e.target.name]: e.target.value }) }
  const onChangeInput = (e) => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }
  // QUERIES
  const [dataStore] = useStore()
  const [registerSalesStore] = useMutation(CREATE_SHOPPING_CARD_TO_USER_STORE)

  const { createdAt } = dataStore || {}
  // eslint-disable-next-line consistent-return
  const [valuesDates, setValuesDates] = useState(() => {
    if (createdAt) return {
      fromDate: moment(createdAt).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD')
    }
  })
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
    animateType: '',
    startAnimateUp: '',
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
      startAnimateUp: 'start-animate-up',
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
      case 'REMOVE_PRODUCT_TO_CART':
        return {
          ...state,
          PRODUCT: state?.PRODUCT?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_PRODUCT_WALLET':
        return {
          PRODUCT_WALLET: state?.PRODUCT_WALLET?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL_PRODUCTS':
        return {
          ...state,
          // eslint-disable-next-line
          PRODUCT: []
        }
      case 'TOGGLE_FREE_PRODUCT':
        return {
          ...state,
          PRODUCT: state?.PRODUCT?.map((t, idx) => {
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
  const PriceRangeFunc = (products, price) => { return products?.length > 0 && products?.filter((items) => { return items?.ProPrice >= price }) }
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
  const handleSales = async () => {
    await createMultipleOrderStore({
      variables: {
        input: {
          setInput: [],
          change: parseInt(values?.change?.replace(/\./g, '')),
          pickUp: 1,
          totalProductsPrice: totalProductPrice,
          pCodeRef: 1,
          payMethodPState: 1,
          pPRecoger: 1
        }
      }
    }).catch(() => {
      // setAlertBox({ message: '' })
    })

  }
  const restPropsSalesModal = {
    handleSales,
    setPrint,
    totalProductPrice,
    values,
    code: 1,
    data,
    print,
    setDelivery,
    delivery,
    handleChange

  }
  const restPropsSliderCategory = {
    datCat, checkedItems, disabledItems, handleChangeCheck
  }
  const restPropsFormFilter = {
    onChangeInput, valuesDates, handleChangeFilter, search
  }
  const restPropsProductSales = {
    totalProductPrice, data, dispatch, dataMinPedido, max, inputValue, handleChangeFilterProduct, setPrint, finalFilter, print, handleChange, values
  }

  const newArrayProducts = data?.PRODUCT?.map(x => { return { pId: x.pId, id: values?.cliId, cantProducts: x.ProQuantity, comments: 'Comentarios' } })
  console.log(newArrayProducts)
  const handleSubmit = () => {
    const code = RandomCode(5)
    registerSalesStore({
      variables: {
        input: newArrayProducts || [],
        id: values?.cliId,
        pCodeRef: code,
        change: values.change,
        payMethodPState: 1,
        pickUp: 1,
        totalProductsPrice: data?.totalAmount || 0
      }
    })
  }
  return (
    <Wrapper>
      {/* <button onClick={() => { return handleSales() }}>Subit</button> */}
      <button onClick={() => { return handleSubmit() }}>Subir</button>
      <ModalSales {...restPropsSalesModal} />
      <Box>
        <SwiperSliderCategory {...restPropsSliderCategory} />
        <FormFilterSales {...restPropsFormFilter} />
        <ScrollbarProduct>
          <ContainerGrid>
            {(loading && loading && dataProduct?.productFoodsAll?.length <= 0) ? <Skeleton height={400} numberObject={50} /> : dataProduct?.productFoodsAll?.map((producto) => {
              return (
                <CardProducts
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={producto.ProPrice}
                  ProQuantity={producto.ProQuantity}
                  ValueDelivery={producto.ValueDelivery}
                  key={producto.pId}
                  onClick={() => { return dispatch({ type: 'ADD_TO_CART', payload: producto }) }}
                  pName={producto.pName}
                  render={<IconSales size='20px' />}
                />
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
      <BoxProductSales {...restPropsProductSales} />
    </Wrapper >
  )
}

GenerateSales.propTypes = {
  data: PropTypes.array
}

export default GenerateSales