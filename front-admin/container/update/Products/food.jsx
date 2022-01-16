import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../../gql/Location';
import { GET_ALL_FOOD_PRODUCTS, GET_ONE_COLOR, UPDATE } from './queries';
import { GET_ALL_SIZE } from '../../../gql/information/Size/size';
import useLocalStorage from '../../../components/hooks/useLocalSorage';
import { useGetProducts } from '../../../components/hooks/useGetProducts';
import { GET_ALL_FEATURES_ON_PARENT } from '../../../components/Update/Products/FeaturesProduct/queries';
import { useGetAreas } from '../../../components/hooks/useGetArea';
import { useCategories } from '../../../components/hooks/useCategories';
import { useSetState } from '../../../components/hooks/useState';
import { FoodComponent } from '../../../components/Update/Products/food';
import { CREATE_FOOD_PRODUCT } from '../../dashboard/queries';
import { GET_ONE_STORE } from '../../Restaurant/queries';
import { convertBase64, getFileSizeByUnit } from '../../../utils';

export const Food = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const [features, setFeatures] = useState({})
    const { state, changeState } = useSetState(null)
    const [names, setName] = useLocalStorage('namefood', '');
    // Estado para las estrellas del producto
    const [rating, setRating] = useState(0);
    //  const { setAlertBox } = useContext(Context)
    // Filtrar product
    const [dataProducto, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    const [search, setSearch] = useState('')
    /* Filtro  */
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    const [filter, setFilter] = useState({ gender: [], desc: [], speciality: [] })
    //-----------QUERIES ------------
    const [updateProducts] = useMutation(UPDATE)
    const [finalData, { loading: getProductLoading }] = useGetProducts()
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
    // llama a los productos y espera una accion
    const [getFoodAllProduct, { data: dataProduct }] = useLazyQuery(GET_ALL_FOOD_PRODUCTS, {
        fetchPolicy: 'network-only',
        variables:
        {
            search,
            gender: searchFilter?.gender,
            desc: searchFilter?.desc,
            categories: searchFilter?.speciality,
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
        const value = datafatures?.features?.filter(x => (x.fId === fId))
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
    const [newRegisterFoodProduct] = useMutation(CREATE_FOOD_PRODUCT, {
        onCompleted: () => {
            console.log('object')
        }
    })
    // console.log(names)
    const [check, setCheck] = useState(false)
    const handleCheckEnvioGratis = e => {
        const { name, value, checked } = e.target
        setCheck(e.target.checked)
    }
    const { data: dataStore } = useQuery(GET_ONE_STORE)
    const fileInputRef = useRef(null)
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [{ alt, src }, setPreviewImg] = useState(initialState)
    const [imageBase64, setImageBase64] = useState(null)
    const onFileInputChange = async event => {
        const { files } = event.target;
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        const [size, { unit }] = await getFileSizeByUnit(file, "B");
        setImageBase64(base64)
        console.log(size, unit)
        setPreviewImg(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        );
    }
    const onTargetClick = e => {
        // e.preventDefault()
        fileInputRef.current.click()
    }
    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const ProStar = rating
        const { Width, Height, Cantidad, Destacado, IstFree } = values
        const { ProPrice, ProDescuento, ProDescription, ProWeight, ProHeight } = values
        const ProImage = 'https://http2.mlstatic.com/D_NQ_NP_621798-MLA45543191295_042021-W.webp'

        try {
            newRegisterFoodProduct({
                variables: {
                    input: {
                        idStore: dataStore?.getStore?.idStore || '',
                        ProPrice: parseFloat(ProPrice),
                        ProDescuento: parseFloat(ProDescuento),
                        ProDescription: ProDescription,
                        pName: names    ,
                        pState: 1,
                        sTateLogistic: 1,
                        ProStar: rating,
                        ProImage: ProImage,
                        ProHeight: ProHeight,
                        ProWeight: ProWeight,
                        ProOutstanding: check ? 1 : 0,
                        ProDelivery: check ? 1 : 0

                    }
                }, update(cache) {
                    cache.modify({
                        fields: {
                            getFoodAllProduct(dataOld = []) {
                                return cache.writeQuery({ query: GET_ALL_FOOD_PRODUCTS, data: dataOld })
                            }
                        }
                    })
                    // setAlertBox({ message: `El producto ${pName} subido con éxito`, color: 'success', duration: 7000 })
                }
            }).catch(err => console.log({ message: `${err}`, duration: 7000 }))
        }
        catch (error) {
            // setAlertBox({ message: `${error.message}`, duration: 7000 })
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
        !checked ? setFilter(s => ({ ...s, [name]: s[name].filter(f => f !== value) })) : setFilter({ ...filter, [name]: [...filter[name], value] })
        setSearchFilter({ ...filter })
    }

    useEffect(() => {
        dataProduct?.getFoodAllProduct && setData([...dataProduct?.getFoodAllProduct])
    }, [dataProduct, searchFilter])
    useEffect(() => {
        getFoodAllProduct({ variables: { max: showMore } })
    }, [searchFilter, showMore])
    const onChangeRange = () => {
        // const { value } = e.target
        // setFilterPrice(s => ({ ...s, [name]: s[name].filter(f => f !== value) }))
    }
    // ----------- HANDLE PARA ELIMINAR-----------
    const handleDelete = pId => {
        const value = finalData?.getFoodAllProduct?.filter(x => (x.pId === pId))
        const pState = value[0]?.pState
        updateProducts({
            variables: {
                input: {
                    pId,
                    pState
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        getFoodAllProduct(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_FOOD_PRODUCTS, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `El producto ${value[0].pName} ha sido eliminado`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
    }
    const des = values.ProDescuento
    const pri = values.ProPrice
    const impDesc = values.ProPricepDesc = (des * pri) / 100;
    const intPorcentaje = Math.round(impDesc);
    // Filtramos los productos con envio gratis
    const freeDelivery = dataProductFree => {
        return dataProductFree.ProDelivery === true
    }
    const productFree = dataProducto.filter(freeDelivery)
    return (
        <FoodComponent
            features={features}
            names={names}
            // capture image
            onFileInputChange={onFileInputChange}
            alt={alt}
            src={src}
            onTargetClick={onTargetClick}
            search={search}
            fileInputRef={fileInputRef}
            dataFree={productFree}
            dataCategories={finalDataCategories?.CategorygetFoodAllProduct}
            onClickSearch={onClickSearch}
            handleAddFeature={handleAddFeature}
            datafatures={datafatures?.features}
            data={dataProducto}
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
            color={data?.getAllColor}
            loading={loadCountries || loadRoad || getProductLoading}
            countries={dataCountries?.countries || []}
            road={dataRoad?.road || []}
            departments={dataDepartments?.departments || []}
            cities={dataCities?.cities || []}
            valuesForm={values}
            size={size?.getSizes}
            rating={rating}
            setRating={setRating}
            handleChange={handleChange}
            onChangeSearch={handleChangeSearch}
            handleChangeFilter={handleChangeFilter}
            setName={setName}
            // Datos de filtro
            handleDelete={handleDelete}
            setShowMore={setShowMore}
            // Datos del areas
            loadingAreas={loadingAreas}
            finalDataAreas={finalDataAreas?.getAreas}
            //   Filtro de check
            handleChangeClick={handleChangeClick}
            handleCheckEnvioGratis={handleCheckEnvioGratis}
            onChangeRange={onChangeRange}
            // Limpiar
            onClickClear={onClickClear}
            state={state}
            changeState={changeState}
            setLocalStorage={setLocalStorage}
            intPorcentaje={intPorcentaje}

        />
    )
}
Food.propTypes = {
    handleChangeClick: PropTypes.func,
    filterState: PropTypes.object,
    handleChange: PropTypes.func
}