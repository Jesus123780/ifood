import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, ContainerGrid, ScrollbarProduct, Warper } from '../styled'
import { Checkbox } from 'components/Checkbox'
import { Range } from 'components/InputRange'
import { InputHook } from 'components/Update/Products/Input'
import { CardProducts } from 'components/CartProduct'
import { useQuery } from '@apollo/client'
import { IconDelete } from 'public/icons'
import { PColor } from 'public/colors'
import { Skeleton } from 'components/Skeleton'
import FooterCalcules from '../FooterCalcules'
import { GET_ALL_CLIENTS } from 'container/clients/queries'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import InputHooks from 'components/InputHooks/InputHooks'

export const BoxProductSales = ({ totalProductPrice, data, dispatch, dataMinPedido, max, inputValue, handleChangeFilterProduct, setPrint, finalFilter, print, handleChange, values }) => {
  const { data: clients } = useQuery(GET_ALL_CLIENTS)
  return (
    <Box width='40%'>
      <ScrollbarProduct margin={'0'}>
        {/* <h2>Productos a vender</h2> */}
        {data.PRODUCT.length > 0 &&
          <Warper>
            {clients?.getAllClients?.length > 0 ? <NewSelect
              id='cliId'
              name='cliId'
              onChange={handleChange}
              optionName='clientName'
              options={clients?.getAllClients}
              search={true}
              title='Mis clientes'
              value={values?.cliId}
            /> : <span>Aun no tienes clientes</span>}
            {/* <Button onClick={() => { return dispatch({ type: 'REMOVE_ALL_PRODUCTS' }) }}><IconDelete color={PColor} size={'30px'} /></Button> */}
            <InputHooks
              name='change'
              numeric={true}
              onChange={handleChange}
              required
              title='cambio'
              value={values?.change}
              width={'100%'}
            />
            <Checkbox
              checked={data.sortBy && data.sortBy === 'PRICE_HIGH_TO_LOW'}
              disabled={false}
              id={'PRICE_HIGH_TO_LOW'}
              name='sort'
              onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_HIGH_TO_LOW' }) }}
            />
            <Checkbox
              checked={data.sortBy && data.sortBy === 'PRICE_LOW_TO_HIGH'}
              disabled={false}
              id={'PRICE_LOW_TO_HIGH'}
              name='sort'
              onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_LOW_TO_HIGH' }) }}
            />
      
            {/* <Range
                label='Precio'
                max={max || 0}
                min={dataMinPedido?.getMinPrice || 0}
                onChange={(e) => {
                  return dispatch({
                    type: 'PRICE_RANGE',
                    payload: e.target.value
                  })
                }
                }
                value={data.priceRange}
                width={'100%'}
              /> */}
            {/* <InputHook
                id='myInput'
                name='myInput'
                onChange={(e) => { return handleChangeFilterProduct(e) }}
                placeholder='Search for the data..'
                required={true}
                type='text'
                value={inputValue}
              /> */}
          </Warper>}
        <ContainerGrid>
          {data?.PRODUCT?.length > 0 ? finalFilter.map((producto, idx) => {
            return (
              <CardProducts
                ProDescription={producto.ProDescription}
                ProDescuento={producto.ProDescuento}
                ProImage={producto.ProImage}
                ProPrice={producto.ProPrice}
                ProQuantity={producto.ProQuantity}
                ValueDelivery={producto.ValueDelivery}
                del={true}
                free={producto.free}
                handleDecrement={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
                handleDelete={() => { return dispatch({ type: 'REMOVE_PRODUCT_TO_CART', idx }) }}
                handleFree={false}
                handleFreeProducts={() => { return dispatch({ type: 'TOGGLE_FREE_PRODUCT', idx }) }}
                handleIncrement={() => { return dispatch({ id: producto.pId, type: 'INCREMENT' }) }}
                key={idx + 1}
                onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
                pName={producto.pName}
                render={<IconDelete color={PColor} size='20px' />}
                sum={true}
              />
            )
          }) : <Skeleton height={400} numberObject={50} />}
        </ContainerGrid>
      </ScrollbarProduct>
      {/* <Draggable minX={300} moveX> */}
      {/* <div style={{ width: 100, height: 100, backgroundColor: 'grey' }}> */}
      <FooterCalcules
        print={print}
        setPrint={setPrint}
        totalProductPrice={totalProductPrice}
      />

      {/* </div> */}
      {/* </Draggable> */}
    </Box>
  )
}

BoxProductSales.propTypes = {
  data: PropTypes.shape({
    PRODUCT: PropTypes.shape({
      length: PropTypes.number
    }),
    priceRange: PropTypes.any,
    sortBy: PropTypes.string
  }),
  dataMinPedido: PropTypes.shape({
    getMinPrice: PropTypes.number
  }),
  dispatch: PropTypes.func,
  finalFilter: PropTypes.shape({
    map: PropTypes.func
  }),
  handleChangeFilterProduct: PropTypes.func,
  inputValue: PropTypes.any,
  max: PropTypes.number,
  print: PropTypes.bool,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.number
}
