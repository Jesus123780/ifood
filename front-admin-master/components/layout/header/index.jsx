import { PColor, BColor } from 'public/colors'
import { IconArrowLeft, IconLogo, IconLogout } from 'public/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActionContent, Button, ButtonGlobalCreate, ContainerHeader, CtnSwitch, SwitchOption } from './styled'
import { useRouter } from 'next/router';
import { URL_BASE } from '../../../apollo/urls';
import { useApolloClient } from '@apollo/client'
import { Context } from 'context/Context';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ONE_COUNTRY } from 'gql/Location';
import { GET_ALL_STORE_REPORT } from 'gql/Admin';
import NewSelect from 'components/NewSelectHooks/NewSelect';

export const Header = () => {
    const Router = useRouter();
    const { client } = useApolloClient()
    const { useUseLocation, Location } = useContext(Context)
    const onClickLogout = useCallback(async () => {
        localStorage.removeItem('location.data')
        await window
            .fetch(`${URL_BASE}auth/logout/`, {})
            .then(res => {
                if (res) {
                    client?.clearStore()
                    Router.replace('/')
                }
            })
            .catch(() => {
                console.log({
                    message: 'Se ha producido un error.',
                    duration: 30000,
                    color: 'error'
                })
            })
    }, [client])
    const [values, setValues] = useState({})
    const { data: dataStoreReport } = useQuery(GET_ALL_STORE_REPORT, {
        context: { clientName: "admin-store" }

    })
    console.log("🚀 ~ file: index.jsx ~ line 38 ~ Header ~ dataStoreReport", dataStoreReport)
    const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
    const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
    const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
    const [getOneCountry, { data: dataOneCountry }] = useLazyQuery(GET_ONE_COUNTRY)
    const handleChangeLocation = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleChangeSearch = e => {
        if (show === true) {
            if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
            else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
            handleChangeLocation(e)
        }
    }
    const [show, setShow] = useState(false)
    const departments = dataDepartments?.departments || []
    const countries = dataCountries?.countries || []
    const cities = dataCities?.cities || []
    useEffect(() => {
        if (show === true) {
            getOneCountry({ variables: { cId: values?.countryId || Location.countryId } })
            useUseLocation(values?.countryId, values.dId, values.ctId)
        }
    }, [values, dataOneCountry, countries])
    const { cName } = dataOneCountry?.getOneCountry || {}
    return (
        <header>
            <ContainerHeader>
                <Button onClick={() => Router.back()}>
                    <IconArrowLeft color={BColor} size='30px' />
                    Volver
                </Button>
                <ButtonGlobalCreate onClick={() => setShow(!show)}>
                    Filtro por {cName}
                </ButtonGlobalCreate>
                <CtnSwitch>
                    {!!dataCountries && <SwitchOption show={show}>
                        {show && <>
                            <NewSelect width='100%' name='countryId' options={countries} id='cId' onChange={handleChangeSearch} optionName={['cCalCod', 'cName']} value={values?.countryId || Location.countryId} />
                            <NewSelect width='100%' name='dId' options={departments} id='dId' onChange={handleChangeSearch} optionName='dName' value={values?.dId || Location.department} />
                            <NewSelect width='100%' name='ctId' options={cities} id='ctId' onChange={handleChangeSearch} optionName='cName' value={values?.ctId || Location.city} />
                        </>}
                    </SwitchOption>}
                </CtnSwitch>
                <ActionContent style={{ margin: '10px', fontSize: '20px' }}>{dataStoreReport?.getAllStoreAdminReport?.count || 0}</ActionContent>
                <IconLogo color={PColor} size="50px" />
                <ActionContent></ActionContent>
                <ActionContent>
                    <Button onClick={() => onClickLogout()}>
                        <IconLogout color={PColor} size="20px" />
                    </Button>
                </ActionContent>
            </ContainerHeader>
        </header>
    )
}
