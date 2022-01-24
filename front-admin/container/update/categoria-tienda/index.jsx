import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { useGetProducts } from '../../../components/hooks/useGetProducts';
import { CategoriesStoreComponent } from '../../../components/Update/CategoriesStore';
import { CREATE_CAT_STORE, GET_ALL_CAT_STORE, SET_DES_CAT } from '../../../gql/catStore';
import moment from 'moment';

export const CategoriesStore = ({ setAlertBox }) => {
    // ------------ ESTADOS ------------
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    //-----------QUERIES ------------
    const [registerCategoryStore] = useMutation(CREATE_CAT_STORE)
    const { data, loading, error } = useQuery(GET_ALL_CAT_STORE)
    const [desCategoryStore] = useMutation(SET_DES_CAT)

    // ------------ HANDLES ------------
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const { csDescription, cName } = values
        try {
            registerCategoryStore({
                variables: {
                    input: {
                        cState: 1,
                        cName: cName,
                        csDescription: csDescription
                    }
                }, update(cache) {
                    cache.modify({
                        fields: {
                            getAllCatStore(dataOld = []) {
                                return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
                            }
                        }
                    })
                    setAlertBox({ message: 'subido con éxito', color: 'success', duration: 7000 })
                }
            }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${error.message}`, duration: 7000 })
        }
    }
    const handleDelete = pId => {
        const value = finalData?.getAllCatStore?.filter(x => (x.pId === pId))
        const pState = value[0]?.pState
        registerCategoryStore({
            variables: {
                input: {
                    pId,
                    pState
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        getAllCatStore(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `El producto ${value[0].pName} ha sido eliminado`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
    }
    const handleToggle = (e, catStore) => {
        const { checked } = e.target
        desCategoryStore({
            variables: { catStore: catStore, cState: checked ? 0 : 1, /* aDateConf: moment().valueOf() */ }, update(cache) {
                cache.modify({
                    fields: {
                        getAllCatStore(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
                        }
                    }
                })
            }
        }).catch(err => console.log(err))
    }
    return (
        <CategoriesStoreComponent
            handleChange={handleChange}
            handleRegister={handleRegister}
            handleToggle={handleToggle}
            values={values}
            errors={errors}
            handleDelete={handleDelete}
            data={data?.getAllCatStore || []}
        />
    )
}
CategoriesStore.propTypes = {
    handleChangeClick: PropTypes.func,
    filterState: PropTypes.object,
    handleChange: PropTypes.func
}