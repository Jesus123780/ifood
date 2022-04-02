import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { ProvidersCreate } from './create'
import { GET_ALL_PROVIDERS } from './queries'
import Image from 'next/image';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Item, Container, ColProviders } from './styled'
import { Loading } from 'components/Loading'
import { Context } from 'context/Context'

export const Providers = () => {
    const HandleGetOne = () => { }
    const [{ fromDate, toDate }, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
    const { setAlertBox } = useContext(Context)
    const [more, setShowMore] = useState(100)
    const OPEN_MODAL = useSetState()
    const [dataProvider, setDataProvider] = useState([])

    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [getAllProviders, { data, fetchMore, loading }] = useLazyQuery(GET_ALL_PROVIDERS, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        nextFetchPolicy: 'cache-first',
        refetchWritePolicy: 'merge',
    })
    useEffect(() => {
        data?.getAllProviders && setDataProvider([...data?.getAllProviders])
        getAllProviders({
            variables: {
                // fromDate,
                // toDate,
            },
        })
    }, [dataProvider])
    return (
        <Container>
            <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
            <ProvidersCreate show={OPEN_MODAL.state} setShow={OPEN_MODAL.setState} />
            <form>
                <InputHooks width='30%' title='Desde' type='date' name='fromDate' value={fromDate} onChange={e => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })} />
                <InputHooks width='30%' title='Hasta' type='date' name='toDate' value={toDate} onChange={e => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })} />
                <InputHooks
                    title='Numero'
                    width='30%'
                    required
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
                <InputHooks
                    title='Nombre'
                    width='30%'
                    numeric
                    required
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
                <Button type='submit'>
                    Mas opciones
                </Button>
                <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
            </form>
            <ColProviders>
                <div>#</div>
                <div>Img</div>
                <div>Nombre</div>
                <div>PrAdres</div>
                <div>PrNumberPhone</div>
                <div>PrNit</div>
                <div>PrNumberIdentity</div>
                <div>TotalBysPr</div>
                <div>TotalDeuda</div>
            </ColProviders>
            {!loading && dataProvider?.length > 0 && dataProvider?.map((provider, i) => (
                <ColProviders key={provider.idProvider}>
                    <div>{i + 1}</div>
                    <div>
                        <Image
                            className='store_image'
                            objectFit='contain'
                            height={70}
                            width={70}
                            layout='responsive'
                            src={provider.prImage || '/images/202109081904_64O5_i.webp'}
                            alt={''}
                            blurDataURL="/images/DEFAULTBANNER.png"
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                    <div>{provider.prName}</div>
                    <div>{provider.PrAdres}</div>
                    <div>{provider.PrNumberPhone}</div>
                    <div>{provider.PrNit}</div>
                    <div>{provider.PrNumberIdentity}</div>
                    <div>{provider.TotalBysPr}</div>
                    <div>{provider.TotalDeuda}</div>
                    <div>{provider.prState === 1 ? 'Activo' : 'In activo'}</div>
                </ColProviders>
            ))}
            <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                setShowMore(s => s + 5)
                fetchMore({
                    variables: { max: more, min: 0 },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prevResult
                        return {
                            getAllProviders: [...fetchMoreResult.getAllProviders]

                        }
                    }
                })
            }}>{loading ? <Loading /> : 'CARGAR MÁS'}</RippleButton>
        </Container>
    )
}

// Conforta y elegancia
    // .
    // :
    // :
    // :
    // :
    // :
    // :
// #interiordesigner #interiordecor #interiorstyling #interiores #designdeinteriores #interiorinspo #arquiteturadeinteriores #interiordecorating #interiorinspiration #interiorismo #homeinterior #interiorstyle #designinterior #diseñodeinteriores #pazinterior #interiorarchitecture #interiorlovers #interiordesignideas #interiordetails #interiordecoration #interiorandhome #luxuryinteriors #interior_design #decoraciondeinteriores #cortinas #minipersianas #velos #papeltapiz #decoracion #barranquilla