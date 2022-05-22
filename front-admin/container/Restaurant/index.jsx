import React, { useContext, useState } from 'react'
import { RippleButton } from '../../components/Ripple'
import { EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { IconArrowLeft } from '../../public/icons'
import { useRouter } from 'next/router'
import { Content, Form, Card, GoBack, WrapDirection } from './styled'
import { CREATE_ONE_STORE } from './queries'
import { StepsComponent } from '../../components/Steps'
import styled, { css, keyframes } from 'styled-components'
import NewSelect from '../../components/NewSelectHooks/NewSelect'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../gql/Location'
import { useUser } from '../../components/hooks/useUser'
import { GET_ALL_CAT_STORE } from '../../gql/catStore'
import { CardInput } from '../../components/Update/Products/styled'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Context } from '../../context/Context'
import useLocalStorage from '../../components/hooks/useLocalSorage'
import { Loading } from 'components/Loading'
import { Checkbox } from 'components/Checkbox'

export const Restaurant = () => {
  const [step] = useState(0)
  const { setAlertBox } = useContext(Context)
  const [modalConfirm, setModalConfirm] = useState(false)

  const router = useRouter()
  // eslint-disable-next-line
  const [_, setName] = useLocalStorage('restaurant', '');
  const [newRegisterStore, { loading }] = useMutation(CREATE_ONE_STORE, {
    onError: () => { return setAlertBox({ message: 'Lo sentimos ocurrió un error, vuelve a intentarlo' }) },
    onCompleted: (data) => {
      setName(data?.newRegisterStore?.idStore || null)
      router.push('/restaurante/validacion-de-codigo')
    }
  })
  const [dataUser] = useUser()
  // eslint-disable-next-line
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        return newRegisterStore({
          variables: {
            input: {
              cId: values.countryId,
              id: dataUser.id || '',
              dId: values?.dId,
              ctId: values?.ctId,
              catStore: dataForm?.catStore,
              neighborhoodStore: dataForm?.storePhone,
              Viaprincipal: dataForm.storePhone,
              storeOwner: dataForm.storeOwner,
              storeName: dataForm.storeName,
              emailStore: dataForm.storeName || dataUser.email,
              storePhone: dataForm.storePhone,
              socialRaz: dataForm.socialRaz,
              Image: null,
              banner: dataForm.storePhone,
              documentIdentifier: dataForm.documentIdentifier,
              uPhoNum: dataForm.uPhoNum,
              ULocation: dataForm.ULocation,
              upLat: '',
              upLon: '',
              siteWeb: dataForm.storePhone,
              description: dataForm.storePhone,
              NitStore: dataForm.storePhone,
              typeRegiments: dataForm.storePhone,
              typeContribute: dataForm.storePhone,
              addressStore: dataForm.storePhone,
              createAt: dataForm.storePhone
            }
          }
        }).then(() => {
          setAlertBox({ message: '' })
        }).catch(() => {
          setAlertBox({ message: 'Lo sentimos ocurrió un error, vuelve a intentarlo' })
        })
      }
      // actionAfterSuccess: () => {
      //   // setDataValue({})
      // }
    })
  }
  const [nextStep, setNextStep] = useState(0)
  // Herramientas de formulario
  const { data: dataCountries } = useQuery(GET_ALL_COUNTRIES)
  const { data: dataRoad } = useQuery(GET_ALL_ROAD)
  const { data: dataCatStore } = useQuery(GET_ALL_CAT_STORE)
  const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
  const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const handleChangeLocation = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const handleChangeSearch = e => {
    if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
    else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
    handleChangeLocation(e)
  }
  const departments = dataDepartments?.departments || []
  const countries = dataCountries?.countries || []
  const road = dataRoad?.road || []
  const cities = dataCities?.cities || []
  const catStore = dataCatStore?.getAllCatStore || []
  const [showLocation, setShowLocation] = useState(false)
  const handleBlur = e => {
    const { checked } = e.target
    setShowLocation(checked ? true : false)
  }
  const validateRouter = () => {
    if (nextStep >= 1) {
      setNextStep(nextStep - 1)
    } else {
      setModalConfirm(true)
    }
  }

  return (
    <Content>
      {loading && <Loading />}
      <AwesomeModal
        backdrop
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        onHide={() => { return setModalConfirm(false) }}
        show={modalConfirm}
        size={'small'}
      >
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => { return setModalConfirm(false) }}
          widthButton='100%'
        >
          cancelar
        </RippleButton>
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => { return router.back() }}
          widthButton='100%'
        >
          Abandonar
        </RippleButton>
      </AwesomeModal>
      <Card></Card>
      <div className='container-step'>
        <StepsComponent
          current={nextStep}
          status='progress'
          titles={['Dato inicial', '2', '3', '4']}
        />
        <Form onSubmit={e => { return handleForm(e, 1) }}>
          <GoBack onClick={() => { return validateRouter() }}>
            <IconArrowLeft color={`${PLColor}`} size='25px' />
          </GoBack>
          {nextStep === 0 ? (
            <ContainerAnimation>
              <div>
                <InputHooks
                  error={errorForm?.storeOwner}
                  name='storeOwner'
                  onChange={handleChange}
                  required
                  title='Nombre del dueño de la tienda.'
                  value={dataForm?.storeOwner}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.storeName}
                  name='storeName'
                  onChange={handleChange}
                  required
                  title='Nombre de la tienda.'
                  value={dataForm?.storeName}
                  width='100%'
                />
                <InputHooks
                  disabled={true}
                  error={errorForm?.email}
                  name='email'
                  onChange={handleChange}
                  required
                  title='Correo.'
                  value={dataUser?.email || ''}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.uPhoNum}
                  name='uPhoNum'
                  numeric
                  onChange={handleChange}
                  required
                  title='Celular.'
                  value={dataForm?.uPhoNum}
                  width='100%'
                />
              </div>
            </ContainerAnimation>
          ) : nextStep === 1 ? (
            <ContainerAnimationTow>
              <React.Fragment>
                <InputHooks
                  error={errorForm?.socialRaz}
                  name='socialRaz'
                  onChange={handleChange}
                  required
                  title='Razon social'
                  value={dataForm?.socialRaz}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.documentIdentifier}
                  name='documentIdentifier'
                  onChange={handleChange}
                  required
                  title='Documento de identificacion'
                  value={dataForm?.documentIdentifier}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.NitStore}
                  name='NitStore'
                  nit={true}
                  onChange={handleChange}
                  required
                  title='Nit de la tienda'
                  value={dataForm?.NitStore}
                  width='100%'
                />
                <NewSelect
                  error={errorForm?.catStore}
                  id='catStore'
                  name='catStore'
                  onChange={handleChange}
                  optionName='cName'
                  options={catStore}
                  required
                  title='Categoria de la tienda'
                  value={dataForm?.catStore}
                />

                <InputHooks
                  error={errorForm?.typeRegiments}
                  name='typeRegiments'
                  onChange={handleChange}
                  required
                  title='Tipo de Regimen'
                  value={dataForm?.typeRegiments}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.email}
                  name='email'
                  onChange={handleChange}
                  required
                  title='Tipo de Contribuyente'
                  value={dataForm?.email}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.addressStore}
                  name='addressStore'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleBlur}
                  required
                  title='# Dirección de la tiendas'
                  value={dataForm?.addressStore}
                  width='100%'
                />
                <CardInput onChange={handleBlur}>
                  <Checkbox
                    checked={showLocation}
                    id='checkboxF'
                    label='Agregar Ubicación'
                    value={showLocation}
                  />
                </CardInput>
                <WrapDirection showLocation={showLocation}>
                  <NewSelect
                    error={errorForm?.countryId}
                    id='cId'
                    name='countryId'
                    onChange={handleChangeSearch}
                    optionName='cName'
                    options={countries}
                    title='País'
                    value={values?.countryId}
                  />
                  <NewSelect
                    error={errorForm?.dId}
                    id='dId'
                    name='dId'
                    onChange={handleChangeSearch}
                    optionName='dName'
                    options={departments}
                    title='Departamento'
                    value={values?.dId}
                  />
                  <NewSelect
                    error={errorForm?.ctId}
                    id='ctId'
                    name='ctId'
                    onChange={handleChangeSearch}
                    optionName='cName'
                    options={cities}
                    title='Ciudad'
                    value={values?.ctId}
                  />
                  <NewSelect
                    error={errorForm?.rId}
                    id='rId'
                    name='rId'
                    onChange={handleChangeSearch}
                    optionName='rName'
                    options={road}
                    title='Tipo de via'
                    value={values?.rId}
                  />
                  <InputHooks
                    error={errorForm?.neighborhoodStore}
                    name='neighborhoodStore'
                    onChange={handleChange}
                    required
                    title='Barrio*'
                    value={dataForm?.neighborhoodStore}
                    width='50%'
                  />
                  <InputHooks
                    error={errorForm?.Viaprincipal}
                    name='Viaprincipal'
                    onChange={handleChange}
                    required
                    title='Via principal*'
                    value={dataForm?.Viaprincipal}
                    width='50%'
                  />
                  <InputHooks
                    error={errorForm?.secVia}
                    name='secVia'
                    onChange={handleChange}
                    required
                    title='Via secundaria*'
                    value={dataForm?.secVia}
                    width='50%'
                  />
                  <InputHooks
                    error={errorForm?.ULocation}
                    name='ULocation'
                    onChange={handleChange}
                    required
                    title='Complemento*'
                    value={dataForm?.ULocation}
                    width='50%'
                  />
                </WrapDirection>
              </React.Fragment>
            </ContainerAnimationTow>
          ) : nextStep === 2 ? (
            <ContainerAnimationThree>
              <React.Fragment>
                <InputHooks
                  error={errorForm?.username}
                  name='username'
                  onChange={handleChange}
                  required
                  title='Nombre del representante legal de la tienda'
                  value={dataUser?.username}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.emailStore}
                  name='emailStore'
                  onChange={handleChange}
                  required
                  title='Nombre del representante legal de la tienda'
                  value={dataForm?.emailStore}
                  width='100%'
                />
                <InputHooks
                  error={errorForm?.storePhone}
                  name='storePhone'
                  onChange={handleChange}
                  required
                  title='Numero de la  tienda'
                  value={dataForm?.storePhone}
                  width='100%'
                />
              </React.Fragment>
            </ContainerAnimationThree>
          ) : nextStep === 3 ? (
            <ContainerAnimationFour>Cargando....</ContainerAnimationFour>
          ) : null}

          <RippleButton
            bgColor={EColor}
            margin='20px auto'
            onClick={() => { return setNextStep(nextStep + 1) }}
            type={nextStep === 3 ? 'submit' : 'button'}
            widthButton='100%'
          >
            {step !== 1 ? 'Continuar' : 'Enviar'}
          </RippleButton>
        </Form>
      </div>
    </Content>
  )
}

export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const AnimationLeft = keyframes`
0% {
    transform: translateX(-50vw);
    opacity: 0;
}

100% {
    transform: translateY(0);
    opacity: 1;
}
`
const ContainerAnimation = styled.div`
    ${props => {
    return props.active === 1
      ? css`
                  animation: ${AnimationRight} 200ms;
              `
      : css`
                  animation: ${AnimationRight} 200ms;
              `}}
`
const ContainerAnimationTow = styled.div`
    ${props => {
    return props.active === 2
      ? css`
                  animation: ${AnimationLeft} 200ms;
              `
      : css`
                  animation: ${AnimationLeft} 200ms;
              `}}
`
const ContainerAnimationThree = styled.div`
    ${props => {
    return props.active === 2
      ? css`
                  animation: ${AnimationLeft} 200ms;
              `
      : css`
                  animation: ${AnimationLeft} 200ms;
              `}}
`
const ContainerAnimationFour = styled.div`
    ${props => {
    return props.active === 4
      ? css`
                  animation: ${AnimationLeft} 200ms;
              `
      : css`
                  animation: ${AnimationLeft} 200ms;
              `}}
`