import React, { useContext, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, CateItem, ContainerGrid, ContentCalcules, ContentCheckbox, CtnSwiper, FlipTop, Form, Input, OptionButton, ScrollbarProduct, Ticket, Wrapper } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { CardProducts } from 'container/producto/editar';
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'
import { GET_ALL_PRODUCT_STORE, GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { IconPrint, IconDelete, IconSales } from 'public/icons'
import { PColor } from 'public/colors'
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
  }, [searchFilter, showMore, search])

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
  const PRODUCT = (state, action) => {
    switch (action.type) {
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
      case 'TOGGLE_INVOICE':
        return {
          ...state,
          PRODUCT: state?.PRODUCT.map((t, idx) => { return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t })
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
      suma += ProPrice
      setTotalProductPrice(Math.abs(suma))
    })
    if (data.PRODUCT.length === 0) {
      setTotalProductPrice(0)
    }
  }, [totalProductPrice, suma, total, data])
  const newArray = data?.PRODUCT?.map(x => { return x })
  const handleSales = async (bool) => {
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

    }).then(() => {
      if (bool) {
        console.log('first')
      }
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })

  }
  const [minPrice, setMinPrice] = useState(0)
  useEffect(() => {
    setMinPrice(dataMinPedido?.getMinPrice || 0)
  }, [minPrice, dataMinPedido])
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
        height='100vh'
        onConfirm={() => { return handleSales('confirm') }}
        onHide={() => { return setPrint(!print) }}
        padding='25px'
        show={print}
        size='small'
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
              e.preventDefault()
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
              return (
                <SwiperSlide
                  effect='fade'
                  key={slideContent.carProId}
                  virtualIndex={index}
                >
                  <CateItem>
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
          <Form>
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
          </Form>
          <ContentCheckbox>
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
          </ContentCheckbox>
        </CtnSwiper>
        <ScrollbarProduct>
          <ContainerGrid>
            {dataProducto.map((producto) => {
              return (
                <CardProducts
                  ProDescription={producto.ProDescription}
                  ProDescuento={producto.ProDescuento}
                  ProImage={producto.ProImage}
                  ProPrice={producto.ProPrice}
                  ValueDelivery={producto.ValueDelivery}
                  key={producto.pId}
                  onClick={() => { return dispatch({ type: 'ADD_PRODUCT', payload: producto }) }}
                  pName={producto.pName}
                  render={<IconSales size='20px' />}
                />
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
                  ValueDelivery={producto.ValueDelivery}
                  key={idx + 1}
                  onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', idx }) }}
                  pName={producto.pName}
                  render={<IconDelete color={PColor} size='20px' />}
                />
              )
            }) : <div><IconSales size={100} /></div>}
          </ContainerGrid>
        </ScrollbarProduct>
        {/* <ContentCalcules>
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
        </ContentCalcules> */}
      </Box>

    </Wrapper >
  )
}

GenerateSales.propTypes = {
  data: PropTypes.array
}

export default GenerateSales