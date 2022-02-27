import { useLazyQuery, useMutation } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import withSession from '../../../../apollo/session'
import { CREATE_SHOPPING_CARD } from '../../../../components/AsideCheckout/querys'
import { useFormTools } from '../../../../components/BaseForm'
import { useSetState } from '../../../../components/hooks/useState'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_ONE_PRODUCTS_FOOD, GET_ONE_STORE_BY_ID } from '../../../../container/queries'
import { GET_ALL_SHOPPING_CARD } from '../../../../container/restaurantes/queries'
import { RestaurantProfile } from '../../../../container/RestaurantProfile'
import { Context } from '../../../../context'
import { numberFormat, updateCache } from '../../../../utils'

export default function HomeView() {
  // STATES
  const location = useRouter()
  const name = location.query.name
  const id = location.query.id
  const locationName = location.query.location
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [searchFilter, setSearchFilter] = useState({ subOptional: [] })
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [registerShoppingCard] = useMutation(CREATE_SHOPPING_CARD)

  const [showMore, setShowMore] = useState(100)
  const [dataCatProducts, setData] = useState([])
  const SET_OPEN_PRODUCT = useSetState(false)
  const { increase, setState, state, decrease, reset } = useSetState(1)
  // QUERIES
  const [getOneStore, { data }] = useLazyQuery(GET_ONE_STORE_BY_ID)
  const [productFoodsOne, { data: dataOneProduct }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
  const [ExtProductFoodsOptionalAll, { error: errorOptional, data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [getCatProductsWithProductClient, { data: dataProductAndCategory, loading: loadCatPro }] = useLazyQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
    fetchPolicy: 'network-only',
    variables:
    {
      search: '',
      gender: searchFilter?.gender,
      desc: searchFilter?.desc,
      categories: searchFilter?.subOptional,
    }
  })
  // EFFECTS
  useEffect(() => {
    dataProductAndCategory?.getCatProductsWithProductClient && setData([...dataProductAndCategory?.getCatProductsWithProductClient])
  }, [dataProductAndCategory, searchFilter])

  useEffect(() => {
    getCatProductsWithProductClient({ variables: { max: 100, idStore: id } })
  }, [searchFilter, showMore])
  useEffect(() => {
    getOneStore({ variables: { idStore: id, StoreName: name } })

  }, [])
  // HANDLES
  /**
   *
   * @param {elem} food obtiene un producto del la list
   * @author {autor} Jesus Juvinao
   * @action Obtiene un producto de DB  
   */

  const getOneProduct = food => {
    SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
    productFoodsOne({ variables: { pId: food.pId } })
    ExtProductFoodsOptionalAll({ variables: { pId: food.pId } })
  }
  const [filter, setFilter] = useState({ subOptional: [] })
  const handleChangeClickOnTable = e => {
    const { name, value, checked } = e.target
    !checked ? setFilter(s => ({ ...s, [name]: s[name].filter(f => f !== value) })) : setFilter({ ...filter, [name]: [...filter[name], value] })
    setSearchFilter({ ...filter })
  }
  const handleAddProducts = food => {
    console.log(food)
    const val = state_product_card.PRODUCT?.find(x => x.pId === food.pId)
    handleMenu(1)
    if (val) {
      setAlertBox({ message: `El producto ${food.pName} ya esta en la cesta` })
    } else {
      const result = { ...food, cantProducts: state, comments: dataForm.comments, subOptional: filter?.subOptional || [] };
      const newArray = filter?.subOptional.map(x => { return { _id: x } })
      registerShoppingCard({
        variables: {
          input: {
            cState: 1,
            pId: food.pId,
            idStore: food.getStore.idStore,
            comments: dataForm.comments,
            cName: 'puta madre',
            cantProducts: state,
            csDescription: 'csDescription',
          },
          idSubArray: {
            setID: newArray || []
          }
        }, update: (cache, { data: { getAllShoppingCard } }) => updateCache({
          cache,
          query: GET_ALL_SHOPPING_CARD,
          nameFun: 'getAllShoppingCard',
          dataNew: getAllShoppingCard
        })
      }).catch(err => console.log(err));
      // dispatch({ type: 'ADD_PRODUCT', payload: result })
    }
  }
  const handleCountProducts = useCallback((ProPrice, state) => {
    const price = parseFloat(ProPrice)
    return state <= 0 ? price : numberFormat((Math.abs(state * price)))
  }, [dataOneProduct])

  const refs = useRef([React.createRef(), React.createRef()])
  const refInterSection = useRef(null)
  useEffect(() => {
    refs.current = refs.current.splice(0, dataCatProducts?.length)
    for (let i = 0; i < dataCatProducts?.length; i++) {
      refs.current[i] = refs.current[i] || React.createRef()
    }
    refs.current = refs.current.map(item => item || React.createRef())
  }, [dataCatProducts,refs])
  const ArrayValues = refs.current.map(item => { return { value: item?.current } })
  return (
    <div>
      <Head>
        <title>Delivery Restaurante - {name?.toLocaleLowerCase()} - {locationName?.toLocaleLowerCase()} </title>
        <meta name="description" content={location.query.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RestaurantProfile
        dataForm={dataForm}
        refs={refs}
        id={id}
        refInterSection={refInterSection}
        dataOptional={dataOptional?.ExtProductFoodsOptionalAll}
        dataCatProducts={dataCatProducts}
        getOneProduct={getOneProduct}
        SET_OPEN_PRODUCT={SET_OPEN_PRODUCT}
        errorForm={errorForm}
        dataOneProduct={dataOneProduct?.productFoodsOne || {}}
        handleChangeClickOnTable={handleChangeClickOnTable}
        handleChange={handleChange}
        data={data?.getOneStore || {}}
        // dataCatAndProducts={data?.getOneStore || {}}
        name={name?.replace(/-/g, ' ')}
        state={state}
        increase={increase}
        handleCountProducts={handleCountProducts}
        decrease={decrease}
        setState={setState}
        // add product
        handleAddProducts={handleAddProducts}
      />
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req?.session?.get('user')
  if (!user) {
    res.setHeader('location', '/entrar')
    res.statusCode = 302
    res.end()
    return { props: {} }
  }
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/entrar' } }

  return {
    props: {}
  }
}
)