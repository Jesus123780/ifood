import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import styled, { css } from 'styled-components'
import { Flex } from './styled'
import moment from 'moment'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { GET_ALL_SALES, GET_ALL_SALES_STATISTICS } from 'container/ventas/queries'
import { numberFormat } from 'utils'
import { GET_ALL_CLIENTS } from 'container/clients/queries'
import { GET_ALL_VISITOR_STORE } from './queriesStore'

export const SalesWeekShortDays = () => {
  let dt = new Date()
  const [getAllSalesStoreStatistic, { data, loading }] = useLazyQuery(GET_ALL_SALES_STATISTICS)
  const { data: dataSales } = useQuery(GET_ALL_SALES, {
    variables: { fromDate: moment(dt.setDate(dt.getDate() - 7)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') }
  })
  const [getAllVisitorStore, { data: VISITOR }] = useLazyQuery(GET_ALL_VISITOR_STORE)

  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const { data: DataClients } = useQuery(GET_ALL_CLIENTS, {
    variables: { fromDate: moment(dt.setDate(dt.getDate() - 7)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') }
  })
  const [key, setSetKey] = useState([])
  const [GROUP_BY_DAYS, setGROUP_BY_DAYS] = useState([])
  let suma = 0
  useEffect(() => {
    getAllSalesStoreStatistic({ variables: { min: 0, fromDate: moment(dt.setDate(dt.getDate() - 7)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    getAllVisitorStore({ variables: { fromDate: moment(dt.setDate(dt.getDate() - 7)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    data?.getAllSalesStoreStatistic?.forEach((a) => {
      const { totalProductsPrice } = a || {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      suma += totalProductsPrice
      setTotalProductPrice(suma)
    })
    if (!loading && data) {
      const GROUP_BY_DAYS = data?.getAllSalesStoreStatistic.reduce(function (r, a) {
        r[moment(a.pDatCre).day()] = r[moment(a.pDatCre).day()] || []
        r[moment(a.pDatCre).day()].push(a)
        return r
      }, Object.create(null))
      setGROUP_BY_DAYS(GROUP_BY_DAYS)
      const dataKeyDays = Object.keys(GROUP_BY_DAYS)
      setSetKey(dataKeyDays)
    }
  }, [data])
  return (
    <MainCard title={`Últimos 7 Dias $ ${numberFormat(totalProductPrice || 0)}`} weight={'200'}>
      <Text color='#3f3e3e' size='.8em' >{`Media de ventas en los últimos 7 Dias $ ${numberFormat(totalProductPrice || 0)}`}</Text>
      {/* <BarChat data={dataChat || []} /> */}
      {/* <canvas id="myChart" width="400" height="400"></canvas> */}
      <Text size='2em'>Desempeño</Text>
      <Container>
        <WrapperBox bgColor='transparent'>
          <Text size='1.2em'>Ventas</Text>
          <Text color='#3f3e3e' size='2em' >{numberFormat(dataSales?.getAllSalesStore?.length || 0)}</Text>
          <Text color='#3f3e3e' size='1.1em' >${numberFormat(totalProductPrice || 0)}</Text>
        </WrapperBox>
        <WrapperBox bgColor='transparent'>
          <Text size='1.2em'>Clientes Nuevos</Text>
          <Text color='#3f3e3e' size='2em' >{DataClients?.getAllClients?.length}</Text>
          {/* <Text size='1.1em' color='#3f3e3e' >{1 || 0}</Text> */}
        </WrapperBox>
        <WrapperBox bgColor='transparent'>
          <Text size='1.2em'>Usuario Visitaron el restaurante</Text>
          <Text color='#3f3e3e' size='2em' >{!!VISITOR && VISITOR?.getAllVisitorStore?.length || 0}</Text>
          {/* <Text size='1.1em' color='#3f3e3e' >{1 || 0}</Text> */}
        </WrapperBox>
      </Container>
      <Container>
        {key?.map((day, i) => {
          let suma = 0
          let sumaNoOrder = 0
          const avg = GROUP_BY_DAYS[day]?.map((x, index) => {return (suma += x.pSState === 4) / (index + 1)})
          !!avg && ((avg[avg.length - 1]))
          const noOrder = GROUP_BY_DAYS[day]?.map((x, index) => {return (sumaNoOrder += x.pSState === 5) / (index + 1)})
          !!noOrder && ((noOrder[noOrder.length - 1]))
          return (
            <CardStatistic
              OrderConcludes={!!avg && ((avg[avg.length - 1])?.toFixed(2))}
              day={day == 1 ? 'Lunes' : day == 2 ? 'Martes' : day == 3 ? 'Miércoles' : day == 4 ? 'Jueves' : day == 5 ? 'viernes' : day == 6 ? 'Sábado' : 'Domingo'}
              key={i + 1}
              noOrder={!!noOrder && ((noOrder[noOrder.length - 1])?.toFixed(2))}
              sales={GROUP_BY_DAYS[day]?.length}
            />
          )
        })}
      </Container>
    </MainCard>
  )
}

export const CardStatistic = ({ day, sales, OrderConcludes, noOrder }) => {
  return (
    <WrapperBox>
      <h2>{day || null}</h2>
      <Text
        color='#3f3e3e'
        margin='10px 0'
        size='1.2em'
      >Ventas</Text>
      <Text color='#3f3e3e' size='2em' >{sales || 0}</Text>
      <Orders>
        <Flex>
          <Text size='.8em'>Pedidos concluidos</Text>
          <Text align='end' size='1em'>{OrderConcludes}%</Text>
        </Flex>
        <Flex>
          <Text size='.8em'>Cancelados</Text>
          <Text align='end' size='1em'>{noOrder}%</Text>
        </Flex>
      </Orders>
    </WrapperBox>
  )
}

CardStatistic.propTypes = {
  OrderConcludes: PropTypes.any,
  day: PropTypes.any,
  noOrder: PropTypes.any,
  sales: PropTypes.number
}

const Orders = styled.div`
    border-top: 1px solid #3f3e3e17;
    margin-top: 4px;
    padding-top: 10px;

`
const Text = styled.h3`
    margin: 0;
    color: #3f3e3e;
    font-size: ${({ size }) => {return size || '1.5rem'}};
    text-align:  ${({ align }) => {return align || 'start'}};
    height: min-content;
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    font-weight: 400;
    ${({ weight }) => {return weight && css`font-weight: ${weight};`}}
    ${({ padding }) => {return padding && css`padding: ${padding};`}}
    margin: ${({ margin }) => {return margin || '0'}};
    color: ${({ color }) => {return color || '#3f3e3e   '}};
    font-family: ${({ font }) => {return font || 'PFont-Light'}};
    word-break: break-word;
`
const WrapperBox = styled.div`
  background-color: ${({ bgColor }) => {return bgColor || '#fafafa'}} ;
  border-radius: 5%;
  padding: 0.5em;
  h2 {
    line-height: 1.15;
    font-size: .899rem;
    text-align: start;
    height: min-content;
    font-weight: 400;
    font-weight: 200;
    margin: 0;
    color: #3f3e3e;
    display: flex;
    font-family: PFont-Light;
    word-break: break-word;
  }
`
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    width: 90%;
    grid-gap: 19px 12px;     
    height: 100%;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    place-content: space-between;
    border-bottom: 1px solid #3f3e3e69;
    &:last-child {
      
      border-bottom: none;
    }
`