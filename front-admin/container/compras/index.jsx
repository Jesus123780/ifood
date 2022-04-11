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
    const HandleGetOne = () => { }
    const OPEN_MODAL = useSetState()
    const [newShopping] = useMutation(CREATE_SHOPPING)
    const { data } = useQuery(GET_ALL_SHOPPING)
    const [handleChange, handleSubmit, { dataForm, errorForm }] = useFormTools()
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return newShopping({
                    variables: {
                        input: {
                            shoName: dataForm.shoName,
                            shoPrice: parseFloat(dataForm.shoPrice),
                            shoComments: dataForm.shoComments,
                        }
                    }, update: (cache, { data: { getAllShopping } }) => updateCache({
                        cache,
                        query: GET_ALL_SHOPPING,
                        nameFun: 'getAllShopping',
                        dataNew: getAllShopping
                    })
                })
            }
        })
    return (
        <Container>
            <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
            <AwesomeModal zIndex='9999' padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <form onSubmit={(e) => handleForm(e)}>
                    <InputHooks
                        title='Nombre'
                        width={'100%'}
                        required
                        error={errorForm?.shoName}
                        value={dataForm?.shoName}
                        onChange={handleChange}
                        name='shoName'
                    />
                    <InputHooks
                        title='Precio'
                        width={'100%'}
                        required
                        error={errorForm?.shoPrice}
                        value={numberFormat(dataForm?.shoPrice)}
                        onChange={handleChange}
                        name='shoPrice'
                    />
                    <InputHooks
                        title='Comentario'
                        width={'100%'}
                        required
                        error={errorForm?.shoComments}
                        value={dataForm.shoComments}
                        onChange={handleChange}
                        name='shoComments'
                    />
                    <RippleButton type='submit' widthButton='100%' >Crear</RippleButton>
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
                    { name: '#', justify: 'flex-start', width: '1fr' },
                    { name: 'Nombre', key: 'shoName', justify: 'flex-start', width: '1fr' },
                    { name: 'Precio', key: 'shoPrice', justify: 'flex-start', width: '1fr' },
                    { name: 'Comentario', justify: 'flex-start', width: '1fr' },
                    { name: 'Date', justify: 'flex-start', width: '1fr' },
                    { name: '', justify: 'flex-start', width: '1fr' },
                ]}
                labelBtn='Product'
                data={data?.getAllShopping || []}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
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
                        <Button onClick={() => HandleGetOne({})}>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
        </Container>
    )
}
