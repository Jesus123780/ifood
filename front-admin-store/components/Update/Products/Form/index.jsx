import React from 'react'
import { InputHook } from '../Input'
import { numberFormat } from 'utils'
import { CardInput, Footer, FormProducts } from '../styled'
import { RippleButton } from 'components/Ripple'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { Checkbox } from 'components/Checkbox'
import InputHooks from 'components/InputHooks/InputHooks'

const FormProduct = ({ handleRegister, names, handleChange, values, setName, dataCategoriesProducts, handleCheckEnvioGratis, check, image, errors }) => {
  return (
    <div>
      <FormProducts className='form-horizontal' onSubmit={handleRegister}>
        <InputHook
          error={errors.names}
          label='Nombre del producto'
          name='name'
          onChange={e => { return setName(e.target.value) }}
          placeholder='Nombre del producto'
          range={{ min: 0, max: 180 }}
          required={true}
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
          error={errors.ValueDelivery}
          label='Costo de envío'
          name='ValueDelivery'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          required
          value={numberFormat(values.ValueDelivery)}
        />
        <InputHook
          error={errors.ProDescuento}
          label='Descuento'
          name='ProDescuento'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          value={numberFormat(values.ProDescuento)}
        />
        <NewSelect
          error={errors.carProId}
          id='carProId'
          name='carProId'
          onChange={handleChange}
          optionName='pName'
          options={dataCategoriesProducts || []}
          title='Categoría'
          value={values?.carProId}
        />
        <InputHooks
          TypeTextarea={true}
          height='200px'
          name='ProDescription'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          title='Description'
          value={values.ProDescription}
        />
        <CardInput onChange={handleCheckEnvioGratis}>
          <Checkbox
            checked={check}
            id='checkboxF'
            label='Envío gratis'
            name='desc'
            onChange={handleCheckEnvioGratis}
            value={check}
          />
        </CardInput>
        <Footer>
          <RippleButton
            disabled={!image || !names}
            padding='10px'  
            type='submit'
            widthButton='100%'
          >Subir</RippleButton>
        </Footer> 
      </FormProducts>
    </div>
  )
}

FormProduct.propTypes = {}

export default FormProduct