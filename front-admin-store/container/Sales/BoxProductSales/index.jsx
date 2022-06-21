import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, ContainerGrid, ScrollbarProduct, Warper } from '../styled'
import { Checkbox } from 'components/Checkbox'
import { Range } from 'components/InputRange'
import { CardProducts } from 'components/CartProduct'
import { useQuery } from '@apollo/client'
import { IconDelete, IconPay } from 'public/icons'
import { PColor } from 'public/colors'
import { Skeleton } from 'components/Skeleton'
import FooterCalcules from '../FooterCalcules'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import InputHooks from 'components/InputHooks/InputHooks'
import { Flex } from 'container/dashboard/styled'
import { numberFormat } from 'utils'

export const BoxProductSales = ({ totalProductPrice, data, dispatch, dataMinPedido, max, setPrint, finalFilter, print, handleChange, values, dataClientes, loadingClients = false }) => {
  return (
    <Box width='40%'>
      <ScrollbarProduct margin={'0'}>
        {data?.PRODUCT?.length > 0 &&
          <Warper>
            {dataClientes?.length > 0 ? <NewSelect
              id='cliId'
              name='cliId'
              onChange={handleChange}
              optionName='clientName'
              options={dataClientes}
              search={true}
              title='Mis clientes'
              value={values?.cliId}
            /> : <span>{loadingClients ? 'Cargando...' : 'Aun no tienes clientes'}</span>}
            <InputHooks
              name='change'
              numeric={true}
              onChange={handleChange}
              required
              title='cambio'
              value={numberFormat(values?.change)}
              width={'50%'}
            />
            <InputHooks
              name='valueDelivery'
              numeric={true}
              onChange={handleChange}
              required
              title='Domicilio'
              value={numberFormat(values?.valueDelivery)}
              width={'50%'}
            />
            <Flex style={{ marginBottom: '40px' }}>
              <Flex>
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
              </Flex>
              <Flex>
                <Range
                  label='Precio'
                  max={max || 0}
                  min={0}
                  onChange={(e) => {
                    return dispatch({
                      type: 'PRICE_RANGE',
                      payload: e.target.value
                    })
                  }
                  }
                  value={data.priceRange}
                  width={'100%'}
                />
              </Flex>

              <Flex style={{ justifyContent: 'space-between' }}>
                <Button
                  active={data.payMethodPState === 1}
                  color={'#007f15'}
                  onClick={() => { return dispatch({ type: 'PAYMENT_METHOD_TRANSACTION' }) }}
                >
                  TRANSFERENCIA
                  <IconPay color={'#007f15'} size={'30px'} />
                </Button>
                <Button
                  active={data.payMethodPState === 0}
                  color={'#007f15'}
                  onClick={() => { return dispatch({ type: 'PAYMENT_METHOD_MONEY' }) }}
                >
                  ENTREGA
                  <IconPay color={'#007f15'} size={'30px'} />
                </Button>
              </Flex>
            </Flex>
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
                del={true}
                dispatch={dispatch}
                edit={true}
                free={producto.free}
                handleDecrement={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
                handleDelete={() => { return dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: producto }) }}
                handleFree={true}
                handleFreeProducts={() => { return dispatch({ type: 'TOGGLE_FREE_PRODUCT', payload: producto }) }}
                handleIncrement={() => { return dispatch({ id: producto.pId, type: 'INCREMENT' }) }}
                index={idx}
                key={idx + 1}
                onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
                pId={producto.pId}
                pName={producto.pName}
                ProDescription={producto.ProDescription}
                ProDescuento={producto.ProDescuento}
                ProImage={producto.ProImage}
                ProPrice={producto.ProPrice}
                ProQuantity={producto.ProQuantity}
                render={<IconDelete color={PColor} size='20px' />}
                sum={true}
                ValueDelivery={producto.ValueDelivery}
                {...producto}
              />
            )
          }) : <Skeleton height={400} numberObject={50} />}
        </ContainerGrid>
      </ScrollbarProduct>
      {/* <Draggable minX={300} moveX> */}
      {/* <div style={{ width: 100, height: 100, backgroundColor: 'grey' }}> */}
      <FooterCalcules
        counter={Math.abs(data.counter)}
        dispatch={dispatch}
        print={print}
        disabled={!values?.cliId}
        setPrint={setPrint}
        totalProductPrice={totalProductPrice}
      />

      {/* </div> */}
      {/* </Draggable> */}
    </Box>
  )
}

BoxProductSales.propTypes = {
  dataMinPedido: PropTypes.shape({
    getMinPrice: PropTypes.number
  }),
  dispatch: PropTypes.func,
  handleChangeFilterProduct: PropTypes.func,
  inputValue: PropTypes.any,
  max: PropTypes.number,
  print: PropTypes.bool,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.number
}
