import React from 'react'
import { Content } from './styled'
import { ButtonSubmit } from './styled'
import { BGColor } from '../../../../public/colors'
import { LoadEllipsis } from '../../../LoadingButton'
import NewSelect from 'components/NewSelectHooks/NewSelect'
export const Location = ({ handleChange, onChangeSearch, countries, cities, departments, road, valuesForm, errorForm, loading }) => {
    return (
        <h1>
            <Content>
                <NewSelect name='countryId' options={countries} id='cId' onChange={onChangeSearch} error={errorForm?.countryId} optionName='cName' value={valuesForm?.countryId} title='País' required />
                <NewSelect name='dId' options={departments} id='dId' onChange={onChangeSearch} error={errorForm?.dId} optionName='dName' value={valuesForm?.dId} title='Departamento' required />
                <NewSelect name='ctId' options={cities} id='ctId' onChange={handleChange} error={errorForm?.ctId} optionName='cName' value={valuesForm?.ctId} title='Ciudad' required />
                <NewSelect name='rId' options={road} id='rId' onChange={handleChange} error={errorForm?.rId} optionName='rName' value={valuesForm?.rId} title='Tipo de via' required />
                <ButtonSubmit type='submit' >{loading ? <LoadEllipsis color={BGColor} /> : 'Registrar'} </ButtonSubmit>
            </Content>
        </h1>
    )
}