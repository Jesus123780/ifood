import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { TextH2Main } from 'components/common/h2'
import styled from 'styled-components'
import { Flex } from './styled'
import moment from 'moment'
import { MainCard } from 'components/common/Reusable/ShadowCard'
// import { DoughnutChar } from 'components/Chart'
import { GET_ALL_SALES_STATISTICS } from 'container/ventas/queries'
import { numberFormat } from 'utils'

export const SalesWeek = () => {
  const [getAllSalesStoreStatistic, { data, loading }] = useLazyQuery(GET_ALL_SALES_STATISTICS)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const [key, setSetKey] = useState([])
  const [GROUP_BY_DAYS, setGROUP_BY_DAYS] = useState([])
  let suma = 0
  useEffect(() => {
    var dt = new Date()
    getAllSalesStoreStatistic({ variables: { min: 0, fromDate: moment(dt.setDate(dt.getDate() - 30)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    data?.getAllSalesStoreStatistic.forEach((a) => {
      const { totalProductsPrice, pDatCre } = a || {}
      suma += totalProductsPrice
      setTotalProductPrice(suma)
    })
    if (!loading && data) {
      const GROUP_BY_DAYS = data?.getAllSalesStoreStatistic.reduce(function (r, a) {
        r[moment(a.pDatCre).day()] = r[moment(a.pDatCre).day()] || [];
        r[moment(a.pDatCre).day()].push(a);
        return r;
      }, Object.create(null));
      setGROUP_BY_DAYS(GROUP_BY_DAYS)
      const dataKeyDays = Object.keys(GROUP_BY_DAYS)
      setSetKey(dataKeyDays)
    }
  }, [data])
  return (
    <MainCard weight={'200'} title={`Últimos 30 Dias $ ${numberFormat(totalProductPrice || 0)}`}>
      <Text size='.8em' color='#3f3e3e' >{ `Media de ventas en los últimos 30 Dias $ ${numberFormat(totalProductPrice || 0)}`}</Text>
      <Container>
        {key?.map((day, i) => {
          let suma = 0
          let sumaNoOrder = 0
          let totalProduct = 0
          const avg = GROUP_BY_DAYS[day]?.map((x, index) => (suma += x.pSState === 4) / (index + 1))
          !!avg && ((avg[avg.length - 1]))
          const noOrder = GROUP_BY_DAYS[day]?.map((x, index) => (sumaNoOrder += x.pSState === 5) / (index + 1))
          !!noOrder && ((noOrder[noOrder.length - 1]))
          return (
            <CardStatistic sales={GROUP_BY_DAYS[day]?.length} key={i + 1} noOrder={!!noOrder && ((noOrder[noOrder.length - 1])?.toFixed(2))} OrderConcludes={!!avg && ((avg[avg.length - 1])?.toFixed(2))}  day={day == 1 ? 'Lunes' : day == 2 ? 'Martes' : day == 3 ? 'Miércoles' : day == 4 ? 'Jueves' : day == 5 ? 'viernes' : day == 6 ? 'Sábado' : 'Domingo'} />
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
      <Text size='1.2em' margin='10px 0' color='#3f3e3e' >Ventas</Text>
      <Text size='2em' color='#3f3e3e' >{sales || 0}</Text>
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

const Orders = styled.div`
    border-top: 1px solid #3f3e3e17;
    margin-top: 4px;
    padding-top: 10px;

`
const Text = styled.h3`
    margin: 0;
    color: #3f3e3e;
    font-size: ${({ size }) => size || '1.5rem'};
    text-align:  ${({ align }) => align || 'start'};
    height: min-content;
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    font-weight: 400;
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || '#3f3e3e   '};
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
`
const WrapperBox = styled.div`
  background-color: #fafafa;
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
    border-bottom: 1px solid #3f3e3e69;
    &:last-child {
      
      border-bottom: none;
    }
`