import { Button } from 'components/Layout/styled'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { Item } from 'components/Update/Products/styled'
import { GET_ALL_EXTRA_PRODUCT } from 'container/dashboard/queries'
import { PColor } from 'public/colors'
import { IconDelete, IconEdit, IconPause } from 'public/icons'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components'
import { numberFormat } from 'utils'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL } from 'container/Update/Products/queries'
import { GET_ONE_PRODUCTS_FOOD } from 'container/producto/queries'
import { ExtrasProductsItems } from 'container/producto/extras'

export const ExtraProducts = () => {
    const [modal, openModal] = useState(false)
    const deleteCatOfProducts = () => { }
    const deleteCatFinalOfProducts = () => { }
    const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
    useEffect(() => {
        ExtProductFoodsAll()
    }, [])
    const [ExtProductFoodsOptionalAll, { error: errorOptional, data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    // HANDLE
    const handleGetOneProduct = () => {
        ExtProductFoodsOptionalAll()
    }
    return (
        <Container>
            <div>
                <h2>Sobre mesas con precios</h2>
                <Table
                    titles={[
                        { name: 'Nombre', key: '', justify: 'flex-center', width: '1fr' },
                        { name: 'Precio', justify: 'flex-center', width: '1fr' },
                        { name: 'Pausar ventas', justify: 'flex-center', width: '1fr' },
                        { name: '', justify: 'flex-center', width: '1fr' },
                        { name: 'Duplicar', justify: 'flex-center', width: '1fr' },
                        { name: 'Editar', justify: 'flex-center', width: '1fr' },
                        { name: 'Eliminar', justify: 'flex-center', width: '1fr' },
                    ]}
                    labelBtn='Product'
                    data={dataExtra?.ExtProductFoodsAll || []}
                    renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                        <Item>
                            <span># {x.extraName}</span>
                        </Item>
                        <Item>
                            <span> {numberFormat(x.extraPrice)}</span>
                        </Item>
                        <Item>
                            <Button className='btn' onClick={() => deleteCatOfProducts({ variables: { idPc: x.carProId, pState: x.pState } })}>
                                <IconPause size={30} color={PColor} />
                            </Button>
                        </Item>
                        <Item>
                            <Button className='btn' onClick={() => openModal(x.carProId)}>
                                Seleccionar
                            </Button>
                        </Item>
                        <Item>
                            <Button className='btn' onClick={() => openModal(x.carProId)}>
                                Duplicar
                            </Button>
                        </Item>
                        <Item>
                            <Button className='btn' onClick={() => openModal(x.carProId)}>
                                <IconEdit size={20} color={PColor} />
                            </Button>
                        </Item>
                        <Item>
                            <Button className='btn' onClick={() => deleteCatFinalOfProducts({ variables: { idPc: x.carProId } })}>
                                <IconDelete size={20} color={PColor} />
                            </Button>
                        </Item>
                    </Section>)
                    }
                />
                <Button className='btn btn-red' onClick={() => deleteCatFinalOfProducts({ variables: { idPc: x.carProId } })}>
                    Añadir item
                </Button>
                <Button className='btn btn-red' onClick={() => handleGetOneProduct()}>
                    Get
                </Button>
            </div>
            <div>
                <ExtrasProductsItems
                    setModal={() => { }}
                    modal={modal}
                    dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                    dataExtra={dataExtra?.ExtProductFoodsAll || []} />
            </div>

        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2,minmax(320px,1fr));
    grid-gap: 30px;
    padding: 0 20px;

`