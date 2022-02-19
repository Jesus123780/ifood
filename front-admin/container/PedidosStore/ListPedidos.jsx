import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { BGColor, PColor, PLColor } from 'public/colors'
import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import moment from 'moment'
import { numberFormat } from 'utils'
import { onPulses } from 'components/animations'
import { AwesomeModal } from 'components/AwesomeModal'

export const ListPedidos = ({ data }) => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [modal, setModal] = useState(0)
    return (
        <div>
            <Card>
                <form>
                    <InputHooks
                        title='Desde'
                        width={'20%'}
                        required
                        error={errorForm?.Desde}
                        value={dataForm?.Desde}
                        onChange={handleChange}
                        name='Desde'
                        type='date'
                    />
                    <InputHooks
                        title='Hasta'
                        width='20%'
                        required
                        type='date'
                        error={errorForm?.ProDescuento}
                        value={dataForm?.ProDescuento}
                        onChange={handleChange}
                        name='ProDescuento'
                    />
                    <InputHooks
                        title='Numero'
                        width='30%'
                        required
                        error={errorForm?.ProPrice}
                        value={dataForm?.ProPrice}
                        onChange={handleChange}
                        name='ProPrice'
                    />
                    <InputHooks
                        title='Nombre'
                        width='30%'
                        numeric
                        required
                        error={errorForm?.ProPrice}
                        value={dataForm?.ProPrice}
                        onChange={handleChange}
                        name='ProPrice'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='Restaurante'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='Método de pago'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='STATUS'
                    />
                    <Button type='submit'>
                        Mas opciones
                    </Button>
                    <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                    <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
                </form>
            </Card>
            <Table
                titles={[
                    { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Date', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
                    { name: 'Costo total', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: 'Cupon', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={data}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> Restaurante</span>
                    </Item>
                    <Item>
                        <span> {x.pCodeRef}</span>
                    </Item>
                    <Item>
                        <span> {moment(x.pDatCre).format('DD/MM/YYYY')} - {moment(x.pDatCre).format('h:mma')} </span>
                    </Item>
                    <Item>
                        <span> DELIVERY-APP </span>
                    </Item>
                    <Item>
                        <span> {x.payMethodPState ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(x.totalProductsPrice)} </span>
                    </Item>
                    <Item>
                        <CircleStatus pulse={true}>

                        </CircleStatus>
                    </Item>
                    <Item>
                        <span> {i + 1}</span>
                    </Item>
                    <Item>
                        <Button onClick={() => setModal(!modal)}>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
            <Action>
                <RippleButton padding='10px' margin='30px 0'>Mas antiguos</RippleButton>
                <RippleButton padding='10px' margin='30px 0'>Cargar Mas</RippleButton>
            </Action>
            <CheckStatus
                setModal={setModal}
                modal={modal}
            />
        </div>
    )
}


export const CheckStatus = ({ setModal, modal }) => {
    return (
        <div>
            <AwesomeModal
                show={modal}
                onCancel={() => setModal(false)}
                onHide={() => setModal(false)}
                btnConfirm={false}
                header={false}
                footer={false}
                padding='20px'
                size='large'
            >
                asdasda
            </AwesomeModal>
        </div>
    )
}


const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
const Action = styled.div`
    display: flex;
    justify-content: space-between;
    
    `
const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    & form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

    }
`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${PColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const CircleStatus = styled.div` 
  border-radius: 50%;
  height: 30px;
  background-color: ${PColor};
  width: 30px;
  min-height: 30px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 30px;
  ${props => props.pulse
        ? css`
    animation: ${pulse} 2s infinite;
  `
        : css`
  ` }
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    /* background-color: ${BGColor}; */
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`