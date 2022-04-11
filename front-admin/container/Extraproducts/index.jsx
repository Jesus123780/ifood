import { Button } from 'components/Layout/styled'
import { Item } from 'components/Update/Products/styled'
import { DELETE_EXTRA_PRODUCTS, EDIT_EXTRA_PRODUCTS, GET_ALL_EXTRA_PRODUCT } from 'container/dashboard/queries'
import { PColor } from 'public/colors'
import { IconDelete, IconEdit } from 'public/icons'
import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import styled, { css } from 'styled-components'
import { numberFormat, updateCache } from 'utils'
import { ExtrasProductsItems } from 'container/producto/extras'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL } from 'container/update/Products/queries'
import { useSetState } from 'components/hooks/useState'
import { AwesomeModal } from 'components/AwesomeModal'
import InputHooks from 'components/InputHooks/InputHooks'
import { useFormTools } from 'components/BaseForm'
import { RippleButton } from 'components/Ripple'
import { Flex } from 'container/dashboard/styled'
import { Context } from 'context/Context'
import { Loading } from 'components/Loading'

export const ExtraProducts = () => {
    const { setAlertBox } = useContext(Context)
    const OPEN_EDIT = useSetState(false)
    // eslint-disable-next-line
    const [handleChange, _, setDataValue, { dataForm, errorForm }] = useFormTools()
    const [deleteextraproductfoods, { loading }] = useMutation(DELETE_EXTRA_PRODUCTS)
    const [editExtProductFoods, { loading: loadEdit }] = useMutation(EDIT_EXTRA_PRODUCTS)
    // DELETE ADICIONAL
    const handleDeleteAdditional = async elem => {
        const { state, exPid } = elem || {}
        deleteextraproductfoods({
            variables: {
                state,
                id: exPid
            }, update: (cache, { data: { ExtProductFoodsAll } }) => updateCache({
                cache,
                query: GET_ALL_EXTRA_PRODUCT,
                nameFun: 'ExtProductFoodsAll',
                dataNew: ExtProductFoodsAll
            })
        }).then(() => {
            OPEN_EDIT.setState(false)
            setDataValue({})
        })
    }
    const { data: dataExtra, loading: loadExtra } = useQuery(GET_ALL_EXTRA_PRODUCT)
    const { data: dataOptional, loading: loadExtraOptional } = useQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const handledExtProductFoods = () => {
        const { pId, state, extraName, extraPrice, exPid } = dataForm || {}
        editExtProductFoods({
            variables: {
                input: {
                    pId: pId,
                    exPid: exPid,
                    extraName: extraName,
                    extraPrice: parseInt(extraPrice),
                    state: state,
                }
            }, update: (cache, { data: { ExtProductFoodsAll } }) => updateCache({
                cache,
                query: GET_ALL_EXTRA_PRODUCT,
                nameFun: 'ExtProductFoodsAll',
                dataNew: ExtProductFoodsAll
            })
        }).then(res => {
            const { data } = res || {}
            OPEN_EDIT.setState(!OPEN_EDIT.state)
            setAlertBox({ message: `${data.editExtProductFoods.message}` })
        })
    }
    const HandleSetEdit = elem => {
        OPEN_EDIT.setState(!OPEN_EDIT.state)
        setDataValue({ ...elem })
    }
    // HANDLE
    return (
        <div>
            {(loading || loadEdit || loadExtra || loadExtraOptional) && <Loading />}
            <AwesomeModal backdrop='static' zIndex='99390' padding='20px' height='auto' show={OPEN_EDIT.state} onHide={() => OPEN_EDIT.setState(!OPEN_EDIT.state)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                <InputHooks title='Nombre de la sobre mesa' required errors={errorForm?.extraName} value={dataForm?.extraName} onChange={handleChange} name='extraName' />
                <InputHooks title='Precio' required errors={errorForm?.extraPrice} value={dataForm?.extraPrice} onChange={handleChange} name='extraPrice' />
                <Flex>
                    <RippleButton onClick={() => handleDeleteAdditional(dataForm)} widthButton='100%' margin='20px auto'>Eliminar</RippleButton>
                    <RippleButton onClick={() => handledExtProductFoods(dataForm)} widthButton='100%' margin='20px auto'>Editar</RippleButton>
                </Flex>
            </AwesomeModal >
            <Container>
                <div>
                    <h2>Sobre mesas con precios</h2>
                    <Section columnWidth={['1fr', '1fr', '1fr', '1fr']}>
                        <Item>Nombre</Item>
                        <Item>Precio</Item>
                        <Item>Editar</Item>
                        <Item>Eliminar</Item>
                    </Section>
                    {dataExtra?.ExtProductFoodsAll.map((x, i) => (
                        <Section columnWidth={['1fr', '1fr', '1fr', '1fr',]} key={i + 1}>
                            <Item>
                                <span># {x.extraName}</span>
                            </Item>
                            <Item color={PColor}>
                                <span> $ {numberFormat(x.extraPrice)}</span>
                            </Item>
                            <Item>
                                <Button className='btn' onClick={() => HandleSetEdit(x)}>
                                    <IconEdit size={20} color={PColor} />
                                </Button>
                            </Item>
                            <Item>
                                <Button className='btn' onClick={() => handleDeleteAdditional(x)}>
                                    <IconDelete size={20} color={PColor} />
                                </Button>
                            </Item>
                        </Section>

                    ))
                    }
                </div>
                <div>
                    <ExtrasProductsItems
                        setModal={() => { }}
                        modal={false}
                        dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                        dataExtra={dataExtra?.ExtProductFoodsAll || []} />
                </div>

            </Container>
        </div>

    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2,minmax(320px,1fr));
    grid-gap: 30px;
    padding: 0 20px;

`
export const Section = styled.th`
    display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x} `) : '1fr'}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    padding: ${({ padding }) => padding};
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
   ${props => props.odd && css`
    &:nth-of-type(odd), .thead-default th {
        background-color: rgba(0, 0, 0, 0.03);
    }
   `}
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    } 
    `
