import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BGColor, PColor, PLColor, SFColor } from 'public/colors'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { numberFormat } from 'utils'
import { GET_ALL_SALES, GET_ONE_SALES } from './queries'
import moment from 'moment'
import { GetOneSales } from './getOneSales'
import { BarChat, Circle, DoughnutChar, HorizontalBarChart } from 'components/Chart'
moment.locale('es')
export const ListVentas = () => {
    let total = 0
    let suma = 0
    const [handleChange, { dataForm, errorForm }] = useFormTools()
    const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
    const onChangeInput = (e) => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })
    const [more, setMore] = useState(100)
    const [getAllSalesStore, { data, fetchMore, loading }] = useLazyQuery(GET_ALL_SALES)
    const [getOneSalesStore, { data: dataOneSales }] = useLazyQuery(GET_ONE_SALES)
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
    const getFromDataToData = async () => {
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
            <ChatStatistic />
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

export const ChatStatistic = () => {
    // Construcción del nuevo array:
    const { data } = useQuery(GET_ALL_SALES)
    // const array = filterKeyObject(data?.getAllSalesStore, ['__typename'])
    // console.log(array)
    var resultado = [];
    data?.getAllSalesStore?.length > 0 && data?.getAllSalesStore.reduce(function (res, value) {
        // Creamos la posición del array para cada mes
        let mes = new Date(value.pDatCre).getMonth();
        if (!res[mes]) {
            res[mes] = { Mes: mes };
            // Inicializamos a 0 el valor de cada key
            Object.keys(value).forEach(function (key) {
                if (key != 'pDatCre') {
                    res[mes][key] = 0;
                }
            })

            resultado.push(res[mes])
        }
        // Sumamos el valor de cada clave dentro de un bucle
        Object.keys(value).forEach(function (key) {
            if (key != 'pDatCre') {
                res[mes]['totalProductsPrice'] += value['totalProductsPrice'];
            }
        })
        return res;
    }, {});

    // Resultado:
    console.log(moment()._locale._abbr)
    const dataChat = {
        labels: resultado.map(x => x.Mes === 0 ? 'Enero' : x.Mes === 1 ? 'Febrero' : x.Mes === 2 ? 'Marzo' : x.Mes === 3 ? 'Abril' : x.Mes === 4 ? 'Mayo' : x.Mes === 5 ? 'Junio' : x.Mes === 6 ? 'Julio' : x.Mes === 7 ? 'Agosto' : x.Mes === 8 ? 'Septiembre' : x.Mes === 9 ? 'Octubre' : x.Mes === 10 ? 'Noviembre' : 'Diciembre'),
        // labels: moment()._locale._months,
        datasets: [
            {

                label: 'Ventas',
                data: resultado.map(x => x.totalProductsPrice),
                // data: resultado.map(x => x.Mes === 0 ? x.totalProductsPrice : x.Mes === 1 ? x.totalProductsPrice : x.Mes === 2 ? x.totalProductsPrice : x.Mes === 3 ? x.totalProductsPrice : x.Mes === 4 ? x.totalProductsPrice : x.Mes === 5 ? x.totalProductsPrice : x.Mes === 6 ? x.totalProductsPrice : x.Mes === 7 ? x.totalProductsPrice : x.Mes === 8 ? x.totalProductsPrice : x.Mes === 9 ? x.totalProductsPrice: x.Mes === 10 ? x.totalProductsPrice : 'Diciembre'),

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    }
    return (
        <div>
            <ContainChart>
                <BarChat data={dataChat || []} />
                <DoughnutChar data={dataChat || []} />
                <Circle data={dataChat || []} />
                {/* <HorizontalBarChart data={dataChat || []} /> */}
            </ContainChart>
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
const ContainChart = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit,minmax(250px, 1fr) );
    width: 90%;
    position: relative;
    grid-gap: 19px 12px;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
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