import PropTypes from 'prop-types'
import React from 'react'
import { Content } from './styled'
import { ButtonSubmit } from './styled'
import NewSelect from '../../../NewSelectHooks/NewSelect'
import { BGColor } from '../../../../public/colors'
import { LoadEllipsis } from '../../../LoadingButton'
export const Location = ({ handleChange, onChangeSearch, countries, cities, departments, road, valuesForm, errorForm, loading }) => {
  return (
    <div>
      <Content>
        <NewSelect
          error={errorForm?.countryId}
          id='cId'
          name='countryId'
          onChange={onChangeSearch}
          optionName='cName'
          options={countries}
          required
          title='País'
          value={valuesForm?.countryId}
        />
        <NewSelect
          error={errorForm?.dId}
          id='dId'
          name='dId'
          onChange={onChangeSearch}
          optionName='dName'
          options={departments}
          required
          title='Departamento'
          value={valuesForm?.dId}
        />
        <NewSelect
          error={errorForm?.ctId}
          id='ctId'
          name='ctId'
          onChange={handleChange}
          optionName='cName'
          options={cities}
          required
          title='Ciudad'
          value={valuesForm?.ctId}
        />
        <NewSelect
          error={errorForm?.rId}
          id='rId'
          name='rId'
          onChange={handleChange}
          optionName='rName'
          options={road}
          required
          title='Tipo de via'
          value={valuesForm?.rId}
        />
        <ButtonSubmit type='submit' >{loading ? <LoadEllipsis color={BGColor} /> : 'Registrar'} </ButtonSubmit>
      </Content>
    </div>
  )
}
Location.propTypes = {
  cities: PropTypes.any,
  countries: PropTypes.any,
  departments: PropTypes.any,
  errorForm: PropTypes.shape({
    countryId: PropTypes.any,
    ctId: PropTypes.any,
    dId: PropTypes.any,
    rId: PropTypes.any
  }),
  handleChange: PropTypes.any,
  loading: PropTypes.any,
  onChangeSearch: PropTypes.any,
  road: PropTypes.any,
  valuesForm: PropTypes.shape({
    countryId: PropTypes.any,
    ctId: PropTypes.any,
    dId: PropTypes.any,
    rId: PropTypes.any
  })
}
