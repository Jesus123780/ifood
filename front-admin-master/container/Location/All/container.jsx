import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_CITIES, GET_ALL_ROAD } from 'gql/Location'
import React, { useState } from 'react'
import { Location as LocationContainer } from './index'
export const Location = () => {
    // Herramientas de formulario
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const handleChangeSearch = e => {
        if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
        else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
        handleChange(e)
    }
    return (
        <LocationContainer
            loading={loadCountries || loadRoad }
            countries={dataCountries?.countries || []}
            road={dataRoad?.road || []}
            departments={dataDepartments?.departments || []}
            cities={dataCities?.cities || []}
            valuesForm={values}
            errorForm={errors}
            handleChange={handleChange}
            onChangeSearch={handleChangeSearch}
        />
    )
}

LocationContainer.propTypes = {
}