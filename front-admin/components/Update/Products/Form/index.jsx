import React from 'react'
import PropTypes from 'prop-types'
import { InputHook } from '../Input'
import { numberFormat } from 'utils'
import { CardCheckBox, CardInput, CardRadioLabel, Footer, FormProducts } from '../styled'
import { RippleButton } from 'components/Ripple'
import { useRouter } from 'next/router'
import NewSelect from 'components/NewSelectHooks/NewSelect'

const FormProduct = ({ handleRegister, names, handleChange, values, setName, dataCategoriesProducts, handleCheckEnvioGratis }) => {
  const router = useRouter()
  return (
    <div>
      <FormProducts className='form-horizontal' onSubmit={handleRegister}>
        <InputHook
          label='Nombre del producto'
          name='name'
          onChange={e => { return setName(e.target.value) }}
          placeholder='Nombre del producto'
          range={{ min: 0, max: 180 }}
          type='text'
          value={names}
        />
        <InputHook
          label='Precio de producto'
          name='ProPrice'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          required
          value={numberFormat(values.ProPrice)}
        />
        <InputHook
          label='Costo de envío'
          name='ValueDelivery'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          required
          value={numberFormat(values.ValueDelivery)}
        />
        <InputHook
          label='Descuento'
          name='ProDescuento'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          value={numberFormat(values.ProDescuento)}
        />
        <NewSelect
          id='carProId'
          name='carProId'
          onChange={handleChange}
          optionName='pName'
          options={dataCategoriesProducts || []}
          title='Categoría'
          value={values?.carProId}
        />
        <InputHook
          TypeTextarea={true}
          label='Description'
          name='ProDescription'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          value={values.ProDescription}
        />
        <CardInput onChange={handleCheckEnvioGratis}>
          <CardCheckBox
            id='checkboxF'
            name='gender'
            type='checkbox'
            value='1'
          />
          <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
        </CardInput>
        <Footer>
          <RippleButton
            padding='10px'  
            type='submit'
            widthButton='100%'
          >Subir</RippleButton>
          {/* <RippleButton
            onClick={() => { return router.push('/update/products/disabled') }}
            padding='10px'
            type='button'
            widthButton='100%'
          >Ir a productos deshabilitados</RippleButton> */}
        </Footer> 
      </FormProducts>
    </div>
  )
}

FormProduct.propTypes = {}

export default FormProduct