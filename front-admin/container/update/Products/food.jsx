import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location'
import { GET_ALL_FOOD_PRODUCTS, GET_ONE_COLOR, UPDATE_IMAGE_PRODUCT_FOOD, UPDATE_PRODUCT_FOOD } from './queries'
import { GET_ALL_SIZE } from '../../../gql/information/Size/size'
import useLocalStorage from '../../../components/hooks/useLocalSorage'
import { GET_ALL_FEATURES_ON_PARENT } from '../../../components/Update/Products/FeaturesProduct/queries'
import { useGetAreas } from '../../../components/hooks/useGetArea'
import { useCategories } from '../../../components/hooks/useCategories'
import { useSetState } from '../../../components/hooks/useState'
import { FoodComponent } from '../../../components/Update/Products/food'
import { GET_ONE_STORE } from '../../Restaurant/queries'
import { convertBase64, getFileSizeByUnit, RandomCode } from '../../../utils'
import { GET_ALL_PRODUCT_STORE } from '../../dashboard/queriesStore'
import { Context } from 'context/Context'
import { URL_ADMIN_SERVER } from 'apollo/urls'
export const Food = () => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({})
  const [features, setFeatures] = useState({})
  const { state, changeState } = useSetState(null)
  const [names, setName] = useLocalStorage('namefood', '')
  // Estado para las estrellas del producto
  const [rating, setRating] = useState(0)
  const { setAlertBox } = useContext(Context)
  // Filtrar product
  const [dataProducto, setData] = useState([])
  const [showMore, setShowMore] = useState(50)
  const [search, setSearch] = useState('')
  /* Filtro  */
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  const [filter, setFilter] = useState({ gender: [], desc: [], speciality: [] })
  //-----------QUERIES ------------
  // LLama a todas las areas
  const { data: datafatures } = useQuery(GET_ALL_FEATURES_ON_PARENT)
  const { data } = useQuery(GET_ONE_COLOR)
  const { data: size } = useQuery(GET_ALL_SIZE)
  const [finalDataAreas, { loading: loadingAreas }] = useGetAreas()
  // Lógica para registrar productos a una categoría
  const [finalDataCategories] = useCategories()
  // Get all info Ubicación
  const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
  const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
  const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
  // Subir producto
  const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
  // llama a los productos y espera una acción
  const [productFoodsAll, { data: dataProduct, fetchMore }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: 'network-only',
    variables:
        {
          search: search,
          gender: searchFilter?.gender,
          desc: searchFilter?.desc,
          categories: searchFilter?.speciality
        }
  })
  // ------------ HANDLES ------------
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const handleChangeSearch = e => {
    if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
    else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
    handleChange(e)
  }
  // Añade mas de una característica por id
  const handleAddFeature = fId => {
    const value = datafatures?.features?.filter(x => {return (x.fId === fId)})
    setFeatures(value)
    // setFeatures(value[0]?.fId)
    if (value.length) {
      try {
        setAlertBox({ message: `${`${value[0]?.typeFeature?.thpName} ${value[0]?.hpqrQuestion}`}`, color: 'success', duration: 7000 })
      } catch (err) {
        setAlertBox({ message: `${err}`, color: 'error', duration: 7000 })
      }
    }
  }
  const setLocalStorage = grid => {
    try {
      window.localStorage.setItem('grid', grid)
      changeState()
    }
    catch (err) {
      setAlertBox({ message: `${err}`, color: 'error', duration: 7000 })
    }
  }
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD, {
  })
  const [setImageProducts] = useMutation(UPDATE_IMAGE_PRODUCT_FOOD, {
    context: { clientName: 'admin-server' },
    onCompleted: () => {
    }
  })
  const [check, setCheck] = useState(false)
  const handleCheckEnvioGratis = e => {
    setCheck(e.target.checked)
    values.ValueDelivery = ''
  }
  const { data: dataStore } = useQuery(GET_ONE_STORE)
  const fileInputRef = useRef(null)
  const initialState = { alt: '/images/DEFAULTBANNER.png', src: '/images/DEFAULTBANNER.png' }
  const [{ alt, src }, setPreviewImg] = useState(initialState)
  // eslint-disable-next-line
    const [imageBase64, setImageBase64] = useState(null)
  const [image, setImage] = useState({})
  const onFileInputChange = async event => {
    const { files } = event.target

    const file = event.target.files[0]
    setImage(file)
    const base64 = await convertBase64(file)
    // eslint-disable-next-line
        const [size, { unit }] = await getFileSizeByUnit(file, "B");
    setImageBase64(base64)
    setPreviewImg(
      files.length
        ? {
          src: URL.createObjectURL(files[0]),
          alt: files[0].name
        }
        : initialState
    )
  }
  const onTargetClick = e => {
    // e.preventDefault()
    console.log(e)
    fileInputRef.current.click()
  }
  console.log(``)
  // Contexto de las notificaciones
  const handleRegister = async e => {
    e.preventDefault()
    const { ProPrice, ProDescuento, ProDescription, ProWeight, ProHeight, ValueDelivery } = values
    // const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_621798-MLA45543191295_042021-W.webp'
    const ProImage = `${URL_ADMIN_SERVER}static/platos/${image?.name}`

    const pCode = RandomCode(9)
    try {
      updateProductFoods({
        variables: {
          input: {
            idStore: dataStore?.getStore?.idStore || '',
            ProPrice: parseFloat(ProPrice.replace(/\./g, '')),
            ProDescuento: ProDescuento,
            ValueDelivery: parseFloat(ValueDelivery),
            ProDescription: ProDescription,
            pName: names,
            pCode,
            pState: 1,
            sTateLogistic: 1,
            ProStar: rating,
            ProImage: ProImage,
            ProHeight: parseFloat(ProHeight),
            ProWeight: ProWeight,
            ProOutstanding: check ? 1 : 0,
            ProDelivery: check ? 1 : 0

          }
        }, update(cache) {
          cache.modify({
            fields: {
              productFoodsAll(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_FOOD_PRODUCTS, data: dataOld })
              }
            }
          })
          setAlertBox({ message: `El producto ${names} subido con éxito`, color: 'success', duration: 7000 })
        }
      }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
      setImageProducts({
        variables: {
          input: {
            file: image,
            pCode
          }
        }
      })
    }
    catch (error) {
      setAlertBox({ message: `${error.message}`, duration: 7000 })
    }
  }
  const handleChangeFilter = e => {
    setSearch(e.target.value)
  }
  const onClickSearch = () => {
    setSearchFilter({ ...filter })
  }
  const onClickClear = () => {
    setSearchFilter({})
  }
  const handleChangeClick = e => {
    const { name, value, checked } = e.target
    !checked ? setFilter(s => {return { ...s, [name]: s[name].filter(f => {return f !== value}) }}) : setFilter({ ...filter, [name]: [...filter[name], value] })
    setSearchFilter({ ...filter })
  }

  useEffect(() => {
    if (dataProduct?.productFoodsAll) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setData([...dataProduct?.productFoodsAll])
    }
  }, [dataProduct, searchFilter, search])
  useEffect(() => {
    productFoodsAll({ variables: { max: showMore, search: search } })
  }, [searchFilter, showMore, search])
  const onChangeRange = () => {
    // const { value } = e.target
    // setFilterPrice(s => ({ ...s, [name]: s[name].filter(f => f !== value) }))
  }
  // ----------- HANDLE PARA ELIMINAR-----------
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
        setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
  }
  const des = values.ProDescuento
  const pri = values.ProPrice
  const impDesc = values.ProPricepDesc = (des * pri) / 100
  const intPorcentaje = Math.round(impDesc)
  // Filtramos los productos con envio gratis
  const freeDelivery = dataProductFree => {
    return dataProductFree.ProDelivery === 1
  }
  const productFree = dataProducto.filter(freeDelivery)
  const initialStateInvoice = {
    PRODUCT_RECOGER: [],
    PRODUCT_EFFECTIVE: []
  }
  const productRecoger = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT_RECOGER: [...state?.PRODUCT_RECOGER, action?.payload]
        }
      case 'ADD_TO_EFFECTIVE':
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT_EFFECTIVE: [...state?.PRODUCT_EFFECTIVE, action?.payload]
        }
      case 'REMOVE_EFFECTIVE':
        return {
          PRODUCT_EFFECTIVE: state?.PRODUCT_EFFECTIVE?.filter((t, idx) => {return idx !== action?.idx})
        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => {return idx !== action?.idx})
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT_RECOGER: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT_RECOGER: state?.PRODUCT_RECOGER.map((t, idx) => {return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t})
        }
      default:
        return state
    }
  }
  const [product_state, dispatch] = useReducer(productRecoger, initialStateInvoice)
  const handleAddProductR = elem => {
    let includes = product_state?.PRODUCT_RECOGER.includes(elem)
    if (includes) {
      setAlertBox({ message: 'The invoice is already added to the list' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }
  }
  const YearArray = dataProduct?.productFoodsAll?.length > 0 && dataProduct?.productFoodsAll.map(x => { return parseInt(x.pDatCre?.replace(/\D/gi, '').substring(0, 4)) })
  let min = YearArray
  let years = []
  const currentYear = new Date().getFullYear()
  useEffect(() => {
    const Years = (startYear) => {
      for (let i = 0; i < YearArray?.length; i++) {
        if (YearArray[i] < min) {
          min = YearArray[i]
        }
      }

      while (startYear <= currentYear) {
        years.push(startYear++)
      }
      return years
    }
    Years(min)
  }, [YearArray, dataProduct, years])

  return (
    <FoodComponent
      alt={alt}
      changeState={changeState}
      cities={dataCities?.cities || []}
      color={data?.getAllColor}
      countries={dataCountries?.countries || []}
      currentYear={currentYear}
      data={dataProducto}
      dataCategories={finalDataCategories?.CategoryproductFoodsAll}
      dataFree={productFree}
      datafatures={datafatures?.features}
      departments={dataDepartments?.departments || []}
      dispatch={dispatch}
      errors={errors}
      features={features}
      fetchMore={fetchMore}
      fileInputRef={fileInputRef}
      finalDataAreas={finalDataAreas?.getAreas}
      handleAddFeature={handleAddFeature}
      handleAddProductR={handleAddProductR}
      handleChange={handleChange}
      handleChangeClick={handleChangeClick}
      handleChangeFilter={handleChangeFilter}
      handleCheckEnvioGratis={handleCheckEnvioGratis}
      handleDelete={handleDelete}
      handleRegister={handleRegister}
      intPorcentaje={intPorcentaje}
      loading={loadCountries || loadRoad}
      loadingAreas={loadingAreas}
      names={names}
      onChangeRange={onChangeRange}
      onChangeSearch={handleChangeSearch}
      onClickClear={onClickClear}
      onClickSearch={onClickSearch}
      onFileInputChange={onFileInputChange}
      onTargetClick={onTargetClick}
      // Datos de filtro
      product_state={product_state || []}
      rating={rating}
      road={dataRoad?.road || []}
      // Datos del areas
      search={search}
      setLocalStorage={setLocalStorage}
      //   Filtro de check
      setName={setName}
      setRating={setRating}
      setShowMore={setShowMore}
      showMore={showMore}
      // Limpiar
      size={size?.getSizes}
      src={src}
      state={state}
      values={values}
      valuesForm={values}

    />
  )
}
Food.propTypes = {
  handleChangeClick: PropTypes.func,
  filterState: PropTypes.object,
  handleChange: PropTypes.func
}