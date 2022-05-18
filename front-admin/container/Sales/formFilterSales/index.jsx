import React from 'react'
import PropTypes from 'prop-types'
import { Warper } from '../styled'
import InputHooks from 'components/InputHooks/InputHooks'

export const FormFilterSales = ({ onChangeInput, valuesDates, handleChangeFilter, search }) => {
  return (
    <Warper>
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
        name='search'
        onChange={handleChangeFilter}
        range={{ min: 0, max: 20 }}
        title='Busca tus productos'
        type='text'
        value={search}
        width='30%'
      />
    </Warper>
  )
}

FormFilterSales.propTypes = {
  handleChangeFilter: PropTypes.any,
  onChangeInput: PropTypes.any,
  search: PropTypes.any,
  valuesDates: PropTypes.shape({
    fromDate: PropTypes.any,
    toDate: PropTypes.any
  })
}
