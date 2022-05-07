import { useMutation, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Context } from '../../../../context/Context'
import { updateCache, validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { RippleButton } from '../../../Ripple'
import { CREATE_FEATURES, CREATE_TYPE_FEATURES, GET_ALL_FEATURES_ON_PARENT, GET_TYPE_FEATURES } from './queries'
import { Card, ContentList, TextList, Options } from './styled'
import { icons } from './codeCat'
import { SpinnerColorJust } from 'components/Loading'

export const FeaturesProducts = () => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const { setAlertBox } = useContext(Context)
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
          update: (cache, { data: { createUserSession } }) => {return updateCache({
            cache,
            query: GET_TYPE_FEATURES,
            nameFun: 'typeFeatures',
            dataNew: createUserSession
          })}
        }).catch(er => {return setAlertBox({ message: `${ er }`, duration: 7000 })})
      }
    } catch (error) {
      // eslint-disable-next-line
            setAlertBox({ message: `${error}`, duration: 5000 })
    }
  }
  // eslint-disable-next-line consistent-return
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
          update: (cache, { data: { create } }) => {return updateCache({
            cache,
            query: GET_ALL_FEATURES_ON_PARENT,
            nameFun: 'features',
            dataNew: create
          })}
        }).catch(er => {return setAlertBox({ message: `${ er }`, duration: 7000 })})
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
      <InputHooks
        errors={values?.thpName}
        name='thpName'
        onChange={handleChange}
        range={{ min: 0, max: 180 }}
        required
        title='Nombre Categoría'
        value={values?.thpName}
      />
      <InputHooks
        errors={values?.thpIcon}
        name='thpIcon'
        onChange={handleChange}
        range={{ min: 0, max: 1000 }}
        required
        title='Icono'
        value={values?.thpIcon}
      />
      {loadingUpdate || loading && <SpinnerColorJust />}
      <RippleButton
        onClick={handleRegister}
        type='submit'
        widthButton='100%'
      >Subir</RippleButton>
    </Card>
    <Card>
      <span>Lista categoría características</span>
      <div>
        {data ? data?.typeFeatures?.map(types => {return (<ContentList key={types.thpId}>
          <span>{types.thpName}</span>
        </ContentList>)}) : <span>No hay resultados</span>}
      </div>
    </Card>
    <Card>
      <NewSelect
        disabled={!data?.typeFeatures}
        id='thpId'
        margin='10px'
        name='thpId'
        onChange={handleChange}
        optionName='thpName'
        options={data?.typeFeatures?.filter(x => {return x?.thpName === x?.thpName}) || []}
        search
        title='Categoría Pregunta'
        value={values?.thpId || ''}
      />
      <InputHooks
        errors={values?.hpqrQuestion}
        name='hpqrQuestion'
        onChange={handleChange}
        required
        title='Opción respuesta'
        type='text'
        value={values?.hpqrQuestion}
      />
      {loadingUpdateFeature && <SpinnerColorJust />}
      <RippleButton
        onClick={handleRegisterFeatures}
        type='submit'
        widthButton='100%'
      >Subir Características</RippleButton>
    </Card>
    <Card>
      <div>
        {datafatures?.features?.map(x => {return (<ContentList key={x.fId}>
          {/* eslint-disable-next-line */}
                    <Options icon={icons.find(j => j.cCalCod == x.typeFeature?.thpIcon)?.icon} name={icons.find(j => j.cCalCod == x.typeFeature?.thpIcon)?.cCalCod}></Options>
          <TextList title={x.typeFeature.thpName}>{x?.hpqrQuestion}</TextList >
        </ContentList>)})}
      </div>
    </Card>

  </>)
}