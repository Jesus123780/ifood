import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { BGColor, PColor, PLColor, SFColor } from 'public/colors'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { numberFormat } from 'utils'
import { GET_ALL_SALES, GET_ONE_SALES } from './queries'
import moment from 'moment'
import { GetOneSales } from './getOneSales'

export const ListVentas = () => {
    let total = 0
    let suma = 0
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
    const onChangeInput = (e) => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })
    const [more, setMore] = useState(100)
    const [getAllSalesStore, { data, fetchMore, loading }] = useLazyQuery(GET_ALL_SALES)
    const [getOneSalesStore, { data: dataOneSales, loading: loa }] = useLazyQuery(GET_ONE_SALES)
    const [totalProductPrice, setTotalProductPrice] = useState(0)
    useEffect(() => {
        getAllSalesStore({ variables: { min: 0 } })
        data?.getAllSalesStore.forEach((a) => {
            const { totalProductsPrice } = a || {}
            suma += totalProductsPrice
            setTotalProductPrice(suma)
        })
    }, [totalProductPrice, suma, total, data])
    const [open, setOpen] = useState(false)
    const HandleGetOne = (pCodeRef) => {
        getOneSalesStore({ variables: { pCodeRef: pCodeRef } })
        setOpen(!open)
    }
    const getFromDataToData = async e => {
        getAllSalesStore({ variables: { fromDate: valuesDates?.fromDate, toDate: valuesDates?.toDate } })
    }
    return (
        <div>
            <GetOneSales setOpen={setOpen} open={open} data={dataOneSales?.getOneSalesStore || []} />
            <Card>
                <form>
                    <InputHooks
                        title='Desde'
                        width={'20%'}
                        required
                        // error={errorForm?.Desde}
                        value={valuesDates?.fromDate}
                        onChange={onChangeInput}
                        name='fromDate'
                        type='date'
                    />
                    <InputHooks
                        title='Hasta'
                        width='20%'
                        required
                        type='date'
                        value={valuesDates?.toDate}
                        onChange={onChangeInput}
                        name='toDate'
                    />
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
                    <RippleButton padding='10px' margin='30px' type='button' onClick={() => getFromDataToData()}>Consultar</RippleButton>
                    <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
                </form>
            </Card>
            <Table
                titles={[
                    { name: 'Numero', justify: 'flex-center', width: '.5fr' },
                    { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Date', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={data?.getAllSalesStore || []}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> {i + 1}</span>
                    </Item>
                    <Item>
                        <span> Restaurante</span>
                    </Item>
                    <Item>
                        <span> {x.pCodeRef}</span>
                    </Item>
                    <Item>
                        <span> {moment(x.pDatCre).format('DD-MM-YYYY')} - {moment(x.pDatCre).format('HH:mm A')}</span>
                    </Item>
                    <Item>
                        <span> DELIVERY-APP </span>
                    </Item>
                    <Item>
                        <span> {x.payMethodPState ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(x.totalProductsPrice)}</span>
                    </Item>

                    <Item>
                        <Button onClick={() => HandleGetOne(x.pCodeRef)}>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
            <Action>
                <RippleButton padding='10px' margin='30px 0' onClick={() => {
                    setMore(more + 100)
                    fetchMore({
                        variables: { max: more, min: 0 },
                        updateQuery: (prevResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prevResult
                            return {
                                getAllSalesStore: [...fetchMoreResult.getAllSalesStore]

                            }
                        }
                    })
                }}>{loading ? '...Cargando' : 'Cargar Mas'}</RippleButton>
            </Action>
            <CardInfo>
                <div className="wrapper-card-info">
                    <div className="item">
                        <span>Total de ventas realizadas </span>
                        <h3>$ {numberFormat(totalProductPrice)}</h3>
                        <Button>Ver mas information</Button>
                    </div>
                    <div className="wrapper-acquisition__card">
                        <div>
                            <span>Por Delivery </span>
                            <h3>$ {numberFormat(300000)}</h3>

                        </div>
                        <div>
                            <span>Por Restaurante </span>
                            <h3>$ {numberFormat(300000)}</h3>
                        </div>
                    </div>

                </div>
                <div className="wrapper-card-info">
                    <span>Total de ventas realizadas </span>
                    <h3>$ {numberFormat(totalProductPrice)}</h3>
                    <Button>Ver mas information</Button>
                </div>
            </CardInfo>
        </div>
    )
}

const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
const Action = styled.div`
    display: flex;
    justify-content: space-between;
    
    `
const CardInfo = styled.div`
    display: grid;
    grid-template-columns: 50% repeat(auto-fill, 50%);
    gap: 10px;
    padding: 40px 0;
    place-content: space-between;
    .wrapper-card-info {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        height: auto;
        span {
            color: ${PLColor};
            font-family: PFont-Light;
        }
        h3 {
            font-family: PFont-Light;
            font-size: 30px;
            color: ${SFColor};

        }
        font-family:  PFont-Light;
        .item {
            padding: 20px;
            border-bottom: 1px solid #ccc;
        }
        .wrapper-acquisition__card {
            padding: 20px;
            display: grid;
            grid-template-columns: 50% repeat(auto-fill, 50%);
        }
    }

`
const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    & form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

    }
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    /* background-color: ${BGColor}; */
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`