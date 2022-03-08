import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { CLIENT_URL_BASE } from 'apollo/urls'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import withSession from '../../../../apollo/session'
import { CREATE_SHOPPING_CARD } from '../../../../components/AsideCheckout/querys'
import { useFormTools } from '../../../../components/BaseForm'
import { useSetState } from '../../../../components/hooks/useState'
import { GET_ALL_FAV_STORE, GET_ONE_FAV_STORE, SET_FAVORITES_STORE, SET_START_STORE } from '../../../../container/profile/queries'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_RATING_START_STORE, GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_MIN_PEDIDO, GET_ONE_PRODUCTS_FOOD, GET_ONE_RATING_STORE, GET_ONE_STORE_BY_ID, SET_RATING_STORE } from '../../../../container/queries'
import { GET_ALL_SHOPPING_CARD } from '../../../../container/restaurantes/queries'
import { RestaurantProfile } from '../../../../container/RestaurantProfile'
import { Context } from '../../../../context'
import { numberFormat, updateCache } from '../../../../utils'
// import url from '/y2mate.com - Whatsapp Web sonido de notificación.mp3'
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
  const [setRating] = useMutation(SET_RATING_STORE)

  const [showMore, setShowMore] = useState(100)
  const [dataCatProducts, setData] = useState([])
  const SET_OPEN_PRODUCT = useSetState(false)
  const { increase, setState, state, decrease, reset } = useSetState(1)
  // QUERIES
  const [getOneStore, { data, refetch }] = useLazyQuery(GET_ONE_STORE_BY_ID)
  const [getAllRatingStar, { data: dataStartStore }] = useLazyQuery(GET_ALL_RATING_START_STORE)
  const [getMinPrice, { data: dataMinPedido }] = useLazyQuery(GET_MIN_PEDIDO)
  const [getOneRating, { data: dataRating, loading: loadRating }] = useLazyQuery(GET_ONE_RATING_STORE)
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
  const [audio, setAudio] = useState();
  useEffect(() => {
    // let audio = new Audio('public/y2mate.mp3')
    // audio.play()
    dataProductAndCategory?.getCatProductsWithProductClient && setData([...dataProductAndCategory?.getCatProductsWithProductClient])
    let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
    // console.log(lengths); // 
    const lol = [1, -2, 15, 2, 0, 8].sort(function (a, b) {
      // console.log(a + " <> " + b);
      return a - b;
    });
    let nombres = 'Bilbo, Gandalf, Nazgul';

    let arr = nombres.split(', ');

    for (let name of arr) {
      // console.log(`Un mensaje para ${name}.`); // Un mensaje para Bilbo  (y los otros nombres)
    }
    // console.log(lol)
    let value = arr.reduce(function (accumulator, item, index, array) {
      // ...
      // console.log(accumulator, item, index, array)
      // console.log(audio)
    }, []);
  }, [dataProductAndCategory, searchFilter])

  useEffect(() => {
    getCatProductsWithProductClient({ variables: { max: 100, idStore: id } })
  }, [searchFilter, showMore])
  useEffect(() => {
    getOneStore({ variables: { idStore: id, StoreName: name } })
    getAllRatingStar({ variables: { idStore: id } })
    getMinPrice({ variables: { idStore: id } })

  }, [dataStartStore, data, dataMinPedido])
  const [stars, setStars] = useState(null)
  useEffect(() => {
    let suma = 0
    const avg = dataStartStore?.getAllRatingStar?.map((x, index) => (suma += x.rScore) / (index + 1))
    !!avg && setStars((avg[avg.length - 1])?.toFixed(1))
  }, [dataStartStore])
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
      }).catch(err => setAlertBox({ message: err }));
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
  }, [dataCatProducts, refs])
  const ArrayValues = refs.current.map(item => { return { value: item?.current } })
  const { data: dataOneFav } = useQuery(GET_ONE_FAV_STORE, {
    variables: {
      idStore: id
    }
  })
  const [rating, setRatingState] = useState(0);
  const [setFavorites, { loading: loadfav }] = useMutation(SET_FAVORITES_STORE)
  const [setRatingStar, { loading: loadStart }] = useMutation(SET_START_STORE)
  const RemoveFav = (idStore, fState) => {
    return setFavorites({
      variables: {
        data: {
          idStore,
          fState: fState,
        }
      },
      update: (cache, { data: { getOneFavorite } }) => updateCache({
        cache,
        query: GET_ONE_FAV_STORE,
        nameFun: 'getOneFavorite',
        dataNew: getOneFavorite
      })
    }).then(res => {
      setAlertBox({
        message: res?.data?.setFavorites?.message,
        color: !res?.data?.setFavorites?.success ? 'error' : 'success'
      })
    }).catch(e => setAlertBox({ message: e }))
  }
  /**
   * RATING
   */
  const [like, setLike] = useState(0);
  const [appearance, SetAppearance] = useState(0);
  const [rTasty, setTasty] = useState(0);
  const [rGoodTemperature, setGoodTemperature] = useState(0);
  const [rGoodCondition, setGoodCondition] = useState(0);
  useEffect(() => {
    SetAppearance(dataRating?.getOneRating?.rAppearance || 0)
    setTasty(dataRating?.getOneRating?.rTasty || 0)
    setGoodTemperature(dataRating?.getOneRating?.rGoodTemperature || 0)
    setGoodCondition(dataRating?.getOneRating?.rGoodCondition || 0)
  }, [dataRating])

  const handleRating = idStore => setRating({
    variables: {
      data: {
        idStore: idStore,
        rAppearance: appearance,
        rTasty,
        rGoodTemperature,
        rGoodCondition
      }
    }
  }).then(res => {
    setAlertBox({
      message: res?.data?.setRating?.message,
      color: !res?.data?.setRating?.success ? 'error' : 'success'
    })
  }).catch(e => setAlertBox({ message: e }))
  const addFav = idStore => setFavorites({
    variables: { data: { idStore: idStore } },
    update: (cache, { data: { getOneFavorite } }) => updateCache({
      cache,
      query: GET_ONE_FAV_STORE,
      nameFun: 'getOneFavorite',
      dataNew: getOneFavorite
    })
  })
    .then(res => {
      refetch({ idStore: idStore })
      setAlertBox({
        message: res?.data?.setFavorites?.message,
        color: !res?.data?.setFavorites?.success ? 'error' : 'success'
      })
    })
    .catch(e => setAlertBox({ message: e }))

  const handleGetRating = idStore => getOneRating({
    variables: {
      idStore
    }
  })
  const [share, setShare] = useState(false)
  const { pId } = dataOneProduct?.productFoodsOne || {}
  useEffect(() => {
    setShare(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`)
  }, [dataOneProduct, share])

  const handlerShare = index => {
    if (index === 1) {
      setShare(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`)
    }
    if (index === 2) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`),
        'facebook-share-dialog',
        'width=626,height=436')
    }
    if (index === 3) {
      window.open(`https://api.whatsapp.com/send?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}?phone=34123456789`)
    }
    if (index === 4) {
      window.open(`https://twitter.com/intent/tweet?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`)
    }
  }
  return (
    <div>
      <Head>
        <title>Delivery - {name?.toLocaleLowerCase()} - {locationName?.toLocaleLowerCase()} </title>
        <meta name="description" content={location.query.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RestaurantProfile
        dataForm={dataForm}
        setShare={setShare}
        share={share}
        setLike={setLike}
        handlerShare={handlerShare}
        dataMinPedido={numberFormat(dataMinPedido?.getMinPrice)}
        setRating={setRating}
        setRatingState={setRatingState}
        rating={rating}
        SetAppearance={SetAppearance}
        rTasty={rTasty}
        rGoodTemperature={rGoodTemperature}
        appearance={appearance}
        rGoodCondition={rGoodCondition}
        handleGetRating={handleGetRating}
        setTasty={setTasty}
        setGoodTemperature={setGoodTemperature}
        setGoodCondition={setGoodCondition}
        like={like}
        addFav={addFav}
        stars={stars}
        setRatingStar={setRatingStar}
        RemoveFav={RemoveFav}
        handleRating={handleRating}
        refs={refs}
        id={id}
        dataRating={dataRating?.getOneRating || {}}
        refInterSection={refInterSection}
        dataOneFav={dataOneFav?.getOneFavorite || {}}
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