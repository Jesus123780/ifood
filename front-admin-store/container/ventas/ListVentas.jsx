import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BGColor, PColor, PLColor, SFColor } from 'public/colors'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MONTHS, months, numberFormat } from 'utils'
import { GET_ALL_SALES, GET_ONE_SALES } from './queries'
import moment from 'moment'
import { GetOneSales } from './getOneSales'
import { BarChat, Circle, DoughnutChar, HorizontalBarChart } from 'components/Chart'
import { Skeleton } from 'components/Skeleton'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import Column from 'components/common/Atoms/Column'
moment.locale('es')
export const ListVentas = () => {
  let total = 0
  let suma = 0
  const [handleChange, { dataForm, errorForm }] = useFormTools()
  const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
  const onChangeInput = (e) => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }
  const [more, setMore] = useState(100)
  const [getAllSalesStore, { data, fetchMore, loading }] = useLazyQuery(GET_ALL_SALES)
  const [getOneSalesStore, { data: dataOneSales }] = useLazyQuery(GET_ONE_SALES)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  useEffect(() => {
    getAllSalesStore({ variables: { min: 0 } })
    data?.getAllSalesStore.forEach((a) => {
      const { totalProductsPrice } = a || {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      suma += totalProductsPrice
      setTotalProductPrice(suma)
    })
  }, [totalProductPrice, suma, total, data])
  const [open, setOpen] = useState(false)
  const HandleGetOne = (pCodeRef) => {
    getOneSalesStore({ variables: { pCodeRef: pCodeRef } })
    setOpen(!open)
  }
  const getFromDataToData = async () => { return getAllSalesStore({ variables: { fromDate: valuesDates?.fromDate, toDate: valuesDates?.toDate } }) }
  return (
    <div>
      <GetOneSales
        data={dataOneSales?.getOneSalesStore || []}
        open={open}
        setOpen={setOpen}
      />
      <Card>
        <form>
          <InputHooks
            name='fromDate'
            onChange={onChangeInput}
            required
            title='Desde'
            type='date'
            value={valuesDates?.fromDate}
            width={'20%'}
          />
          <InputHooks
            name='toDate'
            onChange={onChangeInput}
            required
            title='Hasta'
            type='date'
            value={valuesDates?.toDate}
            width='20%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            onChange={handleChange}
            required
            title='Numero'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            numeric
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <Button type='submit'>
            Mas opciones
          </Button>
          <RippleButton
            margin='30px'
            onClick={() => { return getFromDataToData() }}
            padding='10px'
            type='button'
          >Consultar</RippleButton>
          <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
        </form>
      </Card>
      <ChatStatistic />
      <Table
        data={data?.getAllSalesStore || []}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
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
                <span> {x.payMethodPState === 1 ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
              </Item>
              <Item>
                <span> $ {numberFormat(x.totalProductsPrice)}</span>
              </Item>

              <Item>
                <Button onClick={() => { return HandleGetOne(x.pCodeRef) }}>
                  Ver detalles
                </Button>
              </Item>
            </Section>
          })
        }}
        titles={[
          { name: 'Numero', justify: 'flex-center', width: '.5fr' },
          { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
          { name: 'Date', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
          { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}
      />
      <Action>
        <RippleButton
          margin='30px 0'
          onClick={() => {
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
          }}
          padding='10px'
        >{loading ? '...Cargando' : 'Cargar Mas'}</RippleButton>
      </Action>
      <CardInfo>
        <div className='wrapper-card-info'>
          <div className='item'>
            <span>Total de ventas realizadas </span>
            <h3>$ {numberFormat(totalProductPrice)}</h3>
            <Button>Ver mas information</Button>
          </div>
          <div className='wrapper-acquisition__card'>
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
        <div className='wrapper-card-info'>
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
  const { data, loading } = useQuery(GET_ALL_SALES)
  // const array = filterKeyObject(data?.getAllSalesStore, ['__typename'])
  // console.log(array)
  let result = []
  data?.getAllSalesStore?.length > 0 && data?.getAllSalesStore.reduce(function (res, value) {
    // Creamos la posición del array para cada mes
    let mes = new Date(value.pDatCre).getMonth()
    if (!res[mes]) {
      res[mes] = { Mes: mes }
      // Inicializamos a 0 el valor de cada key
      Object.keys(value).forEach(function (key) {
        if (key != 'pDatCre') {
          res[mes][key] = 0
        }
      })

      result.push(res[mes])
    }
    // Sumamos el valor de cada clave dentro de un bucle
    Object.keys(value).forEach(function (key) {
      if (key != 'pDatCre') {
        res[mes]['totalProductsPrice'] += value['totalProductsPrice']
      }
    })
    return res
  }, {})

  const obj = [
    {
      months: result[0]?.Mes === 0 ? 'ENERO' : 'ENERO',
      price: result[0]?.totalProductsPrice || 0,
    },
    {
      months: result[1]?.Mes === 1 ? 'FEBRERO' : 'FEBRERO',
      price: result[1]?.totalProductsPrice || 0,
    },
    {
      price: result[2]?.totalProductsPrice || 0,
      months: result[2]?.Mes === 2 ? 'MARZO' : 'MARZO',

    },
    {
      price: result[3]?.totalProductsPrice || 0,
      months: result[3]?.Mes === 3 ? 'MARZO' : 'MARZO',

    },
    {
      price: result[4]?.totalProductsPrice || 0,
      months: result[4]?.Mes === 4 ? 'ABRIL' : 'ABRIL',

    },
    {
      price: result[5]?.totalProductsPrice || 0,
      months: result[5]?.Mes === 5 ? 'MAYO' : 'MAYO',

    },
    {
      price: result[6]?.totalProductsPrice || 0,
      months: result[6]?.Mes === 6 ? 'JUNIO' : 'JUNIO',

    },
    {
      price: result[7]?.totalProductsPrice || 0,
      months: result[7]?.Mes === 7 ? 'JUNIO' : 'JUNIO',

    },
    {
      price: result[8]?.totalProductsPrice || 0,
      months: result[8]?.Mes === 8 ? 'AGOSTO' : 'AGOSTO',

    },
    {
      price: result[9]?.totalProductsPrice || 0,
      months: result[9]?.Mes === 9 ? 'SEPTIEMBRE' : 'SEPTIEMBRE',

    },
    {
      price: result[10]?.totalProductsPrice || 0,
      months: result[10]?.Mes === 10 ? 'NOVIEMBRE' : 'NOVIEMBRE',

    },
    {
      price: result[11]?.totalProductsPrice || 0,
      months: result[11]?.Mes === 11 ? 'DICIEMBRE' : 'DICIEMBRE',

    }
  ]
  // Resultado:
  const dataChat = {
    labels: result.map(x => { return x.Mes === 0 ? 'Enero' : x.Mes === 1 ? 'Febrero' : x.Mes === 2 ? 'Marzo' : x.Mes === 3 ? 'Abril' : x.Mes === 4 ? 'Mayo' : x.Mes === 5 ? 'Junio' : x.Mes === 6 ? 'Julio' : x.Mes === 7 ? 'Agosto' : x.Mes === 8 ? 'Septiembre' : x.Mes === 9 ? 'Octubre' : x.Mes === 10 ? 'Noviembre' : 'Diciembre' }),
    // labels: moment()._locale._months,
    // labels: obj.map(x => { return x.months }),
    // labels: months({ count: DATA_COUNT }),

    datasets: [
      {

        label: 'Ventas',
        // data: obj.map(x => { return x.price }),
        data: result.map(x => { return x.Mes === 0 ? x.totalProductsPrice : x.Mes === 1 ? x.totalProductsPrice : x.Mes === 2 ? x.totalProductsPrice : x.Mes === 3 ? x.totalProductsPrice : x.Mes === 4 ? x.totalProductsPrice : x.Mes === 5 ? x.totalProductsPrice : x.Mes === 6 ? x.totalProductsPrice : x.Mes === 7 ? x.totalProductsPrice : x.Mes === 8 ? x.totalProductsPrice : x.Mes === 9 ? x.totalProductsPrice : x.totalProductsPrice }),
        // data: result.map(x => x.Mes === 0 ? x.totalProductsPrice : x.Mes === 1 ? x.totalProductsPrice : x.Mes === 2 ? x.totalProductsPrice : x.Mes === 3 ? x.totalProductsPrice : x.Mes === 4 ? x.totalProductsPrice : x.Mes === 5 ? x.totalProductsPrice : x.Mes === 6 ? x.totalProductsPrice : x.Mes === 7 ? x.totalProductsPrice : x.Mes === 8 ? x.totalProductsPrice : x.Mes === 9 ? x.totalProductsPrice: x.Mes === 10 ? x.totalProductsPrice : 'Diciembre'),
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
      {loading ? <Skeleton height={300} margin={'20px 0'} /> : <MainCard title={`Ventas por meses del año`} weight={'200'}>
        <ContainChart>
          <Column width='50%'>
            <BarChat data={dataChat || []} />
          </Column>
          {/* <DoughnutChar data={dataChat || []} /> */}
          {/* <Circle data={dataChat || []} /> */}
          {/* <HorizontalBarChart data={dataChat || []} /> */}
        </ContainChart>
      </MainCard>}
      {/* {loading ? <Skeleton height={300} margin={'10px 0'} /> :} */}
    </div>
  )
}

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