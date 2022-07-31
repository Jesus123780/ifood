import React from 'react'
import PropTypes from 'prop-types'
import { AwesomeModal } from 'components/AwesomeModal'
import { numberFormat } from '../../../utils'
import { Input } from '../styled'
import { Prints } from '../Printsale'

export const ModalSales = ({ handleSubmit, print, setPrint, totalProductPrice, values, code, data, setDelivery, delivery, handleChange }) => {
  return (
    <div>
      <AwesomeModal
        borderRadius='5px'
        btnCancel={true}
        btnConfirm={true}
        cancel='Guardar'
        confirm='Guardar y salir'
        footer={true}
        header={true}
        height='90vh'
        onConfirm={() => { return handleSubmit() }}
        onHide={() => { return setPrint(!print) }}
        padding='25px'
        show={print}
        size='medium'
        zIndex='999999'
      >
        <Prints
          change={values.change}
          code={code}
          data={data?.PRODUCT || []}
          total={`$ ${numberFormat(totalProductPrice)}`}
        />
      </AwesomeModal>
      <AwesomeModal
        borderRadius='5px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { return setDelivery(!delivery) }}
        padding='25px'
        show={delivery}
        size='small'
        title='Añade el costo del envio'
      >
        <Input
          autoComplete='off'
          name='ValueDelivery'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.stateventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='costo de envio'
          value={values?.ValueDelivery}
        />
        <Input
          autoComplete='off'
          name='change'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='Cambio'
          value={values?.change}
        />
      </AwesomeModal>
    </div>
  )
}

ModalSales.propTypes = {
  code: PropTypes.any,
  data: PropTypes.shape({
    PRODUCT: PropTypes.array
  }),
  delivery: PropTypes.any,
  handleChange: PropTypes.any,
  handleSubmit: PropTypes.func,
  setDelivery: PropTypes.func,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.any,
  values: PropTypes.shape({
    ValueDelivery: PropTypes.any,
    change: PropTypes.any
  })
}
