import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { BGColor, PColor, PLColor, SFColor } from 'public/colors'
import React from 'react'
import styled from 'styled-components'
import { numberFormat } from 'utils'

export const ListVentas = () => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
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
                    { name: 'Costo', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: 'Cupon', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={[1, 2, 3, 4, 5]}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> Restaurante</span>
                    </Item>
                    <Item>
                        <span> 7597</span>
                    </Item>
                    <Item>
                        <span> 20/03/2020 - 12:43</span>
                    </Item>
                    <Item>
                        <span> DELIVERY-APP </span>
                    </Item>
                    <Item>
                        <span> EFECTIVO</span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(12000)} </span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(2000)}</span>
                    </Item>
                    <Item>
                        <span> {i + 1}</span>
                    </Item>
                    <Item>
                        <Button>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
            <Action>
                <RippleButton padding='10px' margin='30px 0'>Mas antiguos</RippleButton>
                <RippleButton padding='10px' margin='30px 0'>Cargar Mas</RippleButton>
            </Action>
            <CardInfo>
                <div className="wrapper-card-info">
                    <div className="item">
                        <span>Total de ventas realizadas </span>
                        <h3>$ {numberFormat(300000)}</h3>
                        <Button>Ver mas information</Button>
                    </div>
                    <div className="wrapper-acquisition__card">
                        <div>
                            <span>Por Delivery </span>
                            <h3>$ {numberFormat(300000)}</h3>

                        </div>
                        <div>
                            <span>Por Restaurante </span>
                            <h3>$ {numberFormat(300000)}</h3>
                        </div>
                    </div>

                </div>
                <div className="wrapper-card-info">
                    <span>Total de ventas realizadas </span>
                    <h3>$ {numberFormat(300000)}</h3>
                    <Button>Ver mas information</Button>
                </div>
            </CardInfo>
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
const CardInfo = styled.div`
    display: grid;
    grid-template-columns: 50% repeat(auto-fill, 50%);
    gap: 10px;
    padding: 40px 0;
    place-content: space-between;
    .wrapper-card-info {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        height: auto;
        span {
            color: ${PLColor};
            font-family: PFont-Light;
        }
        h3 {
            font-family: PFont-Light;
            font-size: 30px;
            color: ${SFColor};

        }
        font-family:  PFont-Light;
        .item {
            padding: 20px;
            border-bottom: 1px solid #ccc;
        }
        .wrapper-acquisition__card {
            padding: 20px;
            display: grid;
            grid-template-columns: 50% repeat(auto-fill, 50%);
        }
    }

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