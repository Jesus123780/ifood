import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import moment from 'moment'
import React from 'react'
import { Button, Item, Container } from './styled'

export const LoyaltyC = () => {
  const HandleGetOne = () => { }
  const OPEN_MODAL = useSetState()
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  return (
    <Container>
            realtad
      <RippleButton onClick={() => {return OPEN_MODAL.setState(!OPEN_MODAL.state)}}>Crear nuevo</RippleButton>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='90%'
        zIndex='9999'
      >
        <form>
          <InputHooks
            error={errorForm?.Desde}
            name='Desde'
            onChange={handleChange}
            required
            title='Desde'
            type='date'
            value={dataForm?.Desde}
            width={'20%'}
          />
        </form>
      </AwesomeModal>
      <form>
        <InputHooks
          error={errorForm?.Desde}
          name='Desde'
          onChange={handleChange}
          required
          title='Desde'
          type='date'
          value={dataForm?.Desde}
          width={'20%'}
        />
        <InputHooks
          error={errorForm?.ProDescuento}
          name='ProDescuento'
          onChange={handleChange}
          required
          title='Hasta'
          type='date'
          value={dataForm?.ProDescuento}
          width='20%'
        />
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          onChange={handleChange}
          required
          title='Numero'
          value={dataForm?.ProPrice}
          width='30%'
        />
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          numeric
          onChange={handleChange}
          required
          title='Nombre'
          value={dataForm?.ProPrice}
          width='30%'
        />
        <NewSelect
          id='colorId'
          name='colorId'
          onChange={handleChange}
          optionName='colorName'
          options={[1, 2]}
          title='Restaurante'
          value={dataForm?.Color}
          width='33.33%'
        />
        <NewSelect
          id='colorId'
          name='colorId'
          onChange={handleChange}
          optionName='colorName'
          options={[1, 2]}
          title='Método de pago'
          value={dataForm?.Color}
          width='33.33%'
        />
        <NewSelect
          id='colorId'
          name='colorId'
          onChange={handleChange}
          optionName='colorName'
          options={[1, 2]}
          title='STATUS'
          value={dataForm?.Color}
          width='33.33%'
        />
        <Button type='submit'>
                    Mas opciones
        </Button>
        <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
        <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
      </form>
      <Table
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        labelBtn='Product'
        renderBody={(dataB, titles) => {return dataB?.map((x, i) => {return <Section
          columnWidth={titles}
          key={i}
          odd
          padding='10px 0'
        >
          <Item>
            <span> {i + 1}</span>
          </Item>
          <Item>
            <span> Restaurante</span>
          </Item>
          <Item>
            {/* <span> {x.pCodeRef}</span> */}
          </Item>
          <Item>
            {/* <span> {moment(x.pDatCre).format('DD-MM-YYYY')} - {moment(x.pDatCre).format('HH:mm A')}</span> */}
          </Item>
          <Item>
            <span> DELIVERY-APP </span>
          </Item>
          <Item>
          </Item>
          <Item>
            {/* <span> $ {numberFormat(x.totalProductsPrice)}</span> */}
          </Item>

          <Item>
            <Button onClick={() => {return HandleGetOne({})}}>
                            Ver detalles
            </Button>
          </Item>
        </Section>})}}
        titles={[
          { name: 'Numero', justify: 'flex-center', width: '.5fr' },
          { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
          { name: 'Date', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
          { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}
      />
    </Container>
  )
}
