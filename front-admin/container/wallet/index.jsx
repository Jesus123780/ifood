import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import moment from 'moment'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CREATE_WALLET_DEBT, GET_ALL_WALLET_DEBT, GET_ONE_WALLET_DEBT } from './queries'
import { Button, Item, Container } from './styled'
import { numberFormat, RandomCode, updateCache } from 'utils'
import { CustomTable } from '../pruebas'
import { Card } from './styled'
import { ManageWallet } from 'container/ManageWallet'
import { IconDelete } from 'public/icons'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { BGColor } from 'public/colors'
import { Context } from 'context/Context'

export const WalletC = () => {
    
    const [amount, setAmount] = useState(0);
    const OPEN_MODAL = useSetState()
    const initialStateInvoice = {
        PRODUCT: [],
    }
    const { setAlertBox } = useContext(Context)
    const [createWalletDebt] = useMutation(CREATE_WALLET_DEBT)
    const { data, loading, error } = useQuery(GET_ALL_WALLET_DEBT)
    const [dataProducto, setData] = useState([])
    console.log(data)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const productRecoger = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    PRODUCT: [...state?.PRODUCT, action?.payload]
                }
            case 'REMOVE_PRODUCT':
                return {
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    PRODUCT: []
                };
            case "TOGGLE_INVOICE":
                return {
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const [showMore, setShowMore] = useState(100)
    const [product, dispatch] = useReducer(productRecoger, initialStateInvoice)
    const [productFoodsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE)
    const [getOneWalletDebt, { data: dataWallet }] = useLazyQuery(GET_ONE_WALLET_DEBT)
    const HandleGetOne = (debtWalletId) => { 
        return getOneWalletDebt({ 
            variables: {
                debtWalletId
            }
        })
    }
    console.log(dataWallet)
    const { getAllWalletDebtProduct } = dataWallet || {}
    useEffect(() => {
        dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
    }, [dataProduct])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMore } })
    }, [showMore])
    const arr = product?.PRODUCT.map(x => ({ pId: x.pId, debtAmountProduct: x.ProPrice, }))
    console.log(arr)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return createWalletDebt({
                    variables: {
                        input: {
                            UserDebtId: 'MjcyMDg4ODE0ODUxNTE2NDUw',
                            debtName: dataForm.debtName,
                            personName: dataForm.personName,
                            lastName: dataForm.lastName,
                            gender: 1,
                            ccWalletUser: dataForm.ccWalletUser,
                            RefDebtCode: RandomCode(9),
                            debtAmount: amount,
                            debtComments: dataForm?.debtComments,
                        },
                        inputLineItems: {
                            setData: arr || []
                        }
                    }, update: (cache, { data: { WalletDebt } }) => updateCache({
                        cache,
                        query: GET_ALL_WALLET_DEBT,
                        nameFun: 'WalletDebt',
                        dataNew: WalletDebt
                    })
                })
            }
        })

    const handleAddProduct = elem => {
        let includes = product?.PRODUCT.includes(elem);
        console.log(elem)
        const { pName } = elem || {}
        if (includes) {
            setAlertBox({ message: `El producto ${pName && pName} ya esta agregado a la lista` })
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: elem })
        }
    }

    let amountCount = 0

    useEffect(() => {
        product?.PRODUCT?.forEach(function (a) {
            amountCount += a.ProPrice
        });
        setAmount(amountCount)
    }, [product])
    return (
        <>
            <AwesomeModal zIndex='9999' padding='25px' height='calc(100vh - 160px)' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='calc(100vw - 360px)' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0px' >

                <Container>
                    <Card width='30%'>
                        <form onSubmit={(e) => handleForm(e)}>
                            {/* <InputHooks type='radio' title='Nombre de la billetera' width={'100%'} required error={errorForm?.debtName} value={dataForm?.debtName} onChange={handleChange} name='debtName' /> */}
                            <InputHooks title='Nombre de la billetera' width={'100%'} required error={errorForm?.debtName} value={dataForm?.debtName} onChange={handleChange} name='debtName' />
                            <InputHooks title='Nombre de la persona' width={'100%'} required error={errorForm?.personName} value={dataForm?.personName} onChange={handleChange} name='personName' />
                            <InputHooks title='Apellido' width={'100%'} required error={errorForm?.lastName} value={dataForm?.lastName} onChange={handleChange} name='lastName' />
                            <InputHooks title='CC de la persona' width={'100%'} required error={errorForm?.ccWalletUser} value={dataForm?.ccWalletUser} onChange={handleChange} name='ccWalletUser' />
                            <InputHooks title='comentario' TypeTextarea={true} width={'100%'} required error={errorForm?.debtComments} value={dataForm?.debtComments} onChange={handleChange} name='debtComments' />
                            <span>monto {numberFormat(amount)}</span>
                            <RippleButton type='submit' widthButton='100%' >Crear</RippleButton>
                        </form>
                    </Card>
                    <Card>
                        {dataProducto?.map((x, idx) => (
                            <Card width='100%' key={idx.carProId}>
                                <div >
                                    <button onClick={() => handleAddProduct(x)}>Addd</button>
                                    <div size='20px' >{x.pName}</div>
                                    <div size='20px' >{x.ProDescription}</div>
                                    <div size='20px' >precio: {x.ProPrice}</div>
                                </div>
                            </Card>
                        ))}
                        {product?.PRODUCT?.map((x, idx) => (
                            <Card width='100%' key={idx.carProId}>
                                <div >
                                    <span size='20px' >{x.pName}</span>
                                    <span size='20px' >{x.ProDescription}</span>
                                </div>
                                <div >
                                    <RippleButton onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>
                                        <IconDelete size={20} color={BGColor} />
                                    </RippleButton>
                                </div>
                            </Card>
                        ))}
                    </Card>
                </Container>
            </AwesomeModal>
            <Container>
                <Card >
                    <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
                    <form>
                        <InputHooks title='Desde' width={'20%'} required error={errorForm?.Desde} value={dataForm?.Desde} onChange={handleChange} name='Desde' type='date' />
                        <InputHooks title='Hasta' width='20%' required type='date' error={errorForm?.ProDescuento} value={dataForm?.ProDescuento} onChange={handleChange} name='ProDescuento' />
                        <InputHooks title='Numero' width='30%' required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <InputHooks title='Nombre' width='30%' numeric required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <NewSelect width='33.33%' name='colorId' options={[1, 2]} id='colorId' onChange={handleChange} optionName='colorName' value={dataForm?.Color} title='Restaurante' />
                        <NewSelect width='33.33%' name='colorId' options={[1, 2]} id='colorId' onChange={handleChange} optionName='colorName' value={dataForm?.Color} title='Método de pago' />
                        <NewSelect width='33.33%' name='colorId' options={[1, 2]} id='colorId' onChange={handleChange} optionName='colorName' value={dataForm?.Color} title='STATUS' />
                        <Button type='submit'>
                            Mas opciones
                        </Button>
                        <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                        <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
                    </form>
                    <Table
                        titles={[
                            { name: '#', key: 'RefDebtCode', justify: 'flex-start', width: '1fr' },
                            { name: 'Billetera', key: 'debtName', justify: 'flex-start', width: '1fr' },
                            { name: 'Genero', key: 'gender', justify: 'flex-start', width: '1fr' },
                            { name: 'Cliente', key: 'personName', justify: 'flex-start', width: '1fr' },
                            { name: '# identificación', key: 'ccWalletUser', justify: 'flex-start', width: '1fr' },
                            { name: 'Monto', key: 'debtAmount', justify: 'flex-start', width: '1fr' },
                            { name: 'Date', justify: 'flex-start', width: '1fr' },
                            { name: '', justify: 'flex-start', width: '1fr' },
                        ]}
                        labelBtn='Product'
                        data={data?.WalletDebt || []}
                        renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                            <Item>
                                <span> {x.RefDebtCode}</span>
                            </Item>
                            <Item>
                                <span> {x.debtName}</span>
                            </Item>
                            <Item>
                                <span> {x.gender === 1 ? 'Masculino' : 'Femenino'}</span>
                            </Item>
                            <Item>
                                <span> {x.personName} {x.lastName}</span>
                            </Item>
                            <Item>
                                <span> {x.ccWalletUser}</span>
                            </Item>
                            <Item>
                                <span> $ {numberFormat(x.debtAmount)}</span>
                            </Item>
                            <Item>
                                <span> {moment(x.createAt).format('DD-MM-YYYY')} </span>
                            </Item>
                            <Item>
                                <Button onClick={() => HandleGetOne(x.debtWalletId)}>
                                    Ver detalles
                                </Button>
                            </Item>
                        </Section>)}
                    />
                </Card>
                <Card width='30%'>
                    <ManageWallet data={dataWallet?.getOneWalletDebt || {}} />
                </Card>
            </Container>
        </>

    )
}
