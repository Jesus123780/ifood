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
import { CardCheckBox, CardInput, CardRadioLabel } from '../../components/Update/Products/styled'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Context } from '../../context/Context'
import useLocalStorage from '../../components/hooks/useLocalSorage'
import { Loading } from 'components/Loading'

export const Restaurant = () => {
    const [step] = useState(0)
  const { setAlertBox } = useContext(Context)

    const [modalConfirm, setModalConfirm] = useState(false)
    const router = useRouter()
    // eslint-disable-next-line
    const [_, setName] = useLocalStorage('restaurant', '');
    const [newRegisterStore, { loading }] = useMutation(CREATE_ONE_STORE, {
        onError: () => setAlertBox({ message: 'Lo sentimos ocurrió un error, vuelve a intentarlo' }),
        onCompleted: (data) => {
            setName(data?.newRegisterStore?.idStore || null)
            router.push('/restaurante/validacion-de-codigo')
        }
    })
    const [dataUser] = useUser()
    const [handleChange, handleSubmit, { dataForm, errorForm }] = useFormTools()
    console.log(dataForm)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return newRegisterStore({
                    variables: {
                        input: {
                            cId: values.countryId,
                            id: dataUser.id || '',
                            // dId: values.dId,
                            dId: values?.dId,
                            ctId: values?.ctId,
                            catStore: dataForm?.catStore,
                            // ctId: values.ctId,
                            neighborhoodStore: dataForm.storePhone,
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
                })
            },
            actionAfterSuccess: () => {
                // setDataValue({})
            }
        })
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

    console.log(values)
    return (
        <Content>
            {loading && <Loading /> }
            <AwesomeModal size={'small'} backdrop show={modalConfirm} onHide={() => setModalConfirm(false)} btnCancel={false} btnConfirm={false} footer={false} header={false} >
                <RippleButton widthButton='100%' margin='20px auto' onClick={() => setModalConfirm(false)} bgColor={EColor} >
                    cancelar
                </RippleButton>
                <RippleButton widthButton='100%' margin='20px auto' onClick={() => router.back()} bgColor={EColor}  >
                    Abandonar
                </RippleButton>
            </AwesomeModal>
            <Card></Card>
            <div className='container-step'>
                <StepsComponent titles={['', '', '', '']} current={nextStep} /* status='finish' status='error' status='wait' */ status='progress' />
                <Form onSubmit={e => handleForm(e, 1)}>
                    <GoBack onClick={() => validateRouter()}>
                        <IconArrowLeft color={`${PLColor}`} size='25px' />
                    </GoBack>
                    {nextStep === 0 ? (
                        <ContainerAnimation>
                            <div>
                                <InputHooks
                                    title='Nombre del dueño de la tienda.'
                                    width='100%'
                                    required
                                    error={errorForm?.storeOwner}
                                    value={dataForm?.storeOwner}
                                    onChange={handleChange}
                                    name='storeOwner'
                                />
                                <InputHooks
                                    title='Nombre de la tienda.'
                                    width='100%'
                                    required
                                    error={errorForm?.storeName}
                                    value={dataForm?.storeName}
                                    onChange={handleChange}
                                    name='storeName'
                                />
                                <InputHooks
                                    title='Correo.'
                                    width='100%'
                                    required
                                    error={errorForm?.email}
                                    value={dataUser?.email || ''}
                                    onChange={handleChange}
                                    disabled={true}
                                    name='email'
                                />
                                <InputHooks
                                    title='Celular.'
                                    width='100%'
                                    required
                                    error={errorForm?.uPhoNum}
                                    value={dataForm?.uPhoNum}
                                    onChange={handleChange}
                                    name='uPhoNum'
                                    numeric
                                />
                            </div>
                        </ContainerAnimation>
                    ) : nextStep === 1 ? (
                        <ContainerAnimationTow>
                            <React.Fragment>
                                <InputHooks title='Razon social'
                                    width='100%'
                                    required
                                    error={errorForm?.socialRaz}
                                    value={dataForm?.socialRaz}
                                    onChange={handleChange}
                                    name='socialRaz' />
                                <InputHooks
                                    title='Documento de identificacion'
                                    width='100%'
                                    required
                                    error={errorForm?.documentIdentifier}
                                    value={dataForm?.documentIdentifier}
                                    onChange={handleChange}
                                    name='documentIdentifier'
                                />
                                <InputHooks
                                    title='Nit de la tienda'
                                    width='100%'
                                    required
                                    error={errorForm?.NitStore}
                                    value={dataForm?.NitStore}
                                    onChange={handleChange}
                                    name='NitStore'
                                />
                                <NewSelect
                                    name='catStore'
                                    options={catStore}
                                    id='catStore'
                                    onChange={handleChange}
                                    error={errorForm?.catStore}
                                    optionName='cName'
                                    value={dataForm?.catStore}
                                    title='Categoria de la tienda'
                                    required />

                                <InputHooks
                                    title='Tipo de Regimen'
                                    width='100%'
                                    required
                                    error={errorForm?.typeRegiments}
                                    value={dataForm?.typeRegiments}
                                    onChange={handleChange}
                                    name='typeRegiments'
                                />
                                <InputHooks
                                    title='Tipo de Contribuyente'
                                    width='100%'
                                    required
                                    error={errorForm?.email}
                                    value={dataForm?.email}
                                    onChange={handleChange}
                                    name='email'
                                />
                                <InputHooks
                                    title='# Direccion de la tiendassssss'
                                    width='100%'
                                    required
                                    error={errorForm?.addressStore}
                                    value={dataForm?.addressStore}
                                    onChange={handleChange}
                                    name='addressStore'
                                    onBlur={handleBlur}
                                    onFocus={handleBlur}
                                />
                                <CardInput onChange={handleBlur}>
                                    <CardCheckBox style={{ flex: 'initial' }} name='gender' value="1" type="checkbox" id="checkboxF" />
                                    <CardRadioLabel htmlFor='checkboxF'>Agregar Ubicacion</CardRadioLabel>
                                </CardInput>
                                <WrapDirection showLocation={showLocation}>
                                    <NewSelect name='countryId' options={countries} id='cId' onChange={handleChangeSearch} error={errorForm?.countryId} optionName='cName' value={values?.countryId} title='País' />
                                    <NewSelect name='dId' options={departments} id='dId' onChange={handleChangeSearch} error={errorForm?.dId} optionName='dName' value={values?.dId} title='Departamento' />
                                    <NewSelect name='ctId' options={cities} id='ctId' onChange={handleChangeSearch} error={errorForm?.ctId} optionName='cName' value={values?.ctId} title='Ciudad' />
                                    <NewSelect name='rId' options={road} id='rId' onChange={handleChangeSearch} error={errorForm?.rId} optionName='rName' value={values?.rId} title='Tipo de via' />
                                    <InputHooks title='Barrio*' width='50%' required error={errorForm?.neighborhoodStore} value={dataForm?.neighborhoodStore} onChange={handleChange} name='neighborhoodStore' />
                                    <InputHooks title='Via principal*' width='50%' required error={errorForm?.Viaprincipal} value={dataForm?.Viaprincipal} onChange={handleChange} name='Viaprincipal' />
                                    <InputHooks title='Via secundaria*' width='50%' required error={errorForm?.secVia} value={dataForm?.secVia} onChange={handleChange} name='secVia' />
                                    <InputHooks title='Complemento*' width='50%' required error={errorForm?.ULocation} value={dataForm?.ULocation} onChange={handleChange} name='ULocation' />
                                </WrapDirection>
                            </React.Fragment>
                        </ContainerAnimationTow>
                    ) : nextStep === 2 ? (
                        <ContainerAnimationThree>
                            <React.Fragment>
                                <InputHooks
                                    title='Nombre del representante legal de la tienda'
                                    width='100%'
                                    required
                                    error={errorForm?.username}
                                    value={dataUser?.username}
                                    onChange={handleChange}
                                    name='username'
                                />
                                <InputHooks
                                    title='Nombre del representante legal de la tienda'
                                    width='100%'
                                    required
                                    error={errorForm?.emailStore}
                                    value={dataForm?.emailStore}
                                    onChange={handleChange}
                                    name='emailStore'
                                />
                                <InputHooks
                                    title='Numero de la  tienda'
                                    width='100%'
                                    required
                                    error={errorForm?.storePhone}
                                    value={dataForm?.storePhone}
                                    onChange={handleChange}
                                    name='storePhone'
                                />
                            </React.Fragment>
                        </ContainerAnimationThree>
                    ) : nextStep === 3 ? (
                        <ContainerAnimationFour>Cargando....</ContainerAnimationFour>
                    ) : null}

                    <RippleButton
                        widthButton='100%'
                        margin='20px auto'
                        type={nextStep === 3 ? 'submit' : 'button'}
                        onClick={() => setNextStep(nextStep + 1)}
                        bgColor={EColor}
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
    ${props =>
        props.active === 1
            ? css`
                  animation: ${AnimationRight} 200ms;
              `
            : css`
                  animation: ${AnimationRight} 200ms;
              `}
`
const ContainerAnimationTow = styled.div`
    ${props =>
        props.active === 2
            ? css`
                  animation: ${AnimationLeft} 200ms;
              `
            : css`
                  animation: ${AnimationLeft} 200ms;
              `}
`
const ContainerAnimationThree = styled.div`
    ${props =>
        props.active === 2
            ? css`
                  animation: ${AnimationLeft} 200ms;
              `
            : css`
                  animation: ${AnimationLeft} 200ms;
              `}
`
const ContainerAnimationFour = styled.div`
    ${props =>
        props.active === 4
            ? css`
                  animation: ${AnimationLeft} 200ms;
              `
            : css`
                  animation: ${AnimationLeft} 200ms;
              `}
`