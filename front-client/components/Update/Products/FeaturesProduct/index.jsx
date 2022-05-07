import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Context } from '../../../../Context'
import { updateCache, validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { RippleButton } from '../../../Ripple'
import { CREATE_FEATURES, CREATE_TYPE_FEATURES, GET_ALL_FEATURES_ON_PARENT, GET_TYPE_FEATURES } from './queries'
import { Card, ContentList, TextList, Options } from './styled'
import { icons } from './codeCat'

export const FeaturesProducts = () => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [createFeatureType, { loading: loadingUpdate }] = useMutation(CREATE_TYPE_FEATURES)
    const [createFeature, { loading: loadingUpdateFeature }] = useMutation(CREATE_FEATURES)
    const { data, loading, error: err } = useQuery(GET_TYPE_FEATURES)
    const { data: datafatures } = useQuery(GET_ALL_FEATURES_ON_PARENT)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // eslint-disable-next-line
    const handleRegister = async e => {
        e.preventDefault()
        // Declarando variables
        let errorSubmit = false
        for (const x in errors) {
            if (errors[x]) errorSubmit = true
        }
        // Validando todos los campos que no sean nulos
        const errorForm = validationSubmitHooks(e.target.elements)
        for (const x in errorForm) {
            if (errorForm[x]) errorSubmit = true
        }
        setErrors({ ...errorForm })
        if (!values.thpName || errorSubmit || !values.thpIcon) {
            return setAlertBox({ message: 'Por favor, verifique que los Campos estén correctos.', duration: 5000 })
        }
        try {
            const thpId = ''
            if (!errorSubmit) {
                createFeatureType({
                    variables: { input: { thpName: values.thpName, thpIcon: values.thpIcon, thpId } },
                    update: (cache, { data: { createUserSession } }) => updateCache({
                        cache,
                        query: GET_TYPE_FEATURES,
                        nameFun: 'typeFeatures',
                        dataNew: createUserSession
                    })
                }).catch(er => setAlertBox({ message: `${ er }`, duration: 7000 }))
            }
        } catch (error) {
            // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 5000 })
        }
    }
    const handleRegisterFeatures = async e => {
        e.preventDefault()
        // Declarando variables
        let errorSubmit = false
        for (const x in errors) {
            if (errors[x]) errorSubmit = true
        }
        // Validando todos los campos que no sean nulos
        const errorForm = validationSubmitHooks(e.target.elements)
        for (const x in errorForm) {
            if (errorForm[x]) errorSubmit = true
        }
        setErrors({ ...errorForm })
        if (!values.thpId || errorSubmit) {
            return setAlertBox({ message: 'Por favor, verifique que los Campos estén correctos.', duration: 5000 })
        }
        // const { thpId, hpqrQuestion } = values
        try {
            if (!errorSubmit) {
                createFeature({
                    variables: { input: { hpqrQuestion: values.hpqrQuestion, thpId: values.thpId } },
                    update: (cache, { data: { create } }) => updateCache({
                        cache,
                        query: GET_ALL_FEATURES_ON_PARENT,
                        nameFun: 'features',
                        dataNew: create
                    })
                }).catch(er => setAlertBox({ message: `${ er }`, duration: 7000 }))
            }
        } catch (error) {
            // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 5000 })
        }
    }
    return (<>
        {err && <span>Ocurrió un error</span>}
        <Card>
            <span>Categoría Características</span>
            <InputHooks name="thpName"
                value={values?.thpName}
                errors={values?.thpName}
                onChange={handleChange}
                title="Nombre Categoría"
                required
                range={{ min: 0, max: 180 }}
            />
            <InputHooks name="thpIcon"
                value={values?.thpIcon}
                errors={values?.thpIcon}
                onChange={handleChange}
                title="Icono"
                required
                range={{ min: 0, max: 1000 }}
            />
            {loadingUpdate || loading && <SpinnerColorJust />}
            <RippleButton widthButton='100%' type="submit" onClick={handleRegister}>Subir</RippleButton>
        </Card>
        <Card>
            <span>Lista categoría características</span>
            <div>
                {data ? data?.typeFeatures?.map(types => (<ContentList key={types.thpId}>
                    <span>{types.thpName}</span>
                </ContentList>)) : <span>No hay resultados</span>}
            </div>
        </Card>
        <Card>
            <NewSelect search disabled={!data?.typeFeatures} options={data?.typeFeatures?.filter(x => x?.thpName === x?.thpName) || []} id='thpId' name='thpId' value={values?.thpId || ''} optionName='thpName' title='Categoría Pregunta' onChange={handleChange} margin='10px' />
            <InputHooks
                title='Opción respuesta'
                required
                type="text"
                errors={values?.hpqrQuestion}
                value={values?.hpqrQuestion}
                onChange={handleChange}
                name='hpqrQuestion'
            />
            {loadingUpdateFeature && <SpinnerColorJust />}
            <RippleButton widthButton='100%' type="submit" onClick={handleRegisterFeatures}>Subir Características</RippleButton>
        </Card>
        <Card>
            <div>
                {datafatures?.features?.map(x => (<ContentList key={x.fId}>
                    {/* eslint-disable-next-line */}
                    <Options icon={icons.find(j => j.cCalCod == x.typeFeature?.thpIcon)?.icon} name={icons.find(j => j.cCalCod == x.typeFeature?.thpIcon)?.cCalCod}></Options>
                    <TextList title={x.typeFeature.thpName}>{x?.hpqrQuestion}</TextList >
                </ContentList>))}
            </div>
        </Card>

    </>)
}