import PropTypes from 'prop-types'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Rate } from 'components/Rate'
import React, { useEffect, useState } from 'react'
import { ContentGrid, MediaValue } from './styled'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ALL_RATING_START_STORE, GET_ALL_VISITOR_STORE, GET_MIN_PEDIDO } from './queriesStore'
import { GET_ALL_SALES, GET_ALL_SALES_STATISTICS } from 'container/ventas/queries'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { numberFormat } from 'utils'

export const LastedStatistic = ({ idStore }) => {
  let dt = new Date()
  const [valueSales, setValueSales] = useState(0)
  const [getAllRatingStar, { data: dataStartStore }] = useLazyQuery(GET_ALL_RATING_START_STORE)
  const [getAllVisitorStore, { data: VISITOR }] = useLazyQuery(GET_ALL_VISITOR_STORE)
  const [getMinPrice, { data: dataMinPedido }] = useLazyQuery(GET_MIN_PEDIDO)
  const [stars, setStars] = useState(null)
  useEffect(() => {
    getAllRatingStar()
    getAllVisitorStore({ variables: { fromDate: moment(dt.setDate(dt.getDate() - 90)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    getMinPrice()
    let suma = 0
    const avg = dataStartStore?.getAllRatingStar?.map((x, index) => {return (suma += x.rScore) / (index + 1)})
    !!avg && setStars((avg[avg.length - 1])?.toFixed(1))
  }, [dataStartStore, dataMinPedido, VISITOR])

  const [getAllSalesStoreStatistic, { data }] = useLazyQuery(GET_ALL_SALES_STATISTICS)
  const { data: dataSales } = useQuery(GET_ALL_SALES, {
    variables: { fromDate: moment(dt.setDate(dt.getDate() - 90)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') }
  })
  useEffect(() => {
    let suma = 0
    const avg = data?.getAllSalesStoreStatistic?.map((x, index) => {return (suma += x.pSState === 4) / (index + 1)})
    const val = avg?.length > 0 && ((avg[avg.length - 1])?.toFixed(2))
    setValueSales(val)
  }, [data])
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const [key, setSetKey] = useState([])
  let suma = 0
  useEffect(() => {
    getAllSalesStoreStatistic({ variables: { min: 0, fromDate: moment(dt.setDate(dt.getDate() - 90)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    data?.getAllSalesStoreStatistic.forEach((a) => {
      const { totalProductsPrice, pDatCre } = a || {}
      suma += totalProductsPrice
      setTotalProductPrice(suma)
    })
  }, [data])
  return (
    <div>
      <MainCard title={`Últimos 90 Dias $ ${numberFormat(totalProductPrice || 0)}`}>
        <ContentGrid>
          <div>
            <Text>{stars}</Text>
            <Rate rating={stars} size={35} />
          </div>
          <div>
            <div>
              <MediaValue>{valueSales}%</MediaValue>
            </div>
            <Text color='#3f3e3e' size='1.2em'>Pedidos entregados</Text>
          </div>
          <div>
            <div>
              <MediaValue>{!!VISITOR && VISITOR?.getAllVisitorStore?.length || 0}</MediaValue>
            </div>
            <Text color='#3f3e3e' size='1.2em'>Usuario Visitaron el restaurante</Text>
          </div>
        </ContentGrid>
      </MainCard>
    </div>
  )
}

LastedStatistic.propTypes = {
  idStore: PropTypes.string
}

export const UserVisit = ({ days = 90 }) => {
  let dt = new Date()
  const { data } = useQuery(GET_ALL_VISITOR_STORE,
    { variables: { fromDate: moment(dt.setDate(dt.getDate() - days)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } }
  )
  return !!data && data?.getAllVisitorStore?.length || 0
}

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