import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useQuery, useMutation } from '@apollo/client'

import moment from 'moment'
import React from 'react'
import { CREATE_SHOPPING, GET_ALL_SHOPPING } from './queries'
import { Button, Item, Container } from './styled'
import { numberFormat, updateCache } from 'utils'

export const ShoppingC = () => { 
  const HandleGetOne = () => {}
  const OPEN_MODAL = useSetState()
  const [newShopping] = useMutation(CREATE_SHOPPING)
  const { data } = useQuery(GET_ALL_SHOPPING)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      return newShopping({
        variables: {
          input: {
            shoName: dataForm.shoName,
            shoPrice: parseFloat(dataForm.shoPrice),
            shoComments: dataForm.shoComments
          }
        }, update: (cache, { data: { getAllShopping } }) => {return updateCache({
          cache,
          query: GET_ALL_SHOPPING,
          nameFun: 'getAllShopping',
          dataNew: getAllShopping
        })}
      })
    }
  })}
  return (
    <Container>
      <RippleButton onClick={() => {return OPEN_MODAL.setState(!OPEN_MODAL.state)}}>Crear nuevo</RippleButton>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='small'
        zIndex='9999'
      >
        <form onSubmit={(e) => {return handleForm(e)}}>
          <InputHooks
            error={errorForm?.shoName}
            name='shoName'
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.shoName}
            width={'100%'}
          />
          <InputHooks
            error={errorForm?.shoPrice}
            name='shoPrice'
            onChange={handleChange}
            required
            title='Precio'
            value={numberFormat(dataForm?.shoPrice)}
            width={'100%'}
          />
          <InputHooks
            error={errorForm?.shoComments}
            name='shoComments'
            onChange={handleChange}
            required
            title='Comentario'
            value={dataForm?.shoComments}
            width={'100%'}
          />
          <RippleButton type='submit' widthButton='100%' >Crear</RippleButton>
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
        data={data?.getAllShopping || []}
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
            <span> {x.shoName}</span>
          </Item>
          <Item>
            <span> {x.shoPrice}</span>
          </Item>
          <Item>
            <span> {x.shoComments}</span>
          </Item>
          <Item>
            <span> {moment(x.createAt).format('DD-MM-YYYY')}</span>
          </Item>
          <Item>
            <Button onClick={() => {return HandleGetOne({})}}>
                            Ver detalles
            </Button>
          </Item>
        </Section>})}}
        titles={[
          { name: '#', justify: 'flex-start', width: '1fr' },
          { name: 'Nombre', key: 'shoName', justify: 'flex-start', width: '1fr' },
          { name: 'Precio', key: 'shoPrice', justify: 'flex-start', width: '1fr' },
          { name: 'Comentario', justify: 'flex-start', width: '1fr' },
          { name: 'Date', justify: 'flex-start', width: '1fr' },
          { name: '', justify: 'flex-start', width: '1fr' }
        ]}
      />
    </Container>
  )
}
