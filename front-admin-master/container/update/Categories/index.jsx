import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { Categories } from '../../../components/Update/Categories'
import { useCategories } from '../../../components/hooks/useCategories';
import { UPDATE_CATEGORIES } from './queries';

export const CategoriesC = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    const [finalData] = useCategories()
  //  const { setAlertBox } = useContext(Context)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Estado para las estrellas del Categoría
    const [rating, setRating] = useState(0);
    const [updateCategoryProducts] = useMutation(UPDATE_CATEGORIES)

    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const cpImage = 'https://http2.mlstatic.com/D_NQ_NP_806765-MLC46669921180_072021-O.webp'
        const { cpName } = values
        try {
            updateCategoryProducts({
                variables: {
                    input: { cpName, cpImage }
                }, update(cache) {
                    cache.modify({
                        fields: {
                            CategoryProductsAll(dataOld = []) {
                                return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
                            }
                        }
                    })
                    setAlertBox({ message: `La Categoría ${ cpName } subido con éxito`, color: 'success', duration: 7000 })
                }
            }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${ error.message }`, duration: 7000 })
        }
    }
    const handleDelete = caId => {
        const value = finalData?.CategoryProductsAll?.filter(x => (x.caId === caId))
        const cpState = value[0]?.cpState
        updateCategoryProducts({
            variables: {
                input: {
                    caId,
                    cpState

                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        CategoryProductsAll(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `La categoría ${ value[0].cpName } ha sido eliminada`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${ err }`, duration: 7000 }))
    }
    // Filtrar product
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const [CategoryProductsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_CATEGORIES, { fetchPolicy: 'network-only', variables: { search } })
    const [dataCategories, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    useEffect(() => {
        dataProduct && setData([...dataProduct?.CategoryProductsAll])
    }
    , [dataProduct])
    useEffect(() => {
        CategoryProductsAll({ variables: { max: showMore } })
    }, [showMore])
    return (
        <Categories
            search={search}
            data={dataCategories}
            handleChange={handleChange}
            handleRegister={handleRegister}
            values={values}
            errors={errors}
            valuesForm={values}
            rating={rating}
            setRating={setRating}
            handleChangeFilter={handleChangeFilter}
            // Datos de filtro
            handleDelete={handleDelete}
            setShowMore={setShowMore}
            // Slider
            // Datos del areas

        />
    )
}