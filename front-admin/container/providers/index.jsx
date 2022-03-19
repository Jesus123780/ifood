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

export const ProvidersC = () => {
    const HandleGetOne = () => { }
    const OPEN_MODAL = useSetState()
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    return (
        <Container>
            REPORT
            <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
            <AwesomeModal height='100vh' zIndex='9999' padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='90%' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
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
                </form>
            </AwesomeModal>
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
            <Table
                titles={[
                    { name: 'Numero', justify: 'flex-center', width: '.5fr' },
                    { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Date', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
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
                        {/* <span> {x.payMethodPState ? 'EFECTIVO' : 'TRANSFERENCIA'}</span> */}
                    </Item>
                    <Item>
                        {/* <span> $ {numberFormat(x.totalProductsPrice)}</span> */}
                    </Item>

                    <Item>
                        <Button onClick={() => HandleGetOne({})}>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
        </Container>
    )
}
